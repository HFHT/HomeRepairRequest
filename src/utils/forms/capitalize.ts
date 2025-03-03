
export function capitalize(theWord: string | null | undefined) {
    if (!theWord) return theWord
    return theWord.charAt(0).toUpperCase() + theWord.slice(1)
}
