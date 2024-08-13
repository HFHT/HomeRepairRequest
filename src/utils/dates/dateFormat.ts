import { dateElements } from ".";

export const dateFormat = (date: any) => {
    // Return the provided date in a yyyy-mm-dd format
    var d = date ? new Date(date) : new Date()
    return dateElements(d);
}