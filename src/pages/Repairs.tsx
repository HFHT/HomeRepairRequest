import { useContext, useState } from "react";
import { Button, Checkbox, Paper, Space, Stack, Table, Text, TextInput, useMantineTheme } from "@mantine/core";
import { MainContext } from "../context/MainContext";
import { useMediaQuery } from "@mantine/hooks";

//Type of repairs
export function Repairs() {
  const { state, dispatch, repairList, programRepairs, isEligible, destination, navigate, language, getPhrase } = useContext(MainContext);
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
    if (selectedRepairs.length === 0 || state.selectedRepairsDesc === '') return
    dispatch({ type: 'selectedRepairs', payload: selectedRepairs })
    isEligible([]) ? navigate('Eligibility') : navigate('NotEligible')
  }

  const rows = programRepairs.map((k) => (
    <Table.Tr key={Object.keys(k)[0]} >
      <Table.Td>
        <Checkbox size={mobile ? 'xs' : 'md'} checked={selectedRepairs.includes(Object.keys(k)[0])} onChange={(e) => addRemoveRepairs(Object.keys(k)[0])} />
      </Table.Td>
      <Table.Td>{Object.entries(k)[0][1][language]}</Table.Td>
    </Table.Tr>
  ))
  if (destination !== 'Repairs') return <></>
  return (
    <Paper>
      <Stack p='xs' gap='xs' align='stretch' justify='center'>
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
        <Space h='sm' />
        <TextInput label='Please describe the repairs you are requesting' placeholder="Describe the repairs..."
        required
          value={state.selectedRepairsDesc}
          onChange={(e) => dispatch({ type: 'selectedRepairsDesc', payload: e.target.value })}
        />
        <Space h='md' />
        <Button ml='xs' onClick={() => {
          nextStep()
        }}>{getPhrase('Proceed')}</Button>
      </Stack>
    </Paper>
  )
}
