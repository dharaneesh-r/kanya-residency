import React, { useContext, useEffect, useState } from 'react'
import './ClientInfo.css'
import { ErrorMessage, Formik } from 'formik';
import * as yup from 'yup'
import axios from 'axios';
import Swal from 'sweetalert2'
import { userContex } from '../Home/Home';
import AddNewBooking from '../AddNewBooking/AddNewBooking';
import { Button, Form } from 'react-bootstrap';

function ClientInfo() {

    const [
        setComponent,
        setActiveTab,
        selectedOption,
        setSelectedOption,
        select,
        setSelect,
        ClientId,
        setClientId,
        id,
        setId
    ] = useContext(userContex)
    console.log(id)
    let userId = sessionStorage.getItem('userId')
    let formData = new FormData();

    let [clientInfo, setClientInfo] = useState({
        name: '',
        gender: '',
        adhaarNo: '',
        aadharphoto: '',
        mobileNo: '',
        numOfStaying: '',
        adult: '',
        children: ''
    })
    let schema = yup.object().shape({
        name: yup.string().required(),
        gender: yup.string().required(),
        adult: yup.string().required(),
        children: yup.string().required(),
        aadharphoto: yup.mixed().required()
    })
    let handleClient = (e) => {
        // setClientInfo({ ...clientInfo, [e.target.name]: e.target.value })
        const { name, type, value, files } = e.target;


        if (type === 'file') {

            setClientInfo({
                ...clientInfo,
                [name]: files[0]
            });
        } else {
            setClientInfo({
                ...clientInfo,
                [name]: value
            });

        };


    }
    useEffect(() => {
        if (id) {
            axios.post('http://49.204.232.254:91/advroombooking/getbyid',
                {
                    bookingId: id,

                }).then(res => {
                    console.log(res.data);
                    let bookingiddata = res.data.data
                    bookingiddata.map(item => (
                        setClientInfo({
                            ...clientInfo,
                            name: item.name,
                            mobileNo: item.mobileno,
                        })
                    ))
                })
        }
    }, [id])
    // setStay(Number(clientInfo.adult)+Number(clientInfo.children))
    let handleSubmit = () => {
        if (id) {
            handleUpdateclientinfo()
        }
        else {
            handlesavenewclientinfo()
        }

    }
    let handlesavenewclientinfo = () => {
        console.log(clientInfo);
        setSelectedOption('roomInfo')
        let formData = new FormData()

        formData.append("name", clientInfo.name);
        formData.append("gender", clientInfo.gender);
        // formData.append("aadharno", clientInfo.adhaarNo);
        formData.append("aadharphoto", clientInfo.aadharphoto);
        formData.append("mobileno", clientInfo.mobileNo);
        formData.append("adult", clientInfo.adult);
        formData.append("children", clientInfo.children);
        // formData.append("updatedBy", 1);
        formData.append("bookingId", 0)
        formData.append("createdBy", userId)


        console.log(formData);


        for (let pair of formData.entries()) {
            console.log(pair[0] + ':', pair[1]);
        }

        axios.post('http://49.204.232.254:91/clientinfo/insertClient', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }

            }).then(res => {
                console.log(res.data);
                Swal.fire({
                    title: " Save client!",
                    text: "Client infor saved  Successful!",
                    icon: "success"
                });
                setClientInfo({
                    name: '',
                    gender: '',
                    adhaarNo: '',
                    aadharphoto: '',
                    mobileNo: '',
                    numOfStaying: '',
                    adult: '',
                    children: ''
                })
                setClientId(res.data.clientId)
                setActiveTab('add-booking')
                setComponent(<AddNewBooking />)
                setSelectedOption('roomInfo')

                console.log(ClientId);
            })
    }
    let handleUpdateclientinfo = () => {
        console.log(clientInfo);
        setSelectedOption('roomInfo')
        let formData = new FormData()

        formData.append("name", clientInfo.name);
        formData.append("gender", clientInfo.gender);
        // formData.append("aadharno", clientInfo.adhaarNo);
        formData.append("aadharphoto", clientInfo.aadharphoto);
        formData.append("mobileno", clientInfo.mobileNo);
        formData.append("adult", clientInfo.adult);
        formData.append("children", clientInfo.children);
        formData.append("updatedBy", userId);
        formData.append("bookingId", id)
        formData.append("createdBy", userId)


        console.log(formData);


        for (let pair of formData.entries()) {
            console.log(pair[0] + ':', pair[1]);
        }

        axios.post('http://49.204.232.254:91/clientinfo/insertClient', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }

            }).then(res => {
                console.log(res.data);
                Swal.fire({
                    title: "update client!",
                    text: "updated client info Successful!",
                    icon: "success"
                });
                setClientId(res.data.clientId)
                setActiveTab('add-booking')
                setComponent(<AddNewBooking />)
                setSelectedOption('roomInfo')

                console.log(ClientId);
            })
    }
    return (
        <div style={{ backgroundColor : "#E0E1DD"}}>
            <h1>Client info</h1>
            <div>
                <div style={{ marginLeft: "auto", marginRight: "auto" }}>
                    <Formik enableReinitialize initialValues={clientInfo} validationSchema={schema} onSubmit={handleSubmit}>
                        {({ handleSubmit, handleChange, setFieldValue }) => (
                            <Form onSubmit={handleSubmit}>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type='text' name='name' value={clientInfo.name} onChange={(e) => { handleClient(e); handleChange(e) }} />
                                <ErrorMessage name='name' component='div' className='errormsg' />
                                <Form.Label>Gender</Form.Label>
                                <Form.Select name='gender' onChange={(e) => { handleClient(e); handleChange(e) }}>
                                    <option value=''>select gender</option>
                                    <option value='Male'>Male</option>
                                    <option value='Female'>Female</option>
                                </Form.Select>
                                <ErrorMessage name='gender' component='div' className='errormsg' />
                                <Form.Label>Adhaar</Form.Label>
                                <Form.Control type='file' accept='image/*' name='aadharphoto' onChange={(e) => { handleClient(e); setFieldValue('aadharphoto', e.currentTarget.files[0]); handleChange(e) }} />
                                <ErrorMessage name='aadharphoto' component='div' className='errormsg' />
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control type='number' name='mobileNo' value={clientInfo.mobileNo} onChange={(e) => { handleClient(e); handleChange(e) }} />
                                <ErrorMessage name='mobileNo' component='div' className='errormsg' />
                                <Form.Label>No. of member staying</Form.Label>
                                <Form.Control type='number' value={Number(clientInfo.adult) + Number(clientInfo.children)} disabled name='numOfStaying' />
                                <Form.Label>Adult:</Form.Label>
                                <br />
                                <Form.Control type='number' name='adult' className='inputdata' onChange={(e) => { handleClient(e); handleChange(e) }} />
                                <ErrorMessage name='adult' component='div' className='errormsg' />
                                <Form.Label>Children:</Form.Label>
                                <br />
                                <Form.Control type='number' name='children' className='inputdata' onChange={(e) => { handleClient(e); handleChange(e) }} />
                                <ErrorMessage name='children' component='div' className='errormsg' />
                                <Button type='submit' onClick={handleSubmit}>Next</Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default ClientInfo