export const timeAdd = (time1: string, hours: number): string => {
    // Return the number of hours between time1 and time2
    console.log('timeAdd', time1, hours)
    const pt1 = time1.split(':')
    const starthr = ((Number(pt1[0]) + (Number(pt1[1]) / 60)) + Number(hours)).toFixed(2)
    console.log(starthr)
    let rt = starthr.split('.')
    console.log(rt)
    let rm = Math.round((Number(rt[1]) * 60 / 100)).toString()
    console.log(rt[0].padStart(2, '0'), rm.padStart(2, '0'))
    return `${rt[0].padStart(2, '0')}:${rm.padStart(2, '0')}`
}