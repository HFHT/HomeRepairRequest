import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal } from "react"
import { IncomeType, QuestionsType, RepairsType, TitlesType, ZipCodesType } from "../hooks"

export type MainContexType = {
    state: MainContextStateType,
    dispatch: Function,
    isEligible: Function,
    hasAnswseredQuestions: Function,
    getPhrase: Function,
    getUrlParam: Function,
    setInCity: Function,
    zipcodes: ZipCodesType[] | undefined,
    questions: QuestionsType[] | undefined,
    repairList: RepairsType | undefined,
    titles: TitlesType | undefined,
    income: IncomeType | undefined,
    language: 'en' | 'es',
    isBusy: boolean
}
export type MainContextStateType = {
    address: string | undefined,
    responses: {
        Emergency: boolean,
        County: boolean,
        City: boolean,
        OwnHome: boolean,
        haveIns: boolean,
        MfgHome: boolean,
        OwnLot: boolean,
        eligible: boolean
    }
    answers: { [key: string]: string },
    notEligibleReason: string[]
}
export type MainContextProviderType = {
    children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined,
    props: any
}