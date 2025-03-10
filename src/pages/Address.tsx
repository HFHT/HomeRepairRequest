//Address
import { useContext, useEffect, useState } from "react";
import { Button, Space } from "@mantine/core";
import { GoogleAutocomplete, Progress, Question } from "../components";
import { MainContext } from "../context/MainContext";
import { CONST_CITY, getAddressComponent } from "../utils";
import { GoogleAddressType } from "../types";

export function Address({ props }: any) {
  const { dispatch, state, zipcodes, isEligible, hasAnswseredQuestions, destination, navigate, getPhrase, setInCity, mobile } = useContext(MainContext);
  const [address, setAddress] = useState<GoogleAddressType | undefined>()

  const isInCounty = () => {
    if (address === undefined || address?.place === undefined) return false
    return getAddressComponent(address.place, 'administrative_area_level_2') !== 'Pima County'
  }
  const isInCity = () => {
    if (address === undefined || address?.place === undefined) return false
    let theZip = getAddressComponent(address.place, 'postal_code')
    return zipcodes!.filter((zip) => zip.ZIP === theZip).length > 0
  }

  const theProgram = () => {
    if (mobile) return state.program === 'CHR' ? 'Critical' : 'Minor'
    return state.program === 'CHR' ? 'Critical Repair' : 'Minor Repair'
  }
  const nextStep = () => {
    if (!address) return
    let q = ['Emergency']
    if (isInCity()) q.push('City')
    if (isInCounty()) q.push('County')
    if (!hasAnswseredQuestions(q)) return
    setInCity(getAddressComponent(address.place, 'locality') === CONST_CITY)
    isEligible(['County', 'Emergency']) ? navigate('HomeInfo') : navigate('NotEligible')
  }

  useEffect(() => {
    setAddress(undefined)
    dispatch({ type: 'reset' })
  }, [])
  if (destination !== 'Address') return <></>
  return (
    <>
      <Progress steps={[{ label: theProgram(), color: 'cyan', size: 20 }]} />
      <Space h='md' />
      <GoogleAutocomplete placeholder={`${getPhrase('Address')}...`}
        setAddress={(e: any) => {
          setAddress(e)
          dispatch({ type: 'address', payload: e })
        }} />
      <Question questionKey='County' show={isInCounty()} />
      <Question questionKey='City' show={isInCity()} />
      <Question questionKey='Emergency' show={!(address === undefined || address?.place === undefined)} />

      <Button onClick={() => {
        dispatch({ type: 'Progress', payload: { label: getPhrase('Home'), color: 'cyan', size: 14 } })
        nextStep()
      }}>{getPhrase('Proceed')}</Button>
    </>
  )
}
