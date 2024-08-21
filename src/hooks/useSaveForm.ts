import { useState } from "react";
import { getChatGPT, createMongoItem, sendEmail } from "../services";
import { dateFormat, getAddressComponent } from "../utils";
import { useErrorBoundary } from "react-error-boundary";

const CONST_GPT_PROMPT = 'Parse this information into a list of items and quantities: {items}. Your response should be in the following JSON format: [  {    "prod": "Item 1", "qty": "Quantity 1"  }]'

export function useSaveForm(noSave = false, callBack: () => void) {
    const [isBusy, setIsBusy] = useState(false)
    const { showBoundary } = useErrorBoundary()


    const saveForm = async (values: any) => {
        console.log('useSaveForm', values)
        // setIsBusy(true)
        // try {
        //     // 3) Optionally, send email (fire and forget)
        //     if (values.emailReceipt) {
        //         sendEmail({
        //             to: values.email,
        //             subject: 'HabiStore donation receipt.',
        //             noSend: false,
        //             template: {
        //                 db: 'HomeRepairApp', collection: 'Templates', template: 'HomeRepairInquiry'
        //             },
        //             replace: {
        //                 DATE: values.date, TIME: '', NAME: `${values.firstName} ${values.lastName}`,
        //                 ADDRESS: `${address.address1} ${address.address2}, ${address.city} ${address.province}`,
        //                 LIST: values.donations, IMAGES: ''
        //             }
        //         })
        //         console.log('eMailSend')
        //     }
        //     // 4) Save to MongoDB and Shopify
        //     const responses = await Promise.all([
        //         createMongoItem({
        //             data: {
        //                 ...customer, _id: values._id, shopifyId: values.shopifyId, date: values.date, email: values.email,
        //                 newsletter: values.newsletter, emailReceipt: values.emailReceipt, list: itemList
        //             }, db: 'Kiosk', collection: 'Donations', noSave: noSave
        //         })
        //     ])
        //     console.log('mongo/shopify', responses)

        //     // Cleanup
        //     callBack()
        // } catch (error) {
        //     showBoundary(error)
        // }
        // setIsBusy(false)
    }
    return [saveForm, isBusy] as const
}
