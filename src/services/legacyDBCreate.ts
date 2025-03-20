import { fetchText } from ".";
import { capitalize, getAddressComponent } from "../utils";

export async function legacyDBCreate(obj: any, noSave: boolean = false, test = false) {
    console.log('legacyDBCreate', obj)
    var legacyFormat = { ...obj }
    const programMapping = () => {
        console.log(obj.eligiblePrograms)
        return obj.eligiblePrograms.map((em: any) => em.ProgramName).toString()
    }
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
            cMailAddr: obj.mailAddress,
            cProgram: programMapping(),
            cSex: 'Other',
            cPhone: obj.phone,
            cMaritalStatus: obj.maritalStatus,
            cEmail: obj.email,
            cVet: capitalize(obj.answers.Vet),
            cAge55: capitalize(obj.answers.Over55),
            cResidents: obj.others.length > 0 ? obj.others.filter((of: any) => of.name !== '').map((om: any) => `${om.name} (${om.age}) - ${om.relationship}`).toString() : '',
            cDetails: `{"Hear":"Website","Own":"Yes","Primary":"Yes","Income":"Yes","Insurance":"Yes","Mobile":"${capitalize(obj.answers.MfgHome)}","MLot":"Yes","MPerm":"Yes","Labor":"Yes","Partner":"Yes"}`,
            // cDetails: {
            //     Hear: 'Website',
            //     Income: 'Yes',
            //     MLot: 'Yes',
            //     MPerm: 'Yes',
            //     Labor: 'Yes',
            //     Partner: 'Yes',
            //     Own: 'Yes',
            //     Primary: 'Yes',
            //     Insurance: 'Yes',
            //     Mobile: capitalize(obj.answers.MfgHome),
            // },
            cRepairsReq: `Programs: ${programMapping()} - Repairs: ${obj.selectedRepairs.toString()}; ${obj.selectedRepairsDesc}`
        }
    }
    console.log('legacyDBCreate', legacyFormat)

    const header: any = { method: "POST", /* mode: 'no-cors',*/ headers: new Headers() }
    header.body = JSON.stringify({ q: { ...legacyFormat } })
    if (noSave) { console.log(header); return null }
    // return await fetchJson(import.meta.env.VITE_MYSQL_API, header)
    return await fetchText(import.meta.env.VITE_LEGACY_API, { ...header, 'Access-Control-Allow-Origin': '*' })

}
