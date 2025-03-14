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
            You have completed step 1 of the process and will be added to the waitlist. 
            Once you are next in line on the waitlist, you will be contacted to fill out the application and 
            provide the following paperwork:
          </Text>
          <List size='sm'>
            <List.Item>Income must be documented for all household members:</List.Item>
            <List withPadding size='xs'>
              <List.Item>Current Driver’s License or AZ Identification Card (Applicant & Co-Applicant)</List.Item>
              <List.Item>Social Security Card for each family member who lives in the home</List.Item>
              <List.Item>Marriage license, divorce decree or legal separation document (when applicable)</List.Item>
              <List.Item>Most recent 2 months of Bank Statement (all accounts and all pages)</List.Item>
              <List.Item>Most recent 2 months of pay stubs for all family members aged 18 and older</List.Item>
              <List.Item>Award letters for pension, retirement, social security/disability Income</List.Item>
              <List.Item>Prior Year Federal Tax Returns (Signed and dated) & W-2s, 1099s</List.Item>
            </List>
            <List.Item>Proof of Homeownership – mortgage statement or deed of release</List.Item>
            <List.Item>Proof of current homeowner’s insurance (declarations page or policy)</List.Item>
            {state && state.eligiblePrograms && state.eligiblePrograms.find((epf) => epf.ProgramName === CONST_VETERAN_PROGRAM) &&
              <List.Item>DD-214 or statement of service</List.Item>
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
