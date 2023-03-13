import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container, useTheme, ThemeProvider } from '@mui/material';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

function App() {
  const user = JSON.parse(localStorage.getItem('profile'));
  const shouldRedirect = true;
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth='xl'>
        <Navbar />
        <Routes>
          <Route path="/" element={shouldRedirect && <Navigate replace to='/posts' />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/auth" element={!user ? <Auth /> : <Navigate replace to='/posts' />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
