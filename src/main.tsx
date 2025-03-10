import './index.css';
import './assets/styles/generics.css'
import './assets/styles/mantine.css'
import './assets/styles/custom.css'
import '@mantine/core/styles.css';
import ReactDOM from 'react-dom/client'
import { createTheme, MantineProvider } from '@mantine/core';
import { App } from './App';
import { StrictMode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { TopLevelError } from './components';
import { MainContextProvider } from './context/MainContext';
// import(`//maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_APIKEY}&language=en&libraries=places&v=weekly`)

const theme = createTheme({
  fontFamily: 'Montserrat, sans-serif',
  defaultRadius: 'md',
  headings: {
    fontWeight: '400',
    fontFamily: 'monospace'
  }
});

(async () => {
  try {
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <StrictMode >
        <MantineProvider theme={theme} forceColorScheme={window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'}>
            <ErrorBoundary FallbackComponent={TopLevelError} onError={() => console.log('Top Level Error Boundary')}>
              <MainContextProvider props={{ params: new URLSearchParams(window.location.search) }}>
                <App props={null} />
              </MainContextProvider>
            </ErrorBoundary>
        </MantineProvider>
      </StrictMode>
    )
  }
  catch (e) {
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <h3>&nbsp;Trouble connecting to Receiving Wizard. You may be experiencing problems with your internet connection. Please try again later.</h3>
    );
  }
})()