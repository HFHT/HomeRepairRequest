import { Fragment, useContext, useEffect, useState } from "react";
import { Badge, Box, Button, Card, Checkbox, Divider, Group, LoadingOverlay, Space, Stack, Table, Text, useMantineTheme } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { Progress } from "../components";
import { MainContext } from "../context/MainContext";
import { useMediaQuery } from "@mantine/hooks";
import { RepairProgramsType, useRepairPrograms } from "../hooks";

//--Eligible Home Repair Programs
export function Eligibility() {
  const { state, titles, language, getPhrase } = useContext(MainContext);
  const navigate = useNavigate();
  const theme = useMantineTheme()
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)
  const [repairPrograms, fetchMongo, isBusy] = useRepairPrograms()

  const nextStep = () => {
    navigate('/repairform')
  }

  const isQualified = (thePgm: RepairProgramsType) => {
    let retVal: boolean[] = []
    thePgm.Qualifications.forEach((pgm) => {
      let v = pgm.includes('!') ? 'no' : 'yes'
      retVal = [...retVal, state.answers[pgm.replace('!', '')] === v]
      console.log(pgm.replace('!', ''), state.answers[pgm.replace('!', '')])
    })
    state.answers.selectedRepairs && thePgm.RepairTypes.forEach((pgm) => {
      retVal = [...retVal, state.answers.selectedRepairs.includes(pgm)]
    })
    return retVal.every(v => v === true)
  }

  const rows = (thePgms: RepairProgramsType[]) => (
    thePgms?.map((pgm) => (
      <Card key={pgm._id} shadow='sm' padding='sm' radius='md' withBorder>
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>{pgm.Description[language]}</Text>
          <Badge color="pink">On Sale</Badge>
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

  return (
    <>
      <Box pos='relative'>
        <LoadingOverlay visible={isBusy} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
        <Progress steps={[
          { label: getPhrase('eligible'), color: 'green', size: 100 }
        ]} />
        <Space h='md' />
        <Text size='sm'>{titles?.Eligible[language]}</Text>
        {/* <Stack> */}
        {repairPrograms && rows(repairPrograms.filter((pgm) => isQualified(pgm)))}
        {/* </Stack> */}
        <Space h='md' />
        <Button onClick={() => nextStep()}>{language === 'en' ? 'Proceed to Application' : 'Proceder a la solicitud'}</Button>
        <Space h='xs' />
      </Box>

    </>
  )
}
