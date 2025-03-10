
//Military
import { useContext } from "react";
import { Button, Space } from "@mantine/core";
import { Progress, Question } from "../components";
import { MainContext } from "../context/MainContext";

//Over 55
export function MilitarySenior() {
  const { dispatch, isEligible, hasAnswseredQuestions, destination, navigate, getPhrase } = useContext(MainContext);

  const nextStep = () => {
    if (!hasAnswseredQuestions(['Vet', 'Over55'])) return
    isEligible(['Vet', 'Over55']) ? navigate('Repairs') : navigate('NotEligible')
  }
  if (destination !== 'MilitarySenior') return <></>
  return (
    <>
      <Progress steps={[
        { label: getPhrase('Location'), color: 'cyan', size: 20 },
        { label: getPhrase('Home'), color: 'cyan', size: 20 },
        { label: getPhrase('Income'), color: 'cyan', size: 20 },
        { label: getPhrase('Other'), color: 'cyan', size: 20 },
      ]} />
      <Space h='md' />

      <Question questionKey='Vet' show={true} />
      <Question questionKey='Over55' show={true} />

      <Button onClick={() => {
        dispatch({ type: 'Progress', payload: { label: getPhrase('Repairs'), color: 'cyan', size: 14 } })
        nextStep()
      }}>{getPhrase('Proceed')}</Button>
    </>
  )
}
