export function dateNew(date: any) {
    const parts = date.split('-')
    let d = new Date(parts[0], parts[1] - 1, parts[2])
    return d
}