import React, { useContext, useEffect, useState } from 'react'
import './Clientdetails.css'
import { ErrorMessage, Formik } from 'formik';
import * as yup from 'yup'
import axios from 'axios';
import Swal from 'sweetalert2'
import { userContex } from '../Home/Home';
import { Button, Form } from 'react-bootstrap';
import { Input } from 'react-select/animated';

function ClientDetailsEdit({ clientId }) {

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
        if (clientId) {
            axios.post('http://49.204.232.254:91/clientinfo/getbyid',
                {
                    clientId: clientId,

                }).then(res => {
                    console.log(res.data);
                    let bookingiddata = res.data.data
                    bookingiddata.map(item => (
                        setClientInfo({
                            ...clientInfo,
                            name: item.name,
                            mobileNo: item.mobileno,
                            gender: item.gender,
                            aadharphoto: item.aadharphoto,
                            adult: item.adult,
                            children: item.children,
                        })
                    ))
                })
        }
    }, [id])
    // setStay(Number(clientInfo.adult)+Number(clientInfo.children))
    let handleSubmit = () => {
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
        formData.append("clientId", clientId)
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
                    title: " Update client!",
                    text: "Client information Updated Successful!",
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
                // setActiveTab('add-booking')
                // setComponent(<AddNewBooking />)


                console.log(ClientId);
            })

    }


    return (
        <>
            <h1 style={{ display: "flex", flexDirection: "column", paddingTop: "10px", color : "white" }}>Edit Client Details</h1>

            <div className='conttt'>
                <div className='body'>
                    <Formik enableReinitialize initialValues={clientInfo} validationSchema={schema} onSubmit={handleSubmit}>
                        {({ handleSubmit, handleChange, setFieldValue }) => (
                            <Form onSubmit={handleSubmit} className='forrmm'>
                                <label className='label'>Name</label>
                                <input type='text' name='name' value={clientInfo.name} onChange={(e) => { handleClient(e); handleChange(e) }} />
                                <ErrorMessage name='name' component='div' className='errormsg' />
                                <label>Gender</label>
                                <select name='gender' value={clientInfo.gender} onChange={(e) => { handleClient(e); handleChange(e) }}>
                                    <option value=''>select gender</option>
                                    <option value='Male'>Male</option>
                                    <option value='Female'>Female</option>
                                </select>
                                <ErrorMessage name='gender' component='div' className='errormsg' />

                                <Form.Group className="mb-3" controlId="formBasicAadhar">
                                    <Form.Label>aadhar photo:</Form.Label>


                                    {clientInfo.aadharphoto && typeof clientInfo.aadharphoto === 'string' && (
                                        <div className="mb-2">
                                            <strong>Current Aadhar File:</strong>
                                             {clientInfo.aadharphoto.split('/').pop()}
                                        </div>
                                    )}


                                    <Form.Control
                                        type="file"
                                        accept="image/*"
                                        placeholder="Upload Aadhar"
                                        name="aadharphoto"
                                      
                                        onChange={(e) => {
                                            handleClient(e);
                                            setFieldValue('aadharphoto', e.currentTarget.files[0]||clientInfo.aadharphoto.split('/').pop());
                                            handleChange(e);
                                        }}
                                    />

                                    <ErrorMessage name="aadharphoto" component="div" className='text-danger' />
                                </Form.Group>

                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control type='number' name='mobileNo' value={clientInfo.mobileNo} onChange={(e) => { handleClient(e); handleChange(e) }} />
                                <ErrorMessage name='mobileNo' component='div' className='errormsg' />
                                <p>No. of member staying <Form.Control type='number' value={Number(clientInfo.adult) + Number(clientInfo.children)} disabled name='numOfStaying' /></p>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <Form.Label>Adult:</Form.Label>
                                        <p> <Form.Control type='number' name='adult' value={Number(clientInfo.adult)} className='inputdata' onChange={(e) => { handleClient(e); handleChange(e) }} /></p>
                                        <ErrorMessage name='adult' component='div' className='errormsg' />
                                    </div>
                                    <div>
                                        <Form.Label>Children:</Form.Label>
                                        <p><Form.Control type='number' name='children' value={Number(clientInfo.children)} className='inputdata'  onChange={(e) => { handleClient(e); handleChange(e) }} /></p>
                                        <ErrorMessage name='children' component='div' className='errormsg' />
                                    </div>
                                </div>
                                <Button type='submit' onClick={handleSubmit}>SAVE</Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default ClientDetailsEdit