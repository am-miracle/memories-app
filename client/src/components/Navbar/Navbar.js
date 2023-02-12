import React from 'react'
import { AppBar, Typography } from '@mui/material'

import memories from '../../images/memories.png';
import useStyles from './styles'

const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
        <Typography className={classes.heading} variant='h2'>Memories</Typography>
        {/* <img className={classes.image} src={memories} alt='memories' height='60' /> */}
    </AppBar>
  )
}

export default Navbar