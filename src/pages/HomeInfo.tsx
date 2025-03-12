//Own Home and primary residence
//Mobile Home
//Own Site and permanently attached
//Homeowners Insurance

//Address
import { useContext } from "react";
import { Button, Paper, Stack } from "@mantine/core";
import { Question } from "../components";
import { MainContext } from "../context/MainContext";

export function HomeInfo({ props }: any) {
  const { state, dispatch, isEligible, hasAnswseredQuestions, destination, navigate, getPhrase } = useContext(MainContext);

  const nextStep = () => {
    let q = ['OwnHome', 'haveIns', 'MfgHome']
    if (state.answers.MfgHome === 'yes') q.push('OwnLot')
    if (!hasAnswseredQuestions(q)) return
    dispatch({ type: 'Progress', payload: { label: getPhrase('Income'), color: 'cyan', size: 14 } })
    isEligible(['OwnHome', 'haveIns', 'MfgHome', 'OwnLot']) ? navigate('Income') : navigate('NotEligible')
  }
  if (destination !== 'HomeInfo') return <></>
  return (
    <Paper>
      <Stack p='xs' gap='xs' align='stretch' justify='center'>
        <Question questionKey='OwnHome' show={true} />
        <Question questionKey='haveIns' show={true} />
        <Question questionKey='MfgHome' show={true} />
        <Question questionKey='OwnLot' show={state.answers.MfgHome === 'yes'} />
        <Button ml='xs' onClick={() => {
          nextStep()
        }}>
          {getPhrase('Proceed')}
        </Button>
      </Stack>
    </Paper>
  )
}

