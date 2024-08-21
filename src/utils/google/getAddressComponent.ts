import { GooglePlaceType, GooglePlaceTypesType } from "../../types";
// Takes a Google Geocode object and a Geocode address component type, 
// returns the address component long_name associated with the address component type
export function getAddressComponent(places: GooglePlaceType[], type: GooglePlaceTypesType) {
    let retValue = ''
    places.length > 0 && places.forEach((geo) => {
        if (geo.types.includes(type)) retValue = geo.longText
    })
    return retValue

}
