import { Fragment, useContext } from "react";
import { MainContext } from "../context/MainContext";
import { Box, Button, Center, Grid, Paper, Space, Stack, Title } from "@mantine/core";
import { useDownload } from "../hooks";

export function Downloads() {
    const { getPhrase, destination, navigate, hasDownloads } = useContext(MainContext);
    const { error, downloadFile } = useDownload();
    if (destination !== 'Downloads') return <></>
    const doDownload = (url: string) => {
        downloadFile('ABWK_APP_2025.pdf', url)
    }
    const rows = () => hasDownloads.map((dm, idx) => (
        <Fragment key={idx}>
            <Grid.Col span={7}>{dm.desc}</Grid.Col>
            <Grid.Col span={3}>
                <Button ml='md' mr='md' variant='light' onClick={() => doDownload(dm.url)}>{dm.title}</Button>
            </Grid.Col>
        </Fragment>
    ))
    return (
        <Box pos='relative'>
            <Paper>
                <Stack p='xs' gap='xs' align='stretch' justify='center'>
                    <Center>
                        <Title order={3}>Downloads</Title>
                    </Center>
                    <Grid ml='md' mr='md'>
                        {rows()}
                    </Grid>
                    <Space h='md' />
                    <Button ml='xs' onClick={() => navigate('ThankYou')}>{getPhrase('Proceed with Submission')}</Button>
                </Stack>
            </Paper>
        </Box>

    )
}
