import { Progress as ManTineProgress } from "@mantine/core";

type ProgressType = {
    steps: { label: string, color: string, size: number }[]
}
export function Progress({ steps }: ProgressType) {
    return (
        <ManTineProgress.Root size='xl'>
            {steps.map((s: { label: string, color: string, size: number }, idx: number) => (
                <ManTineProgress.Section value={s.size} color={s.color} key={`${s}${idx.toString()}`}>
                    <ManTineProgress.Label>{s.label}</ManTineProgress.Label>
                </ManTineProgress.Section >
            ))}
        </ManTineProgress.Root >
    )
}
