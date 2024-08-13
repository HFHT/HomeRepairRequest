export function stringOrBlank(value: any): string {
    return (typeof value === 'string') ? value : ''
}