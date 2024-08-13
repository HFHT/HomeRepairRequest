export function numberOrNull(value: any): number | null {
    return (typeof value === 'number') ? value : null
}