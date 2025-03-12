import { useContext } from "react";
import { MainContext } from "../context/MainContext";
import { Center, List, Paper, Stack, Text, Title } from "@mantine/core";

const CONST_VETERAN_PROGRAM = 'Veteran'
export function ThankYou() {
  const { state, destination, mobile } = useContext(MainContext);
  if (destination !== 'ThankYou') return <></>
  return (
    <Center>
      <Paper w={mobile ? '100%' : '70%'}>
        <Stack p='xs' gap='xs' align='stretch' justify='center'>
          <Center>
            <Title order={3}>ThankYou</Title>
          </Center>
          <Text>We have received your Home Repair request.
            We will contact you to discuss how the application process works in greater detail.
          </Text>
          <Text size='sm'>
            You have completed step 1 of the process. You will be contacted to fill out the application and provide
            paperwork to:
          </Text>
          <List size='sm'>
            <List.Item>Verify your income</List.Item>
            <List withPadding size='xs'>
              <List.Item>Current Driver’s License or AZ Identification Card for all residents, 18 and older</List.Item>
              <List.Item>Most recent two months pay stubs for all members of the family, 18 and older</List.Item>
              <List.Item>Most recent two months pay stubs for all members of the family, 18 and older</List.Item>
              <List.Item>Award letters for pension, retirement, social security/disability Income for all household  members</List.Item>
              <List.Item>Proof of child support income, if applicable</List.Item>
            </List>
            <List.Item>Mortgage statement or deed of release</List.Item>
            <List.Item>Proof of homeowners insurance</List.Item>
            {state && state.eligiblePrograms && state.eligiblePrograms.find((epf) => epf.ProgramName === CONST_VETERAN_PROGRAM) &&
              <List.Item> Statement of Service or DD-214</List.Item>
            }
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
