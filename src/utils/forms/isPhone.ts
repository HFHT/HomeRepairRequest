import { cleanPhone } from "."

export function isPhone(phone: string | number | null | undefined) {
    if (phone === null || phone === undefined) return false
    let cleaned = cleanPhone(phone.toString())
    console.log(cleaned)
    if (cleaned === null || cleaned.length !== 11) return false
    return true
}
