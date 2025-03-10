import { createContext, useEffect, useMemo, useReducer, useState } from "react";
import { useZipCodes } from "../hooks/useZipCodes";
import { QuestionsType, useExitPrompt, useParams, useQuestions, useVisits } from "../hooks";
import { MainContextParamType, MainContextProviderType, MainContextStateType, MainContexType } from "../types";
import { useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const initialState: MainContextStateType = {
    address: undefined,
    answers: {},
    notEligibleReason: [],
    program: undefined,
    progressSteps: [],
    responses: {
        Emergency: false,
        County: true,
        City: true,
        OwnHome: false,
        haveIns: false,
        MfgHome: false,
        OwnLot: true,
        eligible: true
    },
    selectedRepairs: []
}
export const MainContext = createContext<MainContexType>({
    state: initialState,
    dispatch: () => { },
    isEligible: () => { },
    hasAnswseredQuestions: () => { },
    getPhrase: () => { },
    setInCity: () => { },
    questions: [],
    otherResouceURL: undefined,
    params: undefined,
    zipcodes: [],
    income: undefined,
    repairList: undefined,
    programRepairs: [],
    destination: 'Start',
    navigate: () => { },
    language: 'en',
    mobile: false,
    isBusy: false,
    visit: undefined
})
const reducer = (state: MainContextStateType, action: { type: string, payload: any }) => {
    console.log(action)
    switch (action.type) {
        case "reset": return { ...initialState }
        case "address": return { ...state, address: action.payload }
        case "County": return { ...state, answers: { ...state.answers, County: action.payload } }
        case "City": return { ...state, answers: { ...state.answers, City: action.payload } }
        case "Emergency": return { ...state, answers: { ...state.answers, Emergency: action.payload } }
        case "OwnHome": return { ...state, answers: { ...state.answers, OwnHome: action.payload } }
        case "haveIns": return { ...state, answers: { ...state.answers, haveIns: action.payload } }
        case "OwnLot": return { ...state, answers: { ...state.answers, OwnLot: action.payload } }
        case "MfgHome": return { ...state, answers: { ...state.answers, MfgHome: action.payload } }
        case "Income": return { ...state, answers: { ...state.answers, Income: action.payload } }
        case "Vet": return { ...state, answers: { ...state.answers, Vet: action.payload } }
        case "Over55": return { ...state, answers: { ...state.answers, Over55: action.payload } }
        case "Program": return { ...state, program: action.payload }
        case "Progress": return { ...state, progressSteps: [...state.progressSteps, action.payload] }
        case "selectedRepairs": return { ...state, selectedRepairs: [...action.payload] }
        case "homeInfo": return { ...state, homeInfo: action.payload }
        case "notEligible": return { ...state, eligible: false }
        case "notEligibleReason": return { ...state, notEligibleReason: action.payload }
        default: return state
    }
}
export const MainContextProvider = (props: MainContextProviderType) => {
    const theme = useMantineTheme()
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)

    const [state, dispatch] = useReducer(reducer, initialState)
    const [destination, setDestination] = useState('Start')
    const params: MainContextParamType = useParams(['pgm', 'nosave', 'noemail', 'lang'])
    const [zipCodes, getZipCodes, isBusy] = useZipCodes()
    const [questions, phrases, income, repairList, otherResouceURL, getQuestions, isBusyQ] = useQuestions()
    const [showExitPrompt, setShowExitPrompt] = useExitPrompt(false)
    const { visit, putVisit } = useVisits()

    useEffect(() => {
        getZipCodes()
        getQuestions()
    }, [])

    useEffect(() => {
        if (!params) return
        if (params.pgm) dispatch({ type: 'Program', payload: params.pgm })
    }, [params])

    const programRepairs = useMemo(() => {
        if (!repairList || !state.program) return []
        const theRepairs = repairList.Programs.find((p) => p.hasOwnProperty(state.program))
        console.log('programRepairs-useMemo', theRepairs)
        return theRepairs ? theRepairs[state.program] : []

    }, [repairList, state.program])

    const theLanguage = (): 'es' | 'en' => {
        if (params && params.lang === 'es') return 'es'
        return navigator.language.slice(0, 2).toLowerCase() === 'es' ? 'es' : 'en'
    }

    const hasAnswseredQuestions = (keys: string[]) => {
        if (!questions) return false
        let retVal: boolean[] = []
        keys.forEach((k, idx) => {
            retVal = [...retVal, k in state.answers]
        })
        return retVal.every(v => v === true)
    }
    const isEligible = (keys: string[]) => {
        console.log(state.answers)
        let retVal: boolean[] = []
        let retReasons: string[] = []
        const passTest = (stateVal: string, answerVal: QuestionsType | undefined) => {
            console.log(stateVal, answerVal)
            if (!answerVal) return false
            if (answerVal.pass === undefined) return false
            if (!stateVal) return false
            return stateVal !== answerVal.pass
        }
        if (!questions) return false
        keys.forEach((k, idx) => {
            let theQuestion = questions.find((q: QuestionsType) => q.key === k)
            console.log(theQuestion)
            retVal = [...retVal, passTest(state.answers[k as keyof typeof state.answers], theQuestion)]
            if (retVal[idx]) retReasons = [...retReasons, theQuestion!.r[theLanguage()]]
        })
        console.log(retVal, retVal.every(v => v === false), retReasons)
        retReasons.length > 0 && dispatch({ type: 'notEligibleReason', payload: retReasons })
        return retVal.every(v => v === false)
    }

    const getPhrase = (phaseKey: string) => {
        if (!phrases) return ''
        if (theLanguage() === 'en') return phaseKey
        return phrases[phaseKey as keyof typeof phrases]
        // let retPhase = phrases[theLanguage() as keyof typeof phrases]
        // return retPhase[phaseKey as keyof typeof retPhase]
    }

    const setInCity = (isInCity: boolean) => {
        console.log(isInCity)
        if (Object.keys(state.answers).includes('City')) return
        dispatch({ type: 'City', payload: isInCity ? 'yes' : 'no' })
    }
    const navigate = (dest: string) => {
        !showExitPrompt && setShowExitPrompt(true)
        setDestination(dest)
    }
    return (
        <MainContext.Provider value={{
            state: state,
            dispatch: dispatch,
            isEligible: isEligible,
            hasAnswseredQuestions,
            getPhrase: getPhrase,
            setInCity: setInCity,
            zipcodes: zipCodes,
            params: params,
            questions: questions,
            otherResouceURL: otherResouceURL,
            repairList: repairList,
            programRepairs: programRepairs,
            destination: destination,
            navigate: navigate,
            income: income,
            language: theLanguage(),
            mobile: mobile,
            isBusy: isBusy || isBusyQ,
            visit: visit
        }}>
            {props.children}
        </MainContext.Provider>
    )
}