import { useContext, useEffect, useState } from "react"
import { useErrorBoundary } from "react-error-boundary"
import { getMongoItem, putMongoItem, putWebHits } from "../services"
import { CONST_DB, CONST_DB_VISITS, CONST_DB_WEBHITS, uniqueKey } from "../utils"
import dayjs from "dayjs"
import { MainContext } from "../context/MainContext"

type VisitsType = {
    _id: string,
    visits: VisitType[]
}
type VisitType = {
    key: number | string,
    answers: {},
    eligiblePrograms: any,
    notEligibleReason: any,
    program: any
}
export function useVisits() {
    const { params } = useContext(MainContext)
    const [isBusy, setIsBusy] = useState(false)
    const { showBoundary } = useErrorBoundary()
    const [visit, setVisit] = useState<VisitsType | undefined>(undefined)
    const [sessionKey, setSessionKey] = useState<string | number | undefined>(uniqueKey())


    const getVisit = async (_id: string) => {
        try {
            setIsBusy(true)
            let thisVisit: VisitsType[] = await getMongoItem({ db: CONST_DB, collection: CONST_DB_VISITS, query: { _id: _id } })
            console.log(thisVisit)
            setVisit(thisVisit[0])
            setIsBusy(false)
        } catch (error) {
            setIsBusy(false)
            showBoundary(error)
        }
    }
    const putVisit = async (theState: any) => {
        console.log('putVisit')
        if (!theState || !theState.address || !theState.address.formatted || !sessionKey) { console.warn('putVisits-invalid', theState, sessionKey); return }
        let thisVisit = undefined
        let newSession = {
            key: sessionKey,
            fingerprint: theState.fingerprint,
            date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            answers: theState.answers,
            eligiblePrograms: theState.eligiblePrograms.map((em: any) => em._id),
            notEligibleReason: theState.notEligibleReason,
            program: theState.program
        }
        if (!visit) {
            thisVisit = {
                _id: theState.address.formatted,
                visits: [{ ...newSession }]
            }
        } else {
            thisVisit = { ...visit }
            let thisSessionIdx = thisVisit.visits.findIndex((vf) => vf.key === sessionKey)
            console.log(thisSessionIdx)
            if (thisSessionIdx < 0) {
                thisVisit = {
                    ...thisVisit, visits: [...thisVisit.visits, newSession]
                }
                thisSessionIdx = thisVisit.visits.findIndex((vf) => vf.key === sessionKey)
            }
            thisVisit.visits[thisSessionIdx] = { ...newSession }
        }
        setVisit(thisVisit)
        putMongoItem({ db: CONST_DB, collection: CONST_DB_VISITS, _id: thisVisit._id, data: { ...thisVisit } })
    }
    const putWebHit = async (fingerPrint: any) => {
        console.log('fingerPrint', fingerPrint)
        if (!fingerPrint) return
        putWebHits({ db: CONST_DB, collection: CONST_DB_WEBHITS, _id: dayjs().format('YYYY-MM-DD'), data: { hits: { fingerprint: fingerPrint, time: dayjs().format('HH:mm:ss') } }, noSave: params?.nosave })
    }

    return { visit, getVisit, putVisit, putWebHit, isBusy } as const
}
