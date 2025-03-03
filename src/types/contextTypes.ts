import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal } from "react"
import { IncomeType, QuestionsType, RepairsType, TitlesType, ZipCodesType } from "../hooks"
import { GoogleAddressType } from "."

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
    otherResouceURL: string | undefined,
    repairList: RepairsType | undefined,
    titles: TitlesType | undefined,
    income: IncomeType | undefined,
    destination: string,
    navigate: Function,
    language: 'en' | 'es',
    isBusy: boolean
}
export type MainContextStateType = {
    address: GoogleAddressType | undefined,
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
    selectedRepairs: string[],
    notEligibleReason: string[]
}
export type MainContextProviderType = {
    children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined,
    props: any
}