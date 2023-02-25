import React, { useState } from 'react';
// import { GoogleLogin } from 'react-google-login'
import { Container, Avatar, Button, Paper, Typography, Grid } from '@mui/material'
import { LockOutlined } from '@mui/icons-material'
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';

import useStyles from './styles'
import Input from './Input';
import Icon from './icon';
import { useDispatch } from 'react-redux';


const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setIsSignup] = useState(false)

    const handleSubmit = () => {

    }
    const handleChange = () => {

    }
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const switchMode =() => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        handleShowPassword(false)
    }

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            console.log(codeResponse)
            const result = codeResponse?.scope;
            const token = codeResponse?.access_token;

            try {
                dispatch({ type: 'AUTH', data: { result, token } });
            } catch (error) {
                console.log(error)
            }
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    // const googleSuccess = async (credentialResponse) => {
    //         console.log(credentialResponse)
    //         const result = credentialResponse?.profileObj;
    //         const token = credentialResponse?.tokenId;

    //         try {
    //             dispatch({ type: 'AUTH', data: { result, token } });
    //         } catch (error) {
    //             console.log(error)
    //         }
    // }
    // const googleFailure = (err) => {
    //     console.log(err)
    //     console.log('Google Sign In was unsuccessful. Try Again Later')
    // }

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
                                    <Input name='firstName' label='First Name' handleChange={handleChange} half />
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
                    {/* <GoogleLogin
                        // render={(renderProps) => (
                            // <Button
                            //     className={classes.googleButton}
                            //     color='primary'
                            //     fullWidth
                            //     onClick={renderProps.onClick}
                            //     disabled={renderProps.disabled}
                            //     startIcon={<Icon />}
                            //     variant='contained'
                            // >
                                // Google Sign In
                            // </Button>
                        // )}
                        onSuccess={googleSuccess}
                        onError={googleFailure}
                        // cookiePolicy='single_host_origin'
                    /> */}
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