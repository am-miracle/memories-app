import React, { useState } from 'react';
import { Container, Avatar, Button, Paper, Typography, Grid } from '@mui/material'
import { LockOutlined } from '@mui/icons-material'
import { useGoogleLogin } from '@react-oauth/google';

import useStyles from './styles';
import Input from './Input';
import Icon from './icon';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { signin, signup } from '../../actions/auth';


const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setIsSignup] = useState(false)
    const [formData, setFormData] = useState(initialState)

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignup){
            dispatch(signup(formData, navigate))
        } else {
            dispatch(signin(formData, navigate))
        }
    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const switchMode =() => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false)
    }

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            const target = {};
            const token = codeResponse?.access_token;

            axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                }
            })
            .then((res) => {
                const foundResult = res.data;
                const result = Object.assign(foundResult, target)
                try {
                    dispatch({ type: 'AUTH', data: { result, token } });
                    navigate('/')
                } catch (error) {
                    console.log(error)
                }
            })
            .catch((err) => console.log(err));
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    return(
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlined />
                </Avatar>
                <Typography variant='h5'>{isSignup ? 'Sign Up': 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2} sx={{ marginBottom: '20px'}}>
                        {
                            isSignup && (
                                <>
                                    <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                                    <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name='email' label={'Email Address'} handleChange={handleChange} type={'email'} />
                        <Input name={'password'} label={'Password'} handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name={'confirmPassword'} label={'Repeat Password'} handleChange={handleChange} type={'password'} />}
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' color='primary' sx={{ marginBottom: '20px'}} className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <Button variant='contained' fullWidth className={classes.googleButton}  startIcon={<Icon />} onClick={() => login()}>Sign in with Google</Button>
                    <Grid container justifyContent={'flex-end'}>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth