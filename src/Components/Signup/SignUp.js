import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { ErrorMessage, Formik } from 'formik'
import './Signup.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

function SignUp() {
    let navigate=useNavigate()
    let schema = yup.object().shape({
        name: yup.string().matches(/[A-Za-z]/, "Name can't contain number and other character").required(),
        username: yup.string().matches(/[a-z0-9]/, "Username can't contain UpperCase").required(),
        password: yup.string().matches(/[a-zA-Z0-9]/).required(),
    })

    let [userDetails, setUserDetails] = useState({
        name: '',
        username: '',
        password: '',
        option: 'User'
    })

    const [allUser, setAllUser] = useState([])

    useEffect(() => {
        axios.get("http://49.204.232.254:91/api/getallusers").then((res) => {
            setAllUser(res.data.data)
            console.log(res.data.data)
            console.log(allUser)
        })
    },[])

    let handleUser = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
    }
    let handleSubmit = () => {

     let existingUser = allUser.some((user) => user.username == userDetails.username)
     console.log(existingUser)

        console.log(userDetails);

        if(!existingUser){
            let data={
                        name:userDetails.name,
                        username:userDetails.username,
                        password:userDetails.password,
                        usertype:userDetails.option
                    }
                    console.log(data)
                   axios.post("http://49.204.232.254:91/api/insertuserdata",data).then(res=>{
                    console.log(res.data)
                    Swal.fire({
                        title: "Created!",
                        text: "Account Created Successfully!",
                        icon: "success"
                      });
                    navigate('/')
                   })
        }else{
            Swal.fire("User Already Exits!!!")
        }

    //     let data={
    //         name:userDetails.name,
    //         username:userDetails.username,
    //         password:userDetails.password,
    //         usertype:userDetails.option
    //     }
    //     console.log(data)
    //    axios.post("http://49.204.232.254:91/api/insertuserdata",data).then(res=>{
    //     console.log(res.data)
    //     Swal.fire({
    //         title: "Created!",
    //         text: "Account Created Successfully!",
    //         icon: "success"
    //       });
    //     navigate('/login')
    //    })
        
    }
    return (
        <div className='main'>
            <div className='s-container'>
                <h2 className='s-heading'><span style={{color : "#330066"}}>KANYA</span>{" "}<span style={{color : "#006633"}}>RESIDENCY</span></h2>
                <h3 className='s-heading'>Create User</h3>
                <Formik initialValues={userDetails} validationSchema={schema} onSubmit={handleSubmit}>
                    {({ handleSubmit, handleChange }) => (
                        <form onSubmit={handleSubmit}>
                            <div className='s-body'>
                                <div className='s-input'>
                                    <label>Name :</label><br />
                                    <input type='text' placeholder='Enter Name' name='name' value={userDetails.name} onChange={(e) => { handleUser(e); handleChange(e) }} />
                                </div>
                                <ErrorMessage name='name' component='div' className='error' />
                                <div className='s-input'>
                                    <label>Username :</label><br />
                                    <input type='text' placeholder='Enter username' name='username' value={userDetails.username} onChange={(e) => { handleUser(e); handleChange(e) }} />
                                </div>
                                <ErrorMessage name='username' component='div' className='error' />
                                <div className='s-input'>
                                    <label>Password :</label><br />
                                    <input type='password' placeholder='Enter password' name='password' value={userDetails.password} onChange={(e) => { handleUser(e); handleChange(e) }} />
                                </div>
                                <ErrorMessage name='password' component='div' className='error' />
                                <div className='s-input'>
                                    <select name="option" className='select' onChange={(e) =>  handleUser(e)}>
                                        <option value=''>select type</option>
                                        <option value="User">User</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </div>
                                {/* <ErrorMessage name='type' component='div' className='error' /> */}
                                <div className='s-button' >
                                    <button type='submit'>save  </button>
                                </div>
                            </div>
                        </form>
                    )}
                </Formik>
                <p>If you already have account!, please <a href='/'>Login</a> </p>
            </div>
        </div>
    )
}

export default SignUp
