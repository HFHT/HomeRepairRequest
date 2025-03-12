
//Military
import { useContext } from "react";
import { Button, Paper, Stack } from "@mantine/core";
import { Question } from "../components";
import { MainContext } from "../context/MainContext";

//Over 55
export function MilitarySenior() {
  const { dispatch, isEligible, hasAnswseredQuestions, destination, navigate, getPhrase } = useContext(MainContext);

  const nextStep = () => {
    if (!hasAnswseredQuestions(['Vet', 'Over55'])) return
    dispatch({ type: 'Progress', payload: { label: getPhrase('Repairs'), color: 'cyan', size: 14 } })
    isEligible(['Vet', 'Over55']) ? navigate('Repairs') : navigate('NotEligible')
  }
  if (destination !== 'MilitarySenior') return <></>
  return (
      <Paper>
        <Stack p='xs' gap='xs' align='stretch' justify='center'>
          <Question questionKey='Vet' show={true} />
          <Question questionKey='Over55' show={true} />
          <Button ml='xs' onClick={() => {
            nextStep()
          }}>{getPhrase('Proceed')}</Button>
        </Stack>
      </Paper>
  )
}
