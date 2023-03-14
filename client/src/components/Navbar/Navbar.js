import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography, createTheme } from '@mui/material'
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode'
import useStyles from './styles'

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = useCallback(() => {
      dispatch({ type: 'LOGOUT' });
      navigate('/')
      setUser(null)
    }, [dispatch, navigate]
  )
  const logo = createTheme({
    typography: {
      fontFamily: [
        'Righteous',
        'cursive',
      ].join(','),
    },});

  useEffect(() => {
    const token = user?.token;
    console.log(token)
    try {
      if(token) {
        const decodedToken = jwt_decode(token);
        if(decodedToken.exp * 1000 < new Date().getTime()) logout();
      }
    } catch (error) {
      console.log(error.message)
    }

    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location, logout, user?.token])

  return (
    <AppBar className={classes.appBar} sx={{flexDirection: 'row'}} position='static' color='inherit'>
      <div className={classes.brandContainer}>
        <Typography component={Link} to='/' className={classes.heading} theme={logo} variant='h4'>Memories</Typography>
        {/* <img className={classes.image} src={memories} alt='memories' height='60' /> */}
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