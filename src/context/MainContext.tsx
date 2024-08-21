import { createContext, useEffect, useReducer } from "react";
import { useZipCodes } from "../hooks/useZipCodes";
import { QuestionsType, useQuestions } from "../hooks";
import { MainContextProviderType, MainContextStateType, MainContexType } from "../types";

const initialState: MainContextStateType = {
    address: undefined,
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
    answers: {},
    notEligibleReason: []
}
export const MainContext = createContext<MainContexType>({
    state: initialState,
    dispatch: () => { },
    isEligible: () => { },
    hasAnswseredQuestions: () => { },
    getPhrase: () => { },
    getUrlParam: () => { },
    setInCity: () => { },
    questions: [],
    zipcodes: [],
    income: undefined,
    repairList: undefined,
    titles: undefined,
    language: 'en',
    isBusy: false,
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
        case "selectedRepairs": return { ...state, answers: { ...state.answers, selectedRepairs: action.payload } }




        case "homeInfo": return { ...state, homeInfo: action.payload }
        case "notEligible": return { ...state, eligible: false }
        case "notEligibleReason": return { ...state, notEligibleReason: action.payload }
        default: return state
    }
}
export const MainContextProvider = (props: MainContextProviderType) => {

    const [state, dispatch] = useReducer(reducer, initialState)
    const [zipCodes, getZipCodes, isBusy] = useZipCodes()
    const [questions, phrases, income, repairList, titles, getQuestions, isBusyQ] = useQuestions()

    useEffect(() => {
        console.log(props.props.params.get('language'))
        getZipCodes()
        getQuestions()
    }, [])

    const getUrlParam = (paramKey: string) => {
        return props.props.params.get(paramKey)
    }

    const theLanguage = (): 'es' | 'en' => {
        if (getUrlParam('language') === 'es') return 'es'
        return navigator.language.slice(0, 2).toLowerCase() === 'es' ? 'es' : 'en'
    }

    getUrlParam('location') ? getUrlParam('location') : navigator.language.slice(0, 2).toLowerCase() === 'es' ? 'es' : 'en'

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
        let retPhase = phrases[theLanguage() as keyof typeof phrases]
        return retPhase[phaseKey as keyof typeof retPhase]
    }

    const setInCity = (isInCity: boolean) => {
        console.log(isInCity)
        if (Object.keys(state.answers).includes('City')) return
        dispatch({ type: 'City', payload: isInCity ? 'yes' : 'no' })
    }

    return (
        <MainContext.Provider value={{
            state: state,
            dispatch: dispatch,
            isEligible: isEligible,
            hasAnswseredQuestions,
            getPhrase: getPhrase,
            getUrlParam: getUrlParam,
            setInCity: setInCity,
            zipcodes: zipCodes,
            questions: questions,
            repairList: repairList,
            titles: titles,
            income: income,
            language: theLanguage(),
            isBusy: isBusy || isBusyQ
        }}>
            {props.children}
        </MainContext.Provider>
    )
}