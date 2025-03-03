import { useContext, useEffect } from "react";
import { Badge, Box, Button, Card, Divider, Group, LoadingOverlay, Space, Text } from "@mantine/core";
import { Progress } from "../components";
import { MainContext } from "../context/MainContext";
import { RepairProgramsType, useRepairPrograms } from "../hooks";

//--Eligible Home Repair Programs
export function Eligibility() {
  const { state, titles, destination, navigate, language, getPhrase } = useContext(MainContext);
  const [repairPrograms, fetchMongo, isBusy] = useRepairPrograms()

  const nextStep = () => {
    navigate('RepairForm')
  }

  const isQualified = (thePgm: RepairProgramsType) => {
    if (!thePgm.Active) return false
    let retVal: boolean[] = []
    thePgm.Qualifications.forEach((pgm) => {
      let v = pgm.includes('!') ? 'no' : 'yes'
      retVal = [...retVal, state.answers[pgm.replace('!', '')] === v]
      console.log(pgm.replace('!', ''), state.answers[pgm.replace('!', '')])
      console.log(retVal)
    })
    state.answers.selectedRepairs && thePgm.RepairTypes.forEach((pgm) => {
      retVal = [...retVal, state.answers.selectedRepairs.includes(pgm)]
      console.log(retVal, state.answers.selectedRepairs.includes(pgm))
    })
    state.selectedRepairs && state.selectedRepairs.forEach((pgm) => {
      retVal = [...retVal, thePgm.RepairTypes.length === 0 || thePgm.RepairTypes.includes(pgm)]
      console.log(retVal, thePgm.RepairTypes.includes(pgm))
    })
    console.log(retVal)
    return retVal.every(v => v === true)
  }

  const rows = (thePgms: RepairProgramsType[]) => (
    thePgms?.map((pgm) => (
      <Card key={pgm._id} shadow='sm' padding='sm' radius='md' withBorder>
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>{pgm.Description[language]}</Text>
          <Badge color={pgm.Funding ? (pgm.WaitTime.value < 6 ? "green" : 'yellow') : "pink"}>{pgm.Funding ? (pgm.WaitTime.value < 6 ? "Available" : 'Long Wait') : 'No Funds'}</Badge>
        </Group>
        <Text size="sm" c="dimmed">
          {pgm.Eligible[language]}
        </Text>
        <Divider />
        <Text size="sm" c="dimmed">
          {pgm.Funding ? pgm.WaitTime[language] : pgm.NoFunds[language]}
        </Text>
      </Card>
    ))
  )

  useEffect(() => {
    fetchMongo()
    console.log(state.answers.selectedRepairs)
  }, [])
  if (destination !== 'Eligibility') return <></>
  return (
    <>
      <Box pos='relative'>
        <LoadingOverlay visible={isBusy} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
        <Progress steps={[
          { label: getPhrase('Eligible'), color: 'green', size: 100 }
        ]} />
        <Space h='md' />
        <Text size='sm'>{titles?.Eligible[language]}</Text>
        {/* <Stack> */}
        {repairPrograms && rows(repairPrograms.filter((pgm) => isQualified(pgm)))}
        {/* </Stack> */}
        <Space h='md' />
        <Button onClick={() => nextStep()}>{getPhrase('Proceed to Application')}</Button>
        <Space h='xs' />
      </Box>

    </>
  )
}
