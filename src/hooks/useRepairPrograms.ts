import { useState } from "react"
import { getMongoItem } from "../services"
import { useErrorBoundary } from "react-error-boundary"
import { CONST_DB, CONST_DB_PROGRAMS } from "../utils"

export type useRepairPrograms = {
    connection: { url: string, collection: string, key: string }
    setter: Function
    noSave?: boolean
}
export type RepairProgramsType = {
    _id: string | number,
    ProgramName: string,
    Description: {en: string, es: string},
    Eligible: {en:string, es:string},
    NoFunds: {en:string, es:string},
    Active: boolean,
    Funding: boolean,
    WaitTime: {en:string, es:string},
    RepairTypes: string[],
    Qualifications: string[]
}
export function useRepairPrograms() {
    const [repairPrograms, setRepairPrograms] = useState<RepairProgramsType[] | undefined>()
    const [isBusy, setIsBusy] = useState(false)
    const { showBoundary } = useErrorBoundary()

    async function fetchMongo(_id?: string | null | undefined) {
        try {
            setIsBusy(true)
            setRepairPrograms(
                (
                    await getMongoItem({ db: CONST_DB, collection: CONST_DB_PROGRAMS, query: {  } })
                )
            )
            setIsBusy(false)
        } catch (error) {
            setIsBusy(false)
            showBoundary(error)
        }
    }
    return [repairPrograms, fetchMongo, isBusy] as const
}
