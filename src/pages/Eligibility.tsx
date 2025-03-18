import { Badge, Box, Button, Card, Center, Divider, Group, LoadingOverlay, Paper, Space, Stack, Text, Title } from "@mantine/core";
import { Question } from "../components";
import { CONST_MAX_LIEN, RepairProgramsType, useEligibility } from "../hooks";

//--Eligible Home Repair Programs
export function Eligibility() {

  const { eligiblePrograms, destination, navigate, language, getPhrase, canProceed, isBusy } = useEligibility()

  const badgeInfo = (thePgm: RepairProgramsType) => {
    if (!thePgm.Funding) return { color: 'red', title: 'No Funds' }
    if (thePgm.Supplements.length > 0) return { color: 'cyan', title: 'As-needed' }
    return { color: thePgm.WaitTime.value < 6 ? "green" : 'yellow', title: thePgm.WaitTime.value < 6 ? "Available" : 'Long Wait' }
  }

  const rows = () => (
    eligiblePrograms.programs.map((pgm) => (
      <Card key={pgm._id} shadow='sm' padding='sm' radius='md' withBorder>
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>{pgm.Description[language]}</Text>
          <Badge color={badgeInfo(pgm).color}>{badgeInfo(pgm).title}</Badge>
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

  if (destination !== 'Eligibility') return <></>

  const nextStep = () => {
    const nextPage = canProceed()
    nextPage && navigate(nextPage)
  }

  return (
    <Box pos='relative'>
      <LoadingOverlay visible={isBusy} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
      <Paper>
        <Stack p='xs' gap='xs' align='stretch' justify='center'>
          <Center>
            <Title order={3}>{eligiblePrograms.title}</Title>
          </Center>
          {rows()}
          <Space h='md' />
          <Question questionKey='Lien' show={eligiblePrograms.lien !== CONST_MAX_LIEN} />
          <Button ml='xs' onClick={() => nextStep()}>{getPhrase('Proceed')}</Button>
        </Stack>
      </Paper>
    </Box>
  )
}
