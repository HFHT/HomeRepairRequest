import { useContext } from "react";
import { Button, Paper, Stack, Table, Text } from "@mantine/core";
import { Question } from "../components";
import { MainContext } from "../context/MainContext";

//Income
export function Income() {
  const { dispatch, income, isEligible, hasAnswseredQuestions, destination, navigate, language, getPhrase } = useContext(MainContext);

  const nextStep = () => {
    if (!hasAnswseredQuestions(['Income'])) return
    dispatch({ type: 'Progress', payload: { label: getPhrase('Other'), color: 'cyan', size: 14 } })
    isEligible(['Income']) ? navigate('MilitarySenior') : navigate('NotEligible')
  }

  const rows = income?.Values.map((i) => (
    <Table.Tr key={i.size} >
      <Table.Td>{i.size}</Table.Td>
      <Table.Td>{i.maxIncome}</Table.Td>
    </Table.Tr>
  ))
  if (destination !== 'Income') return <></>
  return (
    <Paper>
      <Stack p='xs' gap='xs' align='stretch' justify='center'>
        <Question questionKey='Income' show={true} />
        <Text size='sm'>{income?.IncomeDesc[language]}</Text>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>{getPhrase('Family Size')}</Table.Th>
              <Table.Th>{getPhrase('Maximum Income')}</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        <Button ml='xs' onClick={() => {
          nextStep()
        }}>{getPhrase('Proceed')}</Button>
      </Stack>
    </Paper>
  )
}
