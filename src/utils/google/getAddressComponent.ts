import { geocodeAddressComponentsTypesType, geocodeType } from "../../services";
// Takes a Google Geocode object and a Geocode address component type, 
// returns the address component long_name associated with the address component type
export function getAddressComponent(geocode: geocodeType, type: geocodeAddressComponentsTypesType) {
    let retValue = ''
    geocode.results.length > 0 && geocode.results[0].address_components.forEach((geo) => {
        if (geo.types.includes(type)) retValue = geo.long_name
    })
    return retValue

}
