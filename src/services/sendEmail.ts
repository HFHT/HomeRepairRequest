import { fetchJson } from "."
import { isEmail } from "../utils"

export type eMailReqType = {
    to: string
    subject: string
    template: eMailTemplateType             // Template to pull from Mongo database
    replace: {}                             // replace elements in template with these key: value pairs
    noSend?: boolean
}
export type eMailTemplateType = {
    db: string
    collection: string
    template: string
}
export async function sendEmail(eMailReq: eMailReqType) {
    const header: any = { method: "POST", headers: new Headers() }
    header.body = JSON.stringify({ ...eMailReq })
    if (eMailReq.noSend) { console.log('sendEmail', header); return null }
    if (eMailReq.to === '' || !isEmail(eMailReq.to)) { console.log('sendEmail-bad address', eMailReq.to) }
    return await fetchJson(import.meta.env.VITE_SENDMAIL_URL, header)

}