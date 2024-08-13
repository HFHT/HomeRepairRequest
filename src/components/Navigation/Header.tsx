import { Flex, Burger, Button, useMantineColorScheme, useComputedColorScheme, AppShell, useMantineTheme, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconMoonFilled, IconSunFilled } from '@tabler/icons-react';
import Logo from '../../assets/Logo';

export function Header({ setOpened, opened }: any) {
  const { setColorScheme } = useMantineColorScheme()
  const computedColorScheme = useComputedColorScheme('light')
  const theme = useMantineTheme()
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <AppShell.Header>
      <Flex justify="space-between" align="center" style={{ padding: '10px 20px' }}>
        <Burger opened={opened} onClick={() => setOpened(!opened)} hiddenFrom="sm" size="sm" />
        <div><Logo colorScheme={(computedColorScheme === 'dark') ? '#ffffff' : '#000000'} /></div>
        <Title order={1}>Customer Kiosk</Title>
        <Button size={mobile ? "xs" : "sm"} variant="link" onClick={toggleColorScheme}>
          {computedColorScheme === 'dark' ? <IconSunFilled /> : <IconMoonFilled />}
        </Button>
      </Flex>
    </AppShell.Header>
  );
};
