import { useContext } from "react";
import { Button, Space, Table, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { Progress, Question } from "../components";
import { MainContext } from "../context/MainContext";

//Income
export function Income() {
  const { income, isEligible, hasAnswseredQuestions, language, getPhrase } = useContext(MainContext);
  const navigate = useNavigate();

  const nextStep = () => {
    if (!hasAnswseredQuestions(['Income'])) return
    isEligible(['Income']) ? navigate('/militarysenior') : navigate('/noteligible')
  }

  const rows = income?.Values.map((i) => (
    <Table.Tr key={i.size} >
      <Table.Td>{i.size}</Table.Td>
      <Table.Td>{i.maxIncome}</Table.Td>
    </Table.Tr>
  ))
  return (
    <>
      <Progress steps={[
        { label: getPhrase('location'), color: 'cyan', size: 20 },
        { label: getPhrase('homeInfo'), color: 'cyan', size: 20 },
        { label: getPhrase('income'), color: 'cyan', size: 20 }
      ]} />
      <Space h='md' />

      <Question questionKey='Income' show={true} />
      <Button onClick={() => nextStep()}>{language === 'en' ? 'Proceed' : 'Proceder'}</Button>
      <Space h='lg' />
      <Text size='sm'>{income?.IncomeDesc[language]}</Text>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Family Size</Table.Th>
            <Table.Th>Maximum Income</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  )
}
