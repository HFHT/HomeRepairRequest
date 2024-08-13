import { AppShell, NavLink } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export function Navbar({ close }: any) {
  const navigate = useNavigate();

  return (
    <AppShell.Navbar p="md" style={{ gap: '10px' }}>
      <NavLink
        label="Donate"
        onClick={() => { close(); navigate('/'); }}
        style={{ margin: '5px' }}
      />
    </AppShell.Navbar>
  );
};