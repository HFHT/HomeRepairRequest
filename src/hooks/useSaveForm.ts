import { useContext, useState } from "react";
import { createMongoItem, legacyDBCreate, sendEmail } from "../services";
import { dateFormat, getAddressComponent, uniqueKey } from "../utils";
import { useErrorBoundary } from "react-error-boundary";
import { MainContext } from "../context/MainContext";


export function useSaveForm(noSave = false, callBack: () => void) {
    const { state, documents, language } = useContext(MainContext);

    const [isBusy, setIsBusy] = useState(false)
    const { showBoundary } = useErrorBoundary()


    const saveForm = async (values: any) => {
        console.log('useSaveForm', values, state, language)
        setIsBusy(true)
        try {
            // send email (fire and forget)
            if (state.address !== undefined) {
                sendEmail({
                    to: values.email,
                    subject: 'Habitat for Humanity Tucson, Home Repair Inquiry.',
                    // noSend: false,
                    noSend: false,
                    template: {
                        db: 'HomeRepairApp', collection: 'Templates', template: 'HomeRepairInquiry'
                    },
                    replace: {
                        DATE: values.date, TIME: '', NAME: `${values.firstName} ${values.lastName}`,
                        ADDRESS: state.address.formatted,
                        LIST: `<ul compact> ${documents && documents.map((dm) => `<li>${dm.title}</li>`).join('')} </ul>`,
                        IMAGES: ''
                    }
                })
                console.log('eMailSend')
                // Save to MongoDB
                const responses = await Promise.all([
                    createMongoItem({
                        data: { ...values, ...state, language: language, _id: `${values.phone}_${uniqueKey()}` },
                        db: 'HomeRepairApp', collection: 'Inquiries', noSave: noSave
                    }),
                    legacyDBCreate({ ...values, ...state, language: language, _id: `${values.phone}_${uniqueKey()}` })
                ])
                console.log('mongo', responses)

                // Cleanup
                callBack()
            } else {
                showBoundary({ message: 'Street Address is undefined.' })
            }

        } catch (error) {
            showBoundary(error)
        }
        setIsBusy(false)
    }
    return [saveForm, isBusy] as const
}
