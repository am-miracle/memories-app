import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import memories from '../../images/memories.png';
import useStyles from './styles'

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/')
    setUser(null)
  }

  useEffect(() => {
    const token = user?.token;

    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])
  console.log(user)

  return (
    <AppBar className={classes.appBar} sx={{flexDirection: 'row'}} position='static' color='inherit'>
      <div className={classes.brandContainer}>
        <Typography component={Link} to='/' className={classes.heading} variant='h4'>Memories</Typography>
        <img className={classes.image} src={memories} alt='memories' height='60' />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
            <div className={classes.profile}>
                <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.picture}>{user?.result.name.charAt(0)}</Avatar>
                <Typography className={classes.userName} variant='h6'>{user?.result.name}</Typography>
                <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>Logout</Button>
            </div>
          ) :(
            <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar