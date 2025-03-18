import { fetchJson } from "."

export type putMongoType = {
    db: string
    collection: string
    data: any,
    _id: any,
    noSave?: boolean
}

export async function putMongoItem({ db, collection, data, _id, noSave = false }: putMongoType) {
    const header: any = { method: "PUT", headers: new Headers() }
    header.body = JSON.stringify({ db: db, collection: collection, _id: _id, data: { ...data } })
    if (noSave) { console.log(header); return null }
    return await fetchJson(import.meta.env.VITE_MONGOPUT_URL, header)
}
