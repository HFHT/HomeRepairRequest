import { useContext, useState } from "react";
import { Button, Checkbox, Space, Table, Text, useMantineTheme } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { Progress } from "../components";
import { MainContext } from "../context/MainContext";
import { useMediaQuery } from "@mantine/hooks";

//Type of repairs
export function Repairs() {
  const { dispatch, repairList, isEligible, language, getPhrase } = useContext(MainContext);
  const [selectedRepairs, setSelectedRepairs] = useState<string[]>([])
  const navigate = useNavigate();
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
    isEligible([]) ? navigate('/eligibility') : navigate('/noteligible')
  }

  const rows = repairList?.Values.map((k) => (
    <Table.Tr key={Object.keys(k)[0]} >
      <Table.Td>
        <Checkbox size={mobile ? 'xs' : 'md'} checked={selectedRepairs.includes(Object.keys(k)[0])} onChange={(e) => addRemoveRepairs(Object.keys(k)[0])} />
      </Table.Td>
      <Table.Td>{Object.entries(k)[0][1][language]}</Table.Td>
    </Table.Tr>
  ))

  return (
    <>
      <Progress steps={[
        { label: getPhrase('location'), color: 'cyan', size: 20 },
        { label: getPhrase('homeInfo'), color: 'cyan', size: 20 },
        { label: getPhrase('income'), color: 'cyan', size: 20 },
        { label: getPhrase('other'), color: 'cyan', size: 20 },
        { label: getPhrase('repairs'), color: 'cyan', size: 20 },
      ]} />
      <Space h='md' />
      <Text size='sm'>{repairList?.RepairDesc[language]}</Text>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Select</Table.Th>
            <Table.Th>Repair Type</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <Space h='md' />
      <Button onClick={() => nextStep()}>{language === 'en' ? 'Proceed' : 'Proceder'}</Button>
      <Space h='xs' />
    </>
  )
}
