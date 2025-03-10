import { Badge, Box, Button, Card, Divider, Group, LoadingOverlay, Space, Text, Title } from "@mantine/core";
import { Progress } from "../components";
import { useEligibility } from "../hooks";

//--Eligible Home Repair Programs
export function Eligibility() {
  const { eligiblePrograms, dispatch, destination, navigate, language, getPhrase, isBusy } = useEligibility()

  const nextStep = () => {
    navigate('RepairForm')
  }

  const rows = () => (
    eligiblePrograms.programs.map((pgm) => (
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

  if (destination !== 'Eligibility') return <></>
  return (
    <>
      <Box pos='relative'>
        <LoadingOverlay visible={isBusy} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
        <Progress steps={[
          { label: eligiblePrograms.title, color: eligiblePrograms.color, size: 100 }
        ]} />
        <Space h='md' />
        <Title order={3}>{eligiblePrograms.title}</Title>
        {/* <Stack> */}
        {rows()}
        {/* {eligiblePrograms && rows(eligiblePrograms.map((pgm) => isQualified(pgm)))} */}
        {/* </Stack> */}
        <Space h='md' />
        <Button onClick={() => nextStep()}>{getPhrase('Proceed to Application')}</Button>
        <Space h='xs' />
      </Box>

    </>
  )
}
