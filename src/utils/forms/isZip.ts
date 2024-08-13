export function isZip(zip: string): boolean {
    return !(/^\d{5}(?:[-\s]\d{4})?$/.test(zip))
}