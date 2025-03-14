//Start
import { useContext } from "react";
import { Badge, Button, Flex, HoverCard, List, Paper, SimpleGrid, Space, Text, Title } from "@mantine/core";
import { MainContext } from "../context/MainContext";
import { IconFileInfo } from "@tabler/icons-react";

export function Start({ props }: any) {
  const { dispatch, destination, navigate, mobile, getPhrase } = useContext(MainContext);

  const canProceed = (selectedProgram: 'CHR' | 'MHR') => {
    const theProgram = () => {
      if (mobile) return selectedProgram === 'CHR' ? 'Critical' : 'Minor'
      return selectedProgram === 'CHR' ? 'Critical Repair' : 'Minor Repair'
    }
    dispatch({ type: 'Program', payload: selectedProgram })
    dispatch({ type: 'Progress', payload: { label: theProgram(), color: 'cyan', size: 14 } })
    dispatch({ type: 'Progress', payload: { label: getPhrase('Address'), color: 'cyan', size: 14 } })
    return true
  }
  if (destination !== 'Start') return <></>
  return (
    <Paper>
      <Paper shadow='xs' radius='sm' p='sm'>
        <Text>
          The home repair program ensures our neighbors live in safe, decent homes and restores dignity and hope to the
          community. If selected you will work side-by-side with our staff and volunteers.
        </Text>
        <Text mt='sm'>
          We accept applicants whose homes need repair — individuals, seniors, people with disabilities, U.S. veterans,
          multi-generational households and single-parent families. We <b>do not</b> provide emergency repairs. Habitat is an equal housing opportunity provider.
        </Text>
      </Paper>
      <SimpleGrid cols={mobile ? 1 : 2} mt='lg'>
        <div>
          <Paper shadow="xs" radioGroup="sm" p="sm">
            <Title order={3}>Critical Home Repair</Title>
            <Text>Wait times maybe greater than 1 year.</Text>
            <Flex>
              <Text>A lien on your property may be required.</Text>
              <HoverCard width={mobile ? 220 : 300} shadow='md'>
                <HoverCard.Target>
                  <Badge size="sm" mt={3} circle color='gray'>
                    ?
                  </Badge>
                </HoverCard.Target>
                <HoverCard.Dropdown>
                  <Text size='xs'>
                    Some of our Home Repair programs will require a lien to be placed on your home.
                  </Text>
                  <Text size='xs' mt='xs'>
                    The only way to know is to start the Critical Home Repair request, you will be informed once your program eligibility has been determined.
                  </Text>
                </HoverCard.Dropdown>
              </HoverCard>
            </Flex>
            <List size="sm">
              <List.Item>AC Repair / Replacement</List.Item>
              <List.Item>Electrical Safety Issues</List.Item>
              <List.Item>Home Mobility Modification</List.Item>
              <List.Item>Plumbing Safety Issues</List.Item>
              <List.Item>Roofing Repair / Replacement</List.Item>
            </List>
          </Paper>
          <Button ml='sm' mr='sm' onClick={() => canProceed('CHR') && navigate('Address')}>{'Request Critical Home Repair'}</Button>
        </div>
        <div>
          <Paper shadow="xs" radioGroup="sm" p="sm">
            <Title order={3}>Minor Exterior Home Repair</Title>
            <Text>Home must be safe and have no roof leaks or structural problems.</Text>
            <List size="sm">
              <List.Item>Exterior Paint</List.Item>
              <List.Item>Fence Repair</List.Item>
              <List.Item>General Yard Clean up</List.Item>
              <List.Item>Gutter Repair</List.Item>
              <List.Item>Tree trimming up to 10 feet</List.Item>
            </List>
          </Paper>
          <Button mt={mobile ? 0 : 25} ml='sm' mr='sm' onClick={() => canProceed('MHR') && navigate('Address')}>{'Request Minor Home Repair'}</Button>
        </div>
      </SimpleGrid>
      <Space h='lg' />
    </Paper>
  )
}
