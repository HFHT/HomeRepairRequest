import '@mantine/carousel/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications, notifications } from '@mantine/notifications';
import { AppShell, Box, Flex, Loader, LoadingOverlay, Text } from '@mantine/core';
import { RouterSwitcher } from './routes/RouterSwitcher';
import { useBeforeUnload } from 'react-router-dom';
import { useState } from 'react';
import { useOnline } from './hooks';
import { Header, Navbar } from './components';

export function App({ collections }: any) {
  useBeforeUnload(() => { confirm('refreshing window') })

  const isOnline = useOnline({
    online: [() => { notifications.show({ color: 'green', title: '🛜 Network Restored', message: 'You are back online! ' }) }],
    offline: [() => { notifications.show({ color: 'red', title: '❗ Network Error', message: 'Connection to the network has been lost! ' }) }]
  });
  const [opened, setOpened] = useState(false)

  const Offline = () => (
    <>
      <Flex gap="md" justify="center" align="center" direction="row" wrap="wrap">
        <Loader color="blue" size='xl' type="dots" />
        <Text size='xl'>Network Offline</Text>
      </Flex>
    </>
  )

  return (
    <div className="App" >
      <AppShell
        header={{ height: 55 }}
        navbar={{ width: 120, breakpoint: 'sm', collapsed: { mobile: !opened } }}
        padding="sm"
      >
        <Header opened={opened} setOpened={(e: any) => setOpened(e)} />
        <Navbar close={() => setOpened(false)} />
        <AppShell.Main>
          <Notifications position="top-right" />
          <Box pos='relative'>
            <LoadingOverlay visible={!isOnline} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} loaderProps={{ children: <Offline /> }} />
            <RouterSwitcher collections={collections} />
          </Box>
        </AppShell.Main>
        <AppShell.Footer zIndex={opened ? 'auto' : 201}>
          <Flex justify="center">
            <Text size="xs">Copyright<span>&copy;</span> Habitat for Humanity Tucson 2024</Text>
          </Flex>
        </AppShell.Footer>
      </AppShell>
    </div>
  );

}

