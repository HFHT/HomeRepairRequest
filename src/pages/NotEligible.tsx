import { Anchor, Card, Center, List, Paper, Stack, Text, Title } from "@mantine/core";
import { useContext, useEffect } from "react";
import { MainContext } from "../context/MainContext";
import { uniqueKey } from "../utils";

export function NotEligible() {
  const { state, dispatch, mobile, otherResouceURL, destination, getPhrase } = useContext(MainContext);
  useEffect(() => {
    if (destination !== 'NotEligible') return
    dispatch({ type: 'ProgressReset', payload: { label: getPhrase('Not Eligible'), color: 'red', size: 100 } })
  }, [destination])

  if (destination !== 'NotEligible') return <></>
  return (
    <Center>
      <Paper w={mobile ? '100%' : '70%'}>
        <Stack p='xs' gap='xs' align='stretch' justify='center'>
          <Center mt='xs'>
            <Title order={3}>{getPhrase('Not Eligible')}</Title>
          </Center>
          <Text>
            We regret to inform you that your application did not qualify for any of our home repair programs.
          </Text>
          {state && state.notEligibleReason && state.notEligibleReason.length > 1 ?
            <Text>The reasons that you do not qualify are:</Text>
            :
            <Text>The reason that you do not qualify is:</Text>
          }
          <List withPadding>
            {state && state.notEligibleReason && state.notEligibleReason.map((em) => (
              <List.Item key={uniqueKey()}>
                <Text>{em}</Text>
              </List.Item>
            ))}
          </List>
          <Text>
            To assist you further, we have provided a link to programs offered by other businesses that might better meet your needs.
            You can explore these options here: <Anchor href={otherResouceURL} target='_blank'>Other Resources</Anchor>.
          </Text>
          <Text>
            Thank you for considering our programs, and we hope you find the right solution soon.
          </Text>
        </Stack>
      </Paper>
    </Center>
  )
}
