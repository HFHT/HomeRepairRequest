import { fetchJson } from "."

export type geocodeType = {
    results: geocodeResultType[]
}
export type geocodeResultType = {
    address_components: geocodeAddressComponentsType[]
}
export type geocodeAddressComponentsType = {
    long_name: string,
    short_name: string,
    formatted_address: string,
    place_id: string,
    types: geocodeAddressComponentsTypesType[]
}
export type geocodeAddressComponentsTypesType = 'street_number' | 'route' | 'locality' | 'administrative_area_level_1' | 'country'

export const googleGeocode = async (placePredictions: any) => {
    return fetchJson(`https://maps.googleapis.com/maps/api/geocode/json?address=${placePredictions}&key=${import.meta.env.VITE_GOOGLE_APIKEY}`)
}