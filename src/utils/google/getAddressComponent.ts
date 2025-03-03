import { GooglePlaceType, GooglePlaceTypesType } from "../../types";
// Takes a Google Geocode object and a Geocode address component type, 
// returns the address component long_name associated with the address component type
export function getAddressComponent(places: GooglePlaceType[] | undefined, type: GooglePlaceTypesType, short = false) {
    if (!places) return ''
    let retValue = ''
    places.length > 0 && places.forEach((geo) => {
        if (geo.types.includes(type)) retValue = short ? geo.shortText : geo.longText
    })
    return retValue

}
