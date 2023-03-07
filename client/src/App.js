import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, useTheme, ThemeProvider } from '@mui/material';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

function App() {
  const theme = useTheme()
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth='lg'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
