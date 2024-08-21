import { Card, Group, Radio, Text } from "@mantine/core"
import { useContext } from "react";
import { MainContext } from "../context/MainContext";
import { QuestionsType } from "../hooks";

type QuestionType = {
  questionKey: string,
  show: boolean,
}
export const Question = ({ questionKey, show }: QuestionType) => {
  const { dispatch, language, questions } = useContext(MainContext);
  if (!show || !questions) return <></>
  let theQuestion = questions.find((q: QuestionsType) => q.key === questionKey)

  return (
    <>
      <Card shadow='sm' padding='xs' radius='md' mt='lg' mb='md' withBorder>
        <Radio.Group withAsterisk
          label={theQuestion && theQuestion!.q[language]}
          onChange={(v: string) => dispatch({ type: questionKey, payload: v })}
        >
          <Group justify='flex-start' mt='md' mb='xs'>
            <Radio value='yes' label={language === 'es' ? 'Si' : 'Yes'} />
            <Radio value='no' label='No' />
          </Group>
        </Radio.Group>
        <Card.Section withBorder inheritPadding>
          <Text size='md' c='dimmed'>
            {theQuestion && theQuestion!.d[language]}
          </Text>
        </Card.Section>
      </Card>
    </>
  )
}