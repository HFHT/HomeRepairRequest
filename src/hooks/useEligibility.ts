import { useContext, useEffect, useMemo, useState } from "react"
import { RepairProgramsType, useRepairPrograms } from "."
import { MainContext } from "../context/MainContext";

export const CONST_MAX_LIEN = 1000000
const CONST_NO_PROGRAMS = 'Our current programs are for Veterans or Pima County residents outside the City of Tucson.'

export function useEligibility() {
    const { state, dispatch, destination, navigate, language, getPhrase, questions } = useContext(MainContext);
    const [progressAlreadySet, setProgressAlreadySet] = useState(false)

    const [repairPrograms, fetchMongo, isBusy] = useRepairPrograms()

    useEffect(() => {
        fetchMongo()
        // console.log(state.answers.selectedRepairs)
    }, [])

    const isQualified = (thePgm: RepairProgramsType) => {
        if (!thePgm.Active) return false
        if (thePgm.Type !== state.program) return false
        let retVal: boolean[] = []
        thePgm.Qualifications.forEach((pgm) => {
            let v = pgm.includes('!') ? 'no' : 'yes'
            retVal = [...retVal, state.answers[pgm.replace('!', '')] === v]
            // console.log(pgm.replace('!', ''), state.answers[pgm.replace('!', '')])
            // console.log(retVal)
        })
        state.answers.selectedRepairs && thePgm.RepairTypes.forEach((pgm) => {
            retVal = [...retVal, state.answers.selectedRepairs.includes(pgm)]
            // console.log(retVal, state.answers.selectedRepairs.includes(pgm))
        })
        state.selectedRepairs && state.selectedRepairs.forEach((pgm) => {
            retVal = [...retVal, thePgm.RepairTypes.length === 0 || thePgm.RepairTypes.includes(pgm)]
            // console.log(retVal, thePgm.RepairTypes.includes(pgm))
        })
        // console.log(retVal)
        return retVal.every(v => v === true)
    }

    const isSupplemental = (thePgm: RepairProgramsType, pgmList: any[]) => {
        if (thePgm.Supplements.length === 0) return false
        // console.log(thePgm.Supplements.some(value => pgmList.includes(value)))
        return thePgm.Supplements.some(value => pgmList.includes(value))
    }
    const hasLienRequirement = (thePgm: RepairProgramsType) => {
        if (!thePgm.Lien) return CONST_MAX_LIEN
        return thePgm.Lien
    }

    const eligiblePrograms = useMemo(() => {
        if (!repairPrograms || repairPrograms.length === 0) return { title: getPhrase('Not Eligible'), color: 'red', programs: [] }
        console.log('eligiblePrograms-useMemo', repairPrograms)
        const thePgms = repairPrograms.filter((pgm) => isQualified(pgm))
        const primaryPgms = thePgms.filter((pgm) => pgm.Supplements.length === 0)
        const primaryPgmsName = primaryPgms.map((pgm) => pgm._id)
        const supplementalPgms = thePgms.filter((pgm) => isSupplemental(pgm, primaryPgmsName))
        const lienRequired = thePgms.map((pgm) => hasLienRequirement(pgm))
        const lienAmount = lienRequired.length > 0 ? Math.min(...lienRequired) : null
        // console.log(thePgms, primaryPgms, supplementalPgms, primaryPgmsName, lienAmount)
        return { title: getPhrase(primaryPgms.length === 0 ? 'Not Eligible' : 'Eligible'), color: primaryPgms.length === 0 ? 'red' : 'green', lien: lienAmount, programs: [...primaryPgms, ...supplementalPgms] }
    }, [repairPrograms, state.answers, state.selectedRepairs])

    const canProceed = () => {
        console.log('canProceed', eligiblePrograms.lien, state.answers.Lien)
        if (eligiblePrograms.lien === CONST_MAX_LIEN) return 'RepairForm'
        if (state.answers.Lien === 'no') {
            const theReason = questions?.find((qf) => qf.key === 'Lien')
            dispatch({ type: 'notEligibleReason', payload: [{ title: theReason?.d.en, altPgm: theReason?.altPgm }] })
            return 'NotEligible'
        }
        if (state.answers.Lien === 'yes') return 'RepairForm'
    }

    useEffect(() => {
        if (destination !== 'Eligibility' || progressAlreadySet) return
        setProgressAlreadySet(true)
        // console.log(destination, eligiblePrograms)
        dispatch({ type: 'Progress', payload: { label: eligiblePrograms.title, color: eligiblePrograms.color, size: 16 } })
        dispatch({ type: 'EligiblePrograms', payload: eligiblePrograms.programs })
        if (eligiblePrograms.programs.length === 0) {
            dispatch({ type: 'notEligibleReason', payload: [{ title: CONST_NO_PROGRAMS, altPgm: undefined }] })
            navigate('NotEligible')
        }
    }, [destination, eligiblePrograms])

    return { eligiblePrograms, dispatch, destination, navigate, language, getPhrase, canProceed, isBusy }
}
