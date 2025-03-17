import * as React from 'react';
import ComponenteEncabezado from './components/ComponenteEncabezado';
import AppRoutes from './pages/AppRoutes';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';



const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  return (

    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>
        <div>
          <ComponenteEncabezado />
          <AppRoutes />
          
        </div>
      </main>
    </ThemeProvider>





  );
}