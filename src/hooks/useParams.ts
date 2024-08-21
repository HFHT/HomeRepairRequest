import { useEffect, useState } from "react";

export function useParams(paramList: string[]): any {
    const [params, setParams] = useState<any>(undefined)

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        console.log(urlParams)
        let retParms: any = {}
        paramList.forEach((p: string) => retParms[p] = (urlParams.get(p) !== null))
        setParams(retParms)
    }, [])

    return params;
}