import { useContext } from "react";
import { Button, Space, Table, Text } from "@mantine/core";
import { Progress, Question } from "../components";
import { MainContext } from "../context/MainContext";

//Income
export function Income() {
  const { dispatch, income, isEligible, hasAnswseredQuestions, destination, navigate, language, getPhrase } = useContext(MainContext);

  const nextStep = () => {
    if (!hasAnswseredQuestions(['Income'])) return
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
    <>
      <Progress steps={[
        { label: getPhrase('Location'), color: 'cyan', size: 20 },
        { label: getPhrase('Home'), color: 'cyan', size: 20 },
        { label: getPhrase('Income'), color: 'cyan', size: 20 }
      ]} />
      <Space h='md' />

      <Question questionKey='Income' show={true} />
      <Button onClick={() => {
        dispatch({ type: 'Progress', payload: { label: getPhrase('Other'), color: 'cyan', size: 14 } })
        nextStep()
      }}>{getPhrase('Proceed')}</Button>
      <Space h='lg' />
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
    </>
  )
}
