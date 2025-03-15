
export function theProgram(selectedProgram: string, mobile: boolean | undefined) {
    if (mobile) return selectedProgram === 'CHR' ? 'Critical' : 'Minor'
    return selectedProgram === 'CHR' ? 'Critical Repair' : 'Minor Repair'
}
