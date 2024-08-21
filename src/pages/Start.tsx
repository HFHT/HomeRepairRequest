//Address
import { useContext, useEffect, useState } from "react";
import { Button, Space } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { GoogleAutocomplete, Progress, Question } from "../components";
import { MainContext } from "../context/MainContext";
import { CONST_CITY, getAddressComponent } from "../utils";
import { GoogleAddressType } from "../types";

export function Start({ props }: any) {
  const { dispatch, zipcodes, isEligible, hasAnswseredQuestions, language, getPhrase, setInCity } = useContext(MainContext);
  const [address, setAddress] = useState<GoogleAddressType | undefined>()
  const navigate = useNavigate();

  const isInCounty = () => {
    if (address === undefined || address?.place === undefined) return false
    return getAddressComponent(address.place, 'administrative_area_level_2') !== 'Pima County'
  }
  const isInCity = () => {
    if (address === undefined || address?.place === undefined) return false
    let theZip = getAddressComponent(address.place, 'postal_code')
    return zipcodes!.filter((zip) => zip.ZIP === theZip).length > 0
  }

  const nextStep = () => {
    if (!address) return
    let q = ['Emergency']
    if (isInCity()) q.push('City')
    if (isInCounty()) q.push('County')
    if (!hasAnswseredQuestions(q)) return
    setInCity(getAddressComponent(address.place, 'locality') === CONST_CITY)
    isEligible(['County', 'Emergency']) ? navigate('/homeinfo') : navigate('/noteligible')
  }

  useEffect(() => {
    setAddress(undefined)
    dispatch({ type: 'reset' })
  }, [])

  return (
    <>
      <Progress steps={[{ label: getPhrase('location'), color: 'cyan', size: 20 }]} />
      <Space h='md' />
      <GoogleAutocomplete placeholder={language === 'en' ? 'Address...' : 'Dirección...'}
        setAddress={(e: any) => {
          setAddress(e)
          dispatch({ type: 'address', payload: e })
        }} />
      <Question questionKey='County' show={isInCounty()} />
      <Question questionKey='City' show={isInCity()} />
      <Question questionKey='Emergency' show={!(address === undefined || address?.place === undefined)} />

      <Button onClick={() => nextStep()}>{language === 'en' ? 'Proceed' : 'Proceder'}</Button>
    </>
  )
}
