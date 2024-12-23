import { ErrorMessage, Formik } from 'formik'
import * as yup from "yup"
import React, { useState } from 'react'
import './RoomInfo.css'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'


const RoomCheckOut = ({roomInfoId, clientId}) => {

    const [checkoutData, setCheckOutData] = useState({
        outTime: "",
        outDate: "",
        outPaidAmt: "",
        outPaymentMode: "",
    })
let [allcheckoutdata,setallcheckoutdata] = useState([])
    const handleSubmit = async () => {
        console.log("submit")
        try {
            const response =await axios.post("http://49.204.232.254:91/roominfo/checkOut", {
                roomInfoId : roomInfoId,
                clientId : clientId,
                outTime: checkoutData.outTime,
                outDate: checkoutData.outDate,
                outPaidAmt: checkoutData.outPaidAmt,
                outPaymentMode: checkoutData.outPaymentMode
            })
            // setallcheckoutdata(response.data)
            console.log(response.data)
            Swal.fire({
                title: "Checkout !!!",
                text: "checkout successfully !!!",
                icon: "success"
              });
              setCheckOutData({
                outTime: "",
                outDate: "",
                outPaidAmt: "",
                outPaymentMode: "",
              })
        } catch (err) {
            console.log(err)
        }
    }


    let schema = yup.object().shape({
        outTime: yup.string().required(),
        outDate: yup.string().required(),
        outPaidAmt: yup.string().required(),
        outPaymentMode: yup.string().required()
    })
let handleInput=(e)=>{
setCheckOutData({...checkoutData,[e.target.name]:e.target.value})
}
    return (
        <div className='conttt'>
            <div className='body'>
                <Formik initialValues={checkoutData} onSubmit={handleSubmit} validationSchema={schema} 
                enableReinitialize>
                {({ handleSubmit, handleChange }) => (
                    <Form className='forrmm' onSubmit={handleSubmit}>
                        <div className='date'>
                            {/* <div className='froms'> */}
                                <Form.Label className="froomm" for="from">  Out date:</Form.Label>
                                <Form.Control type="date" name="outDate" value={checkoutData.outDate} 
                                onChange={(e) => {handleInput(e); handleChange(e) }} />
                                <ErrorMessage
                                    name="outDate"
                                    component="div"
                                    className="error2"
                                />
                            {/* </div> */}
                            {/* <div className='froms'> */}
                                <Form.Label className="froomm" for="from">  Out Time:</Form.Label>
                                <Form.Control type="time" name="outTime" value={checkoutData.outTime} onChange={(e) => { handleInput(e); handleChange(e) }} />
                                <ErrorMessage
                                    name="outTime"
                                    component="div"
                                    className="error2"
                                />
                            {/* </div> */}
                            {/* <div className='froms'> */}
                                <Form.Label className="froomm" for="from">  Out Paid Amount:</Form.Label>
                                <Form.Control type="text" name="outPaidAmt" value={checkoutData.outPaidAmt} onChange={(e) => {handleInput(e); handleChange(e) }} />
                                <ErrorMessage
                                    name="outPaidAmt"
                                    component="div"
                                    className="error2"
                                />
                            {/* </div> */}
                            <div className="payment-mode">
                                    <Form.Label htmlFor="paymentmode">Payment Mode</Form.Label>
                                    <Form.Select
                                        name="outPaymentMode"
                                        onChange={(e) => {
                                            handleInput(e);
                                            handleChange(e);
                                        }}
                                    >
                                          <option value="">Select</option>
                                        <option value="Cash">Cash</option>
                                        <option value="GPay">GPay</option>
                                    </Form.Select>
                                    <ErrorMessage
                                    name="outPaymentMode"
                                    component="div"
                                    className="error2"
                                />
                                </div>
                        </div>
                        <Button type="submit">Submit</Button>

                    </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default RoomCheckOut