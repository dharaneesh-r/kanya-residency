import React, { useState } from 'react';
import * as yup from 'yup';
import {ErrorMessage, Formik } from 'formik';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    let naviagte=useNavigate()
    let schema = yup.object().shape({
        username: yup.string().matches(/[a-z0-9]/, "Username can't contain UpperCase").required(),
        password: yup.string().matches(/[a-zA-Z0-9]/).required()
    })

    let [userDetails, setUserDetails] = useState({
        username: '',
        password: ''
    })

    let handleUser = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
    }

    let handleSubmit = () => {
        console.log(userDetails);
        axios.post("http://49.204.232.254:91/api/userlogin",{
            username:userDetails.username,
            password:userDetails.password
        }).then((res)=>{
            console.log(res.data);
            // console.log(res.data.user);
            sessionStorage.setItem("userId",res.data.user.userId)
            sessionStorage.setItem("username",res.data.user.username)
            naviagte('/home')
        }

        )
    }
    return (
        <div className='main'>
            <div className='L-container'>
            <h2 className='L-heading'><span style={{color : "#330066"}}>KANYA</span>{" "}<span style={{color : "#006633"}}>RESIDENCY</span></h2>
                <h3 className='L-heading'>Login</h3>
                <Formik initialValues={userDetails} validationSchema={schema} onSubmit={handleSubmit}>
                    {({ handleSubmit, handleChange }) => (
                        <form onSubmit={handleSubmit}>
                            <div className='L-body'>
                                <div className='L-input'>
                                    <label>Username :</label><br />
                                    <input type='text' placeholder='Enter username' name='username' value={userDetails.username} onChange={(e) => { handleUser(e); handleChange(e) }} />
                                </div>
                                <ErrorMessage name='username' component='div' className='error' />
                                <div className='L-input'>
                                    <label>Password :</label><br />
                                    <input type='password' placeholder='Enter password' name='password' value={userDetails.password} onChange={(e) => { handleUser(e); handleChange(e) }} />
                                </div>
                                <ErrorMessage name='password' component='div' className='error' />
                                <div className='L-button' >
                                    <button type='submit'>SignIn</button>
                                </div>
                            </div>
                        </form>
                    )}
                </Formik>
                <p>If you don't have account!, please <a href='/signup'>SignUp</a> </p>
            </div>  
        </div>
    )
}

export default Login
