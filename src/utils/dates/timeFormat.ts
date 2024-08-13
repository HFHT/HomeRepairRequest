export const timeFormat = (date: any) => {
    // Return the provided date in a hh:mm format
    var d = date ? new Date(date) : new Date()
    return `${'0'.concat(d.getHours().toString()).slice(-2)}:${'0'.concat(d.getMinutes().toString()).slice(-2)}`
}