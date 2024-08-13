import { timeFormat } from "."

export const timeDiff = (time1: string | undefined, time2: string | undefined | null, precision: number = 2): number => {
    // Return the number of hours between time1 and time2
    console.log('timeDiff', time1, time2)
    if (!time1 || time2 === undefined) return 0
    let pt1 = time1.split(':')
    let pt2 = timeFormat(null).split(':')
    if (time2 !== null) {
        pt2 = time2.split(':')
    }
    let diff = (Number(pt2[0]) + (Number(pt2[1]) / 60)) - (Number(pt1[0]) + (Number(pt1[1]) / 60))
    console.log(diff)
    return Number(diff.toFixed(precision))
}