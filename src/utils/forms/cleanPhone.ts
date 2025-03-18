export const cleanPhone = (phone: string | null) => {
    if (phone === undefined || phone === null) return null
    // Filter only numbers from the input
    let cleaned = ('' + phone).replace(/\D/g, '');

    // Check if the input is of the correct format
    let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match === null) return null
    return [match[1], match[2], match[3], match[4]].join('');
}