import { Fragment, useContext } from "react";
import { MainContext } from "../context/MainContext";
import { Button, Center, Divider, Grid, List, Paper, Stack, Text, Title } from "@mantine/core";
import { useDownload } from "../hooks";

export function ThankYou() {
  const { documents, destination, hasDownloads, mobile } = useContext(MainContext);
  const { error, downloadFile } = useDownload();

  if (destination !== 'ThankYou') return <></>
  const doDownload = (url: string) => {
    downloadFile('ABWK_APP_2025.pdf', url)
  }
  const rows = () => hasDownloads.map((dm, idx) => (
    <Fragment key={idx}>
      <Grid.Col span={6}><Text size='sm'>{dm.desc}</Text></Grid.Col>
      <Grid.Col span={5}>
        <Button ml='md' mr='md' variant='light' onClick={() => doDownload(dm.url)}>{dm.title}</Button>
      </Grid.Col>
    </Fragment>
  ))
  const downloads = () => {
    if (!hasDownloads || hasDownloads.length === 0) return (<></>)
    return (
      <>
        <Divider />
        <Grid>{rows()}</Grid>
      </>
    )
  }
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
          {downloads()}
        </Stack>
      </Paper>
    </Center>
  )
}
