import { useState, useEffect } from "react"
import { googleAutocomplete } from "../services"
import { predictionType } from "../types"

export function usePlacesAutocomplete(text = '', debounceTimeout = 200) {
  const [predictions, setPredictions] = useState<predictionType[]>([])

  useEffect(() => {
    const handleDebounce = setTimeout(async () => {
      try {
        if (!text) {
          setPredictions([])
          return
        }
        const nextPredictions = await googleAutocomplete(text)
        //@ts-ignore
        setPredictions(nextPredictions)
      } catch (e) {
        console.error(e)
      }
    }, debounceTimeout)

    return () => {
      clearTimeout(handleDebounce)
    }
  }, [text, debounceTimeout])

  return [predictions] as const
}