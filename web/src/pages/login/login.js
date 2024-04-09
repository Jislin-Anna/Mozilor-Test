import React, { useEffect } from 'react'
import { useState } from 'react'
import { Grid, TextField, Button, Typography, Box } from '@mui/material'
import { LoginUser, SignUpUser } from '../../service/user'
import { useNavigate } from "react-router-dom";
import { useStore } from '../../store/systemcontext';

const paperStyle = { padding: 20, height: '50vh', width: "30%", margin: "10% auto" }

const btnstyle = { margin: '8px 0' }

const Login = () => {

    const navigate = useNavigate()
    const [values, setValues] = useState({
        email: "",
        password: "",
        username: ""
    });
    const [errorText, setErrorText] = useState("")
    const [signUp, setSignUp] = useState(false)
    const { dispatch } = useStore()

    const validate = () => {
        if (values?.email === "" || values?.password === "" || (signUp && values?.username === ""))
            return false
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        // Test if the input email matches the regex pattern
        return (emailRegex.test(values?.email));
    }

    const onSignIn = async (event) => {
        event.preventDefault()
        let response;
        //validate
        if (validate()) {
            try {
                if (signUp)
                    response = await SignUpUser(values)
                else
                    response = await LoginUser(values)
                dispatch({
                    type: "ADD_USER",
                    payload: response?.data?.data?.user
                })
                dispatch({
                    type: "IS_LOGGED_IN",
                    payload: true
                })
                sessionStorage.setItem("token", response?.data?.token)
                navigate("/dashboard")
            } catch (e) {
                console.error(e)
                setErrorText("Invalid Credentials!")
            }
        }
        else {
            setErrorText("Please fill all fields with valid inputs")
        }
    }

    const toggleButton = () => {
        setSignUp(!signUp)
    }

    const handleOnChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

    useEffect(() => {

    }, [])

    return (
        <Grid>
            <Box style={paperStyle}>
                <form className="form" style={{ display: "flex", flexDirection: "column", alignItems: "center", boxShadow: "1px 5px 5px 1px", padding: "10%" }} onSubmit={onSignIn}>
                    <Grid align='center'>
                        <h2>{signUp ? "Sign Up" : "Login"}</h2>
                    </Grid>
                    {signUp && <TextField label='username' name="username" placeholder='Enter username' variant="outlined" fullWidth required value={values?.username} onChange={handleOnChange} />}
                    <TextField label='email' name='email' placeholder='Enter email' variant="outlined" fullWidth required value={values?.email} onChange={handleOnChange} />
                    <TextField label='password' name='password' placeholder='Enter password' type='password' variant="outlined" fullWidth required value={values?.password} onChange={handleOnChange} />
                    {errorText?.length > 0 && <Typography color={"red"}>{errorText}</Typography>}
                    <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>{signUp ? "Sign Up" : "Login"}</Button>
                    <Box display={"flex"} alignItems={"baseline"}>
                        <Typography mt={2}> {signUp ? "Do you " : "Don't "}  have an account ? </Typography>
                        <Button variant="text" onClick={toggleButton}> {signUp ? "Login" : "Sign Up"}</Button>
                    </Box>
                </form>
            </Box>
        </Grid>
    )
}

export default Login