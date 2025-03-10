// paramList contains an array of accepted URL parameters
// returns an object using the values in the paramList:
// false - the param isn't in the URLSearchParams
// true - the param is in the URLSearchParams with no value
// value - the param is in the URLSearchParams with a value

import { useEffect, useState } from "react";

export function useParams(paramList: string[]): any {
    const [params, setParams] = useState<any>(undefined)

    useEffect(() => {
        let retParms: any = {}
        const urlParams = new URLSearchParams(window.location.search);
        console.log(urlParams)
        paramList.forEach((p: string) => {
            const param = urlParams.get(p)
            retParms[p] = param === null ? false : (param === '' ? true : param)
        })
        setParams(retParms)
    }, [])

    return params;
}