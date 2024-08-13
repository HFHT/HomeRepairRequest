import { useEffect, useState } from "react";

export function useParams(paramList: string[]): any {
    const [params, setParams] = useState<any>([])

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        let retParms: any = {}
        paramList.forEach((p: string) => retParms[p] = (params.get(p) !== null))
        setParams(retParms)
    }, [])

    return params;
}