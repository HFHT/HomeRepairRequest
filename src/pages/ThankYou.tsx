import { useContext } from "react";
import { MainContext } from "../context/MainContext";
import { Center, List, Paper, Stack, Text, Title } from "@mantine/core";

export function ThankYou() {
  const { documents, destination, mobile } = useContext(MainContext);

  if (destination !== 'ThankYou') return <></>

  return (
    <Center>
      <Paper w={mobile ? '100%' : '70%'}>
        <Stack p='xs' gap='xs' align='stretch' justify='center'>
          <Center>
            <Title order={3}>Thank You</Title>
          </Center>
          <Text>We have received your Home Repair inquiry.
            We will contact you to discuss how the application process works in greater detail.
          </Text>
          <Text size='sm'>
            You have completed step 1 of the process and will be added to the waitlist.
            Once you are next in line on the waitlist, you will be contacted to fill out the application and
            provide the following paperwork:
          </Text>
          <Text size='sm' mt='xs'>
            Income must be documented for all household members:
          </Text>
          <List size='sm'>
            {documents && documents.map((dm, idx) => (
              <List.Item key={idx}>{dm.title}</List.Item>
            ))}
          </List>
          <Text size='sm'>
            Eligible homeowners whose applications are
            accepted get a home visit from a Habitat Tucson staffer to assess what work must be done.
          </Text>
          <Text size='sm'>
            Please be aware Habitat for Humanity has limited resources so we can only partner with a small
            number of individuals every year. Thank you for understanding.</Text>
        </Stack>
      </Paper>
    </Center>
  )
}
