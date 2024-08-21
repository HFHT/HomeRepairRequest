import { useComputedColorScheme, AppShell, useMantineTheme, Title, Grid } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Logo from '../../assets/Logo';

export function Header() {
  const computedColorScheme = useComputedColorScheme()
  const theme = useMantineTheme()
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)

  return (
    <AppShell.Header>
      <Grid grow justify='space-between' align='center' className={mobile ? 'pad-left pad-above' : 'pad-left-md pad-above-md'}>
        <Grid.Col span={mobile ? 3 : 1}><div><Logo colorScheme={computedColorScheme} /></div></Grid.Col>
        <Grid.Col span={mobile ? 7 : 9}><Title order={mobile ? 4 : 1} className='line-height-normal'>Home&nbsp;Repair Request</Title></Grid.Col>
      </Grid>
    </AppShell.Header>
  );
};
