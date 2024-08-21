
//Military
import { useContext } from "react";
import { Button, Space } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { Progress, Question } from "../components";
import { MainContext } from "../context/MainContext";

//Over 55
export function MilitarySenior() {
  const { isEligible, hasAnswseredQuestions, language, getPhrase } = useContext(MainContext);
  const navigate = useNavigate();

  const nextStep = () => {
    if (!hasAnswseredQuestions(['Vet', 'Over55'])) return
    isEligible(['Vet', 'Over55']) ? navigate('/repairs') : navigate('/noteligible')
  }

  return (
    <>
      <Progress steps={[
        { label: getPhrase('location'), color: 'cyan', size: 20 },
        { label: getPhrase('homeInfo'), color: 'cyan', size: 20 },
        { label: getPhrase('income'), color: 'cyan', size: 20 },
        { label: getPhrase('other'), color: 'cyan', size: 20 },
      ]} />
      <Space h='md' />

      <Question questionKey='Vet' show={true} />
      <Question questionKey='Over55' show={true} />

      <Button onClick={() => nextStep()}>{language === 'en' ? 'Proceed' : 'Proceder'}</Button>
    </>
  )
}
