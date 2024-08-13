import { dateElements, dateNew } from ".";
type dateAdjustType = {
    date: string
    adjust: number
    max?: string
    min?: string
}
export const dateAdjust = ({ date, adjust, max, min }: dateAdjustType) => {
    // Return the date adjusted by the amount in adjust. Date gymnastics due to Date(date) returning yesterday
    if (date === max && adjust > 0) return date
    if (date === min && adjust < 0) return date
    let d = dateNew(date)
    d.setDate(d.getDate() + adjust);
    return dateElements(d)
}