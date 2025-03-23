import { fetchJson } from "."

export type putWebHitsType = {
    db: string
    collection: string
    data: any,
    _id: any,
    noSave?: boolean
}

export async function putWebHits({ db, collection, data, _id, noSave = false }: putWebHitsType) {
    const header: any = { method: "PUT", headers: new Headers() }
    header.body = JSON.stringify({ db: db, collection: collection, _id: _id, data: { ...data } })
    if (noSave) { console.log(header); return null }
    return await fetchJson(import.meta.env.VITE_MONGOWEBHIT_URL, header)
}
