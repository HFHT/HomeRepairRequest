import { useEffect, useState } from "react"
import { useFingerPrint } from "."
import { useErrorBoundary } from "react-error-boundary"
import { getMongoItem } from "../services"
import { CONST_DB, CONST_DB_VISITS } from "../utils"

export function useVisits() {
    const { fingerPrint } = useFingerPrint()
    const [isBusy, setIsBusy] = useState(false)
    const { showBoundary } = useErrorBoundary()
    const [visit, setVisit] = useState()
    const getVisit = async () => {
        if (!fingerPrint) { console.warn('useVisits-no-fingerprint'); return }
        try {
            setIsBusy(true)
            setVisit(
                (
                    await getMongoItem({ db: CONST_DB, collection: CONST_DB_VISITS, query: { _id: fingerPrint } })
                )
            )
            setIsBusy(false)
        } catch (error) {
            setIsBusy(false)
            showBoundary(error)
        }
    }
    const putVisit = async (theVisit: any) => {
        console.log('putVisit', theVisit)
    }
    useEffect(() => {
        if (!fingerPrint) return
        getVisit()
    }, [fingerPrint])

    return { visit, fingerPrint, getVisit, putVisit, isBusy } as const
}
