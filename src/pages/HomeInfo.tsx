//Own Home and primary residence
//Mobile Home
//Own Site and permanently attached
//Homeowners Insurance

//Address
import { useContext } from "react";
import { Button, Space } from "@mantine/core";
import { Progress, Question } from "../components";
import { MainContext } from "../context/MainContext";

export function HomeInfo({ props }: any) {
  const { state, isEligible, hasAnswseredQuestions, destination, navigate, getPhrase } = useContext(MainContext);

  const nextStep = () => {
    let q = ['OwnHome', 'haveIns', 'MfgHome']
    if (state.answers.MfgHome === 'yes') q.push('OwnLot')
    if (!hasAnswseredQuestions(q)) return

    isEligible(['OwnHome', 'haveIns', 'MfgHome', 'OwnLot']) ? navigate('Income') : navigate('NotEligible')
  }
  if (destination !== 'HomeInfo') return <></>
  return (
    <>
      <Progress steps={[
        { label: getPhrase('Location'), color: 'cyan', size: 20 },
        { label: getPhrase('Home'), color: 'cyan', size: 20 }
      ]} />
      <Space h='md' />

      <Question questionKey='OwnHome' show={true} />
      <Question questionKey='haveIns' show={true} />
      <Question questionKey='MfgHome' show={true} />
      <Question questionKey='OwnLot' show={state.answers.MfgHome === 'yes'} />

      <Button onClick={() => nextStep()}>{getPhrase('Proceed')}</Button>
    </>
  )
}

