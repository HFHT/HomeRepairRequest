//Start
import { useContext, useState } from "react";
import { Button, Checkbox, List, Mark, Paper, SimpleGrid, Space, Text, Title } from "@mantine/core";
import { MainContext } from "../context/MainContext";
import { legacyDBCreate } from "../services";
import { notifications } from "@mantine/notifications";

export function Start({ props }: any) {
  const { dispatch, destination, navigate, mobile, getPhrase } = useContext(MainContext);
  const [acknowledgements, setAcknowledgements] = useState({ q1: false, q2: false, q3: false })

  const canProceed = (selectedProgram: 'CHR' | 'MHR') => {
    const theProgram = () => {
      if (mobile) return selectedProgram === 'CHR' ? 'Critical' : 'Minor'
      return selectedProgram === 'CHR' ? 'Critical Repair' : 'Minor Repair'
    }
    if (acknowledgements.q1 && acknowledgements.q2 && acknowledgements.q3) {
      dispatch({ type: 'Program', payload: selectedProgram })
      dispatch({ type: 'Progress', payload: { label: theProgram(), color: 'cyan', size: 14 } })
      dispatch({ type: 'Progress', payload: { label: getPhrase('Address'), color: 'cyan', size: 14 } })
      return true
    }
    notifications.show({ color: 'red', title: 'Please check all boxes!', message: 'To qualify you must acknowledge that you understand all three statements at the bottom of this page.', autoClose: 10000 })
    return false
  }
  if (destination !== 'Start') return <></>
  return (
    <>
      <Paper shadow='xs' radius='sm' p='sm'>
        <Text>
          The home repair program ensures our neighbors live in safe, decent homes and restores dignity and hope to the
          community. If selected you will work side-by-side with our staff and volunteers. Accommodations are made for those
          unable to physically work. You are expected to repay a portion of cost of materials based on a sliding scale and ability.
        </Text>
        <Text mt='sm'>
          We accept applicants whose homes need repair — individuals, seniors, people with disabilities, U.S. veterans,
          multi-generational households and single-parent families. We <Mark color='red'>do not</Mark> provide emergency repairs. Habitat is an equal housing opportunity provider.
        </Text>
      </Paper>
      <Checkbox
        checked={acknowledgements.q1}
        onChange={(e) => setAcknowledgements({ ...acknowledgements, q1: e.currentTarget.checked })}
        label='I understand that Habitat for Humanity Tucson does NOT provide emergency repairs.'
      />
      <Checkbox
        checked={acknowledgements.q2}
        onChange={(e) => setAcknowledgements({ ...acknowledgements, q2: e.currentTarget.checked })}
        label='I understand that I will work side by side with Habitat Staff and volunteers based on my ability.'
      />
      <Checkbox
        checked={acknowledgements.q3}
        onChange={(e) => setAcknowledgements({ ...acknowledgements, q3: e.currentTarget.checked })}
        label='I understand that I will repay a portion of cost of materials based on a sliding scale and ability.'
      />
      <SimpleGrid cols={mobile ? 1 : 2} mt='lg'>
        <div>
          <Paper shadow="xs" radioGroup="sm" p="sm">
            <Title order={3}>Critical Home Repair</Title>
            <Text>Wait times maybe greater than 1 year.</Text>
            <List size="sm">
              <List.Item>AC Repair</List.Item>
              <List.Item>AC Replacement</List.Item>
              <List.Item>Electrical Safety Issues</List.Item>
              <List.Item>Home Mobility Modification</List.Item>
              <List.Item>Plumbing Safety Issues</List.Item>
              <List.Item>Roof Replacement</List.Item>
              <List.Item>Roofing Repair</List.Item>
            </List>
          </Paper>
          <Button ml='sm' mr='sm' onClick={() => canProceed('CHR') && navigate('Address')}>{'Request Critical Home Repair'}</Button>
        </div>
        <div>
          <Paper shadow="xs" radioGroup="sm" p="sm">
            <Title order={3}>Minor Home Repair</Title>
            <Text>Home must be safe and have no roof leaks or structural problems.</Text>
            <List size="sm">
              <List.Item>Exterior Paint</List.Item>
              <List.Item>Fence Repair</List.Item>
              <List.Item>General Yard Clean up</List.Item>
              <List.Item>Gutter Repair</List.Item>
              <List.Item>Tree trimming up to 10 feet</List.Item>
            </List>
          </Paper>
          <Button mt={mobile ? 0 : 45} ml='sm' mr='sm' onClick={() => canProceed('MHR') && navigate('Address')}>{'Request Minor Home Repair'}</Button>
        </div>
      </SimpleGrid>
      <Space h='lg' />
      {/* <Button onClick={() => legacyDBCreate({ cLast: 'Hoffman', cFirst: 'Art', cPhone: '15209916545' }, false, true)
      }>Send Test</Button> */}
    </>
  )
}
