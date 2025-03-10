import { useEffect, useState } from "react";
import getBrowserFingerprint from 'get-browser-fingerprint';
export function useFingerPrint() {
    const [fingerPrint, setFingerPrint] = useState<number | undefined>()
    const getFingerPrint = async () => {
        setFingerPrint(await getBrowserFingerprint())
    }

    useEffect(() => {
        getFingerPrint()
    }, [])

    return { fingerPrint } as const
}
