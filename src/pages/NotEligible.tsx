import { Anchor, Space, Text, Title } from "@mantine/core";
import { Progress } from "../components";
import { useContext } from "react";
import { MainContext } from "../context/MainContext";

//
export function NotEligible() {
  const { state, otherResouceURL, dispatch, zipcodes, isEligible, destination, navigate, getPhrase } = useContext(MainContext);
  if (destination !== 'NotEligible') return <></>
  return (
    <>
      <Progress steps={[
        { label: getPhrase('Not Eligible'), color: 'red', size: 100 }]} />
      <Space h='md' />
      <Title order={3}>{getPhrase('Not Eligible')}</Title>
      <Text>{state.notEligibleReason}</Text>
      <Anchor href={otherResouceURL} target='_blank'>Other Resources</Anchor>
    </>
  )
}
