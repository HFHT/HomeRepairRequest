//Own Home and primary residence
//Mobile Home
//Own Site and permanently attached
//Homeowners Insurance

//Address
import { useContext } from "react";
import { Button, Space } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { Progress, Question } from "../components";
import { MainContext } from "../context/MainContext";

export function HomeInfo({ props }: any) {
  const { state, isEligible, hasAnswseredQuestions, language, getPhrase } = useContext(MainContext);
  const navigate = useNavigate();

  const nextStep = () => {
    let q = ['OwnHome', 'haveIns', 'MfgHome']
    if (state.answers.MfgHome === 'yes') q.push('OwnLot')
    if (!hasAnswseredQuestions(q)) return

    isEligible(['OwnHome', 'haveIns', 'MfgHome', 'OwnLot']) ? navigate('/income') : navigate('/noteligible')
  }

  return (
    <>
      <Progress steps={[
        { label: getPhrase('location'), color: 'cyan', size: 20 },
        { label: getPhrase('homeInfo'), color: 'cyan', size: 20 }
      ]} />
      <Space h='md' />

      <Question questionKey='OwnHome' show={true} />
      <Question questionKey='haveIns' show={true} />
      <Question questionKey='MfgHome' show={true} />
      <Question questionKey='OwnLot' show={state.answers.MfgHome === 'yes'} />

      <Button onClick={() => nextStep()}>{language === 'en' ? 'Proceed' : 'Proceder'}</Button>
    </>
  )
}

