import { useContext, useEffect, useMemo } from "react"
import { RepairProgramsType, useRepairPrograms } from "."
import { MainContext } from "../context/MainContext";

const CONST_NO_PROGRAMS = 'You do not qualify for any of the Home Repair Programs.'

export function useEligibility() {
    const { state, dispatch, destination, navigate, language, getPhrase } = useContext(MainContext);

    const [repairPrograms, fetchMongo, isBusy] = useRepairPrograms()

    useEffect(() => {
        fetchMongo()
        console.log(state.answers.selectedRepairs)
    }, [])

    const isQualified = (thePgm: RepairProgramsType) => {
        if (!thePgm.Active) return false
        if (thePgm.Type !== state.program) return false
        let retVal: boolean[] = []
        thePgm.Qualifications.forEach((pgm) => {
            let v = pgm.includes('!') ? 'no' : 'yes'
            retVal = [...retVal, state.answers[pgm.replace('!', '')] === v]
            console.log(pgm.replace('!', ''), state.answers[pgm.replace('!', '')])
            console.log(retVal)
        })
        state.answers.selectedRepairs && thePgm.RepairTypes.forEach((pgm) => {
            retVal = [...retVal, state.answers.selectedRepairs.includes(pgm)]
            console.log(retVal, state.answers.selectedRepairs.includes(pgm))
        })
        state.selectedRepairs && state.selectedRepairs.forEach((pgm) => {
            retVal = [...retVal, thePgm.RepairTypes.length === 0 || thePgm.RepairTypes.includes(pgm)]
            console.log(retVal, thePgm.RepairTypes.includes(pgm))
        })
        console.log(retVal)
        return retVal.every(v => v === true)
    }

    const eligiblePrograms = useMemo(() => {
        if (!repairPrograms || repairPrograms.length === 0) return { title: getPhrase('Not Eligible'), color: 'red', programs: [] }
        console.log('eligiblePrograms-useMemo', repairPrograms)
        const thePgms = repairPrograms.filter((pgm) => isQualified(pgm))
        return { title: getPhrase(thePgms.length === 0 ? 'Not Eligible' : 'Eligible'), color: thePgms.length === 0 ? 'red' : 'green', programs: thePgms }
    }, [repairPrograms, state.answers, state.selectedRepairs])

    useEffect(() => {
        if (destination !== 'Eligibility') return
        dispatch({ type: 'Progress', payload: { label: eligiblePrograms.title, color: eligiblePrograms.color, size: 16 } })
        if (eligiblePrograms.programs.length === 0) {
            dispatch({ type: 'notEligibleReason', payload: CONST_NO_PROGRAMS })
            navigate('NotEligible')
        }
    }, [destination, eligiblePrograms])

    return { eligiblePrograms, dispatch, destination, navigate, language, getPhrase, isBusy }
}
