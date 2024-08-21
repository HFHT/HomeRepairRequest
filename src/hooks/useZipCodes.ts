import { useState } from "react"
import { getMongoItem } from "../services"
import { useErrorBoundary } from "react-error-boundary"
import { CONST_DB, CONST_DB_ZIPCODES } from "../utils"

export type useZipeCodesType = {
    connection: { url: string, collection: string, key: string }
    setter: Function
    noSave?: boolean
}
export type ZipCodesType = {
    ZIP: string,
    type: 'Std' | 'xyz',
    CityOfTucson: 'I' | 'O' | 'P' | 'X',
    Locality: string
}
export function useZipCodes() {
    const [zipCodes, setZipCodes] = useState<ZipCodesType[] | undefined>()
    const [isBusy, setIsBusy] = useState(false)
    const { showBoundary } = useErrorBoundary()

    async function fetchMongo(_id?: string | null | undefined) {
        try {
            setIsBusy(true)
            setZipCodes(
                (
                    await getMongoItem({ db: CONST_DB, collection: CONST_DB_ZIPCODES, query: { _id: 0 } })
                )[0].ZipCodes.filter((zip: ZipCodesType) => zip.CityOfTucson === 'P')
            )
            setIsBusy(false)
        } catch (error) {
            setIsBusy(false)
            showBoundary(error)
        }
    }
    return [zipCodes, fetchMongo, isBusy] as const
}
