import { fetchJson } from "."

export type getMongoType = {
    db: string
    collection: string
    query?: {}
}

export async function getMongoItem({ db, collection, query = {} }: getMongoType) {
    const header: any = { method: "GET", headers: new Headers() }
    // return await fetchJson(`${import.meta.env.VITE_MONGOGET_URL}?${new URLSearchParams({ db: db, collection: collection, find: (query ? query.toString() : '') })}`, header)

    return await fetchJson(`${import.meta.env.VITE_MONGOGET_URL}?${new URLSearchParams({ db: db, collection: collection, find: JSON.stringify(query) })}`, header)
}
