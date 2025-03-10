import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal } from "react"
import { IncomeType, QuestionsType, RepairsType, RepairType, ZipCodesType } from "../hooks"
import { GoogleAddressType } from "."

export type MainContexType = {
    state: MainContextStateType,
    dispatch: Function,
    isEligible: Function,
    hasAnswseredQuestions: Function,
    getPhrase: Function,
    setInCity: Function,
    zipcodes: ZipCodesType[] | undefined,
    questions: QuestionsType[] | undefined,
    otherResouceURL: string | undefined,
    params: MainContextParamType | undefined,
    repairList: RepairsType | undefined,
    programRepairs: RepairType[] | [],
    income: IncomeType | undefined,
    destination: string,
    navigate: Function,
    language: 'en' | 'es',
    mobile: boolean | undefined,
    isBusy: boolean,
    visit: any | undefined
}
export type MainContextStateType = {
    address: GoogleAddressType | undefined,
    answers: { [key: string]: string },
    notEligibleReason: string[],
    program: 'CHR' | 'MHR' | undefined,
    progressSteps: { label: string, color: string, size: number }[],
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
    selectedRepairs: string[]
}
export type MainContextProviderType = {
    children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined,
    props: any
}
export type MainContextParamType = {
    pgm: string | boolean,
    lang: 'es' | 'en' | false
    nosave: boolean,
    noemail: boolean
}