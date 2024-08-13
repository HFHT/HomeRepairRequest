import { useState } from "react";
import { getChatGPT, googleGeocode, createMongoItem, sendEmail } from "../services";
import { dateFormat, getAddressComponent } from "../utils";
import { useErrorBoundary } from "react-error-boundary";

const CONST_GPT_PROMPT = 'Parse this information into a list of items and quantities: {items}. Your response should be in the following JSON format: [  {    "prod": "Item 1", "qty": "Quantity 1"  }]'

export function useSaveForm(noSave = false, callBack: () => void) {
    const [isBusy, setIsBusy] = useState(false)
    const { showBoundary } = useErrorBoundary()


    const saveForm = async (values: any) => {
        console.log('useSaveForm', values)
        setIsBusy(true)
        try {
            // 1) Get parsed donation list from Open AI
            const itemList = await getChatGPT(CONST_GPT_PROMPT.replace(/{items}/g, values.donations))
            console.log('itemList', itemList)
            // 2) Get address details from google
            const geocode = await googleGeocode(values.place?.description)
            const address = {
                address1: `${getAddressComponent(geocode, 'street_number')} ${getAddressComponent(geocode, 'route')}`,
                address2: values.address2,
                city: getAddressComponent(geocode, 'locality'),
                province: getAddressComponent(geocode, 'administrative_area_level_1'),
                country: getAddressComponent(geocode, 'country'),
                phone: values.phone, zip: values.zip,
                first_name: values.firstName,
                last_name: values.lastName,
                company: values.company
            }
            console.log('geocode', geocode)
            const customer = {
                first_name: values.firstName, last_name: values.lastName, email: values.email,
                phone: values.phone, send_email_welcome: false,
                note: `${values.note} {${dateFormat(null)}-${values.donations}},`,
                tags: values.tags.indexOf('kiosk') >= 0 ? values.tags : (values.tags.split(',').concat(['kiosk'])).join(),
                addresses: [{ ...address }]
            }
            // 3) Optionally, send email (fire and forget)
            if (values.emailReceipt) {
                sendEmail({
                    to: values.email,
                    subject: 'HabiStore donation receipt.',
                    noSend: false,
                    template: {
                        db: 'Truck', collection: 'Templates', template: 'KioskDonation'
                    },
                    replace: {
                        DATE: values.date, TIME: '', NAME: `${values.firstName} ${values.lastName}`,
                        ADDRESS: `${address.address1} ${address.address2}, ${address.city} ${address.province}`,
                        LIST: values.donations, IMAGES: ''
                    }
                })
                console.log('eMailSend')
            }
            // 4) Save to MongoDB and Shopify
            const responses = await Promise.all([
                createMongoItem({
                    data: {
                        ...customer, _id: values._id, shopifyId: values.shopifyId, date: values.date, email: values.email,
                        newsletter: values.newsletter, emailReceipt: values.emailReceipt, list: itemList
                    }, db: 'Kiosk', collection: 'Donations', noSave: noSave
                })
            ])
            console.log('mongo/shopify', responses)

            // Cleanup
            callBack()
        } catch (error) {
            showBoundary(error)
        }
        setIsBusy(false)
    }
    return [saveForm, isBusy] as const
}
