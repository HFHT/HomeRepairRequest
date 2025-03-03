import { useContext, useState } from "react";
import { Button, Checkbox, Space, Table, Text, useMantineTheme } from "@mantine/core";
import { Progress } from "../components";
import { MainContext } from "../context/MainContext";
import { useMediaQuery } from "@mantine/hooks";

//Type of repairs
export function Repairs() {
  const { dispatch, repairList, isEligible, destination, navigate, language, getPhrase } = useContext(MainContext);
  const [selectedRepairs, setSelectedRepairs] = useState<string[]>([])
  const theme = useMantineTheme()
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)


  const addRemoveRepairs = (theRepair: string) => {
    console.log(selectedRepairs, theRepair)
    if (selectedRepairs.includes(theRepair)) {
      setSelectedRepairs(selectedRepairs.filter((r: string) => r !== theRepair))
    } else {
      setSelectedRepairs([...selectedRepairs, theRepair])
    }
  }
  const nextStep = () => {
    if (selectedRepairs.length === 0) return
    dispatch({ type: 'selectedRepairs', payload: selectedRepairs})
    isEligible([]) ? navigate('Eligibility') : navigate('NotEligible')
  }

  const rows = repairList?.Values.map((k) => (
    <Table.Tr key={Object.keys(k)[0]} >
      <Table.Td>
        <Checkbox size={mobile ? 'xs' : 'md'} checked={selectedRepairs.includes(Object.keys(k)[0])} onChange={(e) => addRemoveRepairs(Object.keys(k)[0])} />
      </Table.Td>
      <Table.Td>{Object.entries(k)[0][1][language]}</Table.Td>
    </Table.Tr>
  ))
  if (destination !== 'Repairs') return <></>
  return (
    <>
      <Progress steps={[
        { label: getPhrase('Location'), color: 'cyan', size: 20 },
        { label: getPhrase('Home'), color: 'cyan', size: 20 },
        { label: getPhrase('Income'), color: 'cyan', size: 20 },
        { label: getPhrase('Other'), color: 'cyan', size: 20 },
        { label: getPhrase('Repairs'), color: 'cyan', size: 20 },
      ]} />
      <Space h='md' />
      <Text size='sm'>{repairList?.RepairDesc[language]}</Text>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>{getPhrase('Select')}</Table.Th>
            <Table.Th>{getPhrase('Repair Type')}</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <Space h='md' />
      <Button onClick={() => nextStep()}>{getPhrase('Proceed')}</Button>
      <Space h='lg' />
    </>
  )
}
