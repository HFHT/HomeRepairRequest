import { Space, Title } from "@mantine/core";
import { Progress } from "../components";
import { useContext } from "react";
import { MainContext } from "../context/MainContext";

//
export function NotEligible() {
  const { dispatch, zipcodes, isEligible, language, getPhrase } = useContext(MainContext);

  return (
    <>
      <Progress steps={[
        { label: getPhrase('location'), color: 'cyan', size: 20 },
        { label: '', color: 'red', size: 20 },
        { label: getPhrase('notEligible'), color: 'red', size: 60 }]} />
      <Space h='md' />
      <Title order={3}>{getPhrase('notEligible')}</Title>
    </>
  )
}
