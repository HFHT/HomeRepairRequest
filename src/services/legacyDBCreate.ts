import { fetchText } from ".";
import { capitalize, getAddressComponent } from "../utils";

export async function legacyDBCreate(obj: any, noSave: boolean = false, test = false) {
    console.log('legacyDBCreate', obj)
    var legacyFormat = { ...obj }
    if (!test) {
        legacyFormat = {
            cLast: obj.lastName,
            cFirst: obj.firstName,
            cAdd: obj.address.formatted,
            cAddrNum: getAddressComponent(obj.address.place, 'street_number'),
            cAddrStreet: getAddressComponent(obj.address.place, 'route'),
            cAddrCity: getAddressComponent(obj.address.place, 'locality'),
            cAddrState: getAddressComponent(obj.address.place, 'administrative_area_level_1', true),
            cAddrZip: getAddressComponent(obj.address.place, 'postal_code'),
            cAptLot: obj.address2,
            cMailAddr: '',
            cPhone: obj.phone,
            cMaritalStatus: obj.maritalStatus,
            cEmail: obj.email,
            cVet: obj.answers.Vet,
            cAge55: obj.answers.Over55,
            cProgram: '',
            cResidents: obj.others.length > 0 ? obj.others.filter((of: any) => of.name !== '').map((om: any) => `${om.name} (${om.age}) - ${om.relationship}`).toString() : '',
            cDetails: {
                Hear: '',
                Income: 'Yes',
                MLot: 'Yes',
                MPerm: 'Yes',
                Labor: 'Yes',
                Partner: 'Yes',
                Own: 'Yes',
                Primary: 'Yes',
                Insurance: 'Yes',
                Mobile: capitalize(obj.answers.MfgHome),
            },
            cRepairsReq: obj.selectedRepairs.toString()
        }
    }
    console.log('legacyDBCreate', legacyFormat)

    const header: any = { method: "POST", /* mode: 'no-cors',*/ headers: new Headers() }
    header.body = JSON.stringify({ q: { ...legacyFormat } })
    if (noSave) { console.log(header); return null }
    // return await fetchJson(import.meta.env.VITE_MYSQL_API, header)
    return await fetchText(import.meta.env.VITE_LEGACY_API, { ...header, 'Access-Control-Allow-Origin': '*' })

}
