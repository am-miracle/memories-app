import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Grow, Grid, Container, useTheme, ThemeProvider } from '@mui/material';


import Form from './components/Form/Form';
import Posts from './components/Posts/Posts';
import { getPosts } from './actions/posts'


import useStyles from './styles'
import Navbar from './components/Navbar/Navbar';

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme()
  const [currentId, setCurrentId] = useState(null)


  useEffect (() => {
    dispatch(getPosts())

  }, [currentId, dispatch])


  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth='lg'>
        <Navbar />
        <Grow in>
          <Container>
            <Grid container direction={'column-reverse'} justifyContent='space-between' alignItems='stretch' spacing={3}>
              <Grid item xs={12} sm={7}>
                <Posts setCurrentId={setCurrentId} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
    </ThemeProvider>
  );
}

export default App;
