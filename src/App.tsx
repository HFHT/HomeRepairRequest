import '@mantine/carousel/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications, notifications } from '@mantine/notifications';
import { AppShell, Box, Flex, Loader, LoadingOverlay, Text, useMantineTheme } from '@mantine/core';
import { RouterSwitcher } from './routes/RouterSwitcher';
import { useBeforeUnload } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useOnline } from './hooks';
import { Header } from './components';
import { useMediaQuery } from '@mantine/hooks';
import { MainContext } from './context/MainContext';

export function App({ props }: any) {
  useBeforeUnload(() => { confirm('refreshing window') })
  const theme = useMantineTheme()
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)
  const { state, dispatch, zipcodes, isBusy } = useContext(MainContext);


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
    <div className="app" >
      <AppShell
        header={{ height: mobile ? 50 : 75 }}
        navbar={{ width: 120, breakpoint: 'sm', collapsed: { mobile: !opened } }}
        padding="sm"
      >
        <Header />
        <AppShell.Main>
          <Notifications position="top-right" />
          <Box pos='relative'>
            <LoadingOverlay visible={!isOnline} zIndex={1100} overlayProps={{ radius: "sm", blur: 2 }} loaderProps={{ children: <Offline /> }} />
            <LoadingOverlay visible={isBusy} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <RouterSwitcher props={props} />
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

