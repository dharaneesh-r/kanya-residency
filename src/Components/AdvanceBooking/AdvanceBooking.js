import React, { useEffect, useState, useContext } from "react";
import './AdvanceBookings.css'
import Select from "react-select";
import Swal from 'sweetalert2'
import * as yup from "yup";
import { ErrorMessage, Formik } from "formik";
import axios from "axios";
import { Form } from "react-bootstrap";
import { useLocation, useNavigate, navigate, Link } from "react-router-dom";
import ClientInfo from "../ClientInfo/ClientInfo";
import { userContex } from "../Home/Home";
import AddNewBooking from "../AddNewBooking/AddNewBooking";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Dashboard from "../Home/Homepage";
export const AdvanceBooking = ({ bookingId }) => {
    console.log(bookingId)
    let navigate = useNavigate()
    const [
        setComponent,
        setActiveTab,
        selectedOption,
        setSelectedOption,
        select,
        setSelect
    ] = useContext(userContex)
    const [rooms, setRooms] = useState([]);
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [editadvance, seteditadvance] = useState(false)
    let today = new Date()
    let currentyear = today.getFullYear()
    let currentmonth = today.getMonth() + 1
    console.log(currentyear, currentmonth)


    const [user, setUser] = useState({
        _id: "",
        name: "",
        mobileNo: "",
        amount: "",
        fromdate: currentyear,
        todate: currentmonth,
        rooms: [],
        totalamount: "",
        discountamount: "",
        advancepaid: '',
        paymentmode: "Cash",
        paidon: new Date().toISOString().substring(0, 10),
        remarks: "",
    });

    let [allrooms, setallroom] = useState([])
    useEffect(() => {
        if (user.fromdate && user.todate) {
            const fromDateObj = new Date(user.fromdate);
            const toDateObj = new Date(user.todate);
            let data = {
                year: fromDateObj.getFullYear(),
                month: toDateObj.getMonth() + 1
            }
            console.log(data)

            axios.post("http://49.204.232.254:91/report/get-within-range", data).then(res => {
                console.log(res.data)
                setallroom(res.data)
            })
        }
    }, [user.fromdate, user.todate])


    useEffect(() => {
        if (user.fromdate && user.todate) {
            axios.get("http://49.204.232.254:91/room/getalldata")
                .then(res => {
                    const roomOptions = res.data.data.map(room => {
                        const isRoomBooked = allrooms.some(bookedDay => {

                            const bookedDate = new Date(user.fromdate).getDate() <= bookedDay.day && bookedDay.day <= new Date(user.todate).getDate();


                            const isBookedRoom = bookedDay.rooms.includes(room.roomId.toString()) && bookedDay.status !== "Not Booked";

                            return bookedDate && isBookedRoom;
                        });

                        return {
                            value: room.roomId,
                            label: room.roomName,
                            isDisabled: isRoomBooked
                        };
                    });

                    setRooms(roomOptions);
                    console.log(roomOptions);
                })
                .catch(err => console.error("Error fetching rooms:", err));
        }
    }, [user.fromdate, user.todate, allrooms]);
    const ratePerRoomPerDay = 7000;

    useEffect(() => {
        if (user.fromdate && user.todate && selectedRooms.length) {
            const fromDate = new Date(user.fromdate);
            const toDate = new Date(user.todate);
            const days = Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24)) + 1;


            const calculatedAmount = days * selectedRooms.length * ratePerRoomPerDay;
            setUser({ ...user, amount: calculatedAmount });
        } else {
            setUser({ ...user, amount: 0 });
        }
    }, [user.fromdate, user.todate, selectedRooms]);








    const schema = yup.object().shape({
        name: yup.string().required("You must enter Your Name"),
        mobileNo: yup.string().required("You must enter Your Mobile Number"),
        fromdate: yup.string().required("Select a valid date"),
        todate: yup.string().required("Select a valid date"),
        // amount:yup.string().required(),
        advancepaid: yup.string().required()
    });

    // console.log(id);

    useEffect(() => {
        if (bookingId) {
            console.log(bookingId)
            axios.post('http://49.204.232.254:91/advroombooking/getbyid', { bookingId: bookingId })
                .then(res => {
                    let bookingiddata = res.data.data[0];
                   

                    console.log(bookingiddata)
                    const roomIds = bookingiddata.roomId;
                    const roomNames = bookingiddata.roomName;
                    const selectedRooms = roomIds.map((id, index) => ({
                        value: id,
                        label: roomNames[index]
                    })
                    );
                    console.log(bookingiddata)
                    setSelectedRooms(selectedRooms); // Pre-populate selected rooms in the form
                    setUser({
                        ...user,
                        name: bookingiddata.name,
                        mobileNo: bookingiddata.mobileno,
                        amount: bookingiddata.advancepaid,
                       
                         fromdate: new Date(bookingiddata.fromdate).toISOString().substring(0, 10),
                        todate: new Date(bookingiddata.todate).toISOString().substring(0, 10),
                        rooms: roomIds,
                        totalamount: bookingiddata.totalamount,
                        discountamount: bookingiddata.discountamount,
                        advancepaid: bookingiddata.advancepaid,
                        paymentmode: bookingiddata.paymentmode,
                        remarks: bookingiddata.remarks,
                        _id: bookingiddata._id
                    });


                });
            seteditadvance(true)

        }


    }, [bookingId]);



    const handleSubmit = () => {
        console.log(editadvance)
        if (editadvance) {
            handleupdateadvancebooking()
        }
        else {
            handleSaveadvancebooking()
        }

    }
    let handleSaveadvancebooking = () => {
        let data = {
            fromdate: user.fromdate,
            todate: user.todate,
            name: user.name,
            mobileno: user.mobileNo,
            rooms: user.rooms,
            totalamount: user.amount,
            discountamount: user.discountamount,
            finalamount: user.amount - user.discountamount,
            advancepaid: user.advancepaid,
            balanceamount:user.amount - Number(user.discountamount) - user.advancepaid,
            paymentmode: user.paymentmode,
            paidOn: user.paidon,
            remarks: user.remarks
        }
        console.log(data)
        axios.post('http://49.204.232.254:91/advroombooking/insertroom', data

        ).then(res => {
            Swal.fire({
                title: "Booked!",
                text: "Advance booking Successful!",
                icon: "success"
            });
            console.log(res.data);
            setActiveTab('add-booking')

            setComponent(<AddNewBooking />)

            setSelectedOption('select')
            setSelect('advanced')

        });
        setComponent(<ClientInfo />)
    };
    let handleupdateadvancebooking = () => {

        let data = {
            bookingId: bookingId,
            id: user._id,
            fromdate: user.fromdate,
            todate: user.todate,
            name: user.name,
            mobileno: user.mobileNo,
            rooms: user.rooms,
            totalamount: user.amount,
            discountamount: user.discountamount,
            finalamount: user.amount - Number(user.discountamount),
            advancepaid: user.advancepaid,
            balanceamount: user.amount - Number(user.discountamount) - user.advancepaid,
            paymentmode: user.paymentmode,
            paidOn: user.paidon,
            remarks: user.remarks
        }
        console.log(data)
        axios.post('http://49.204.232.254:91/advroombooking/insertroom', data).then(res => {
            Swal.fire({
                title: "Updated!",
                text: "Advance booking updated Successful!",
                icon: "success"
            });
            console.log(res.data);
            setActiveTab('add-booking')

            setComponent(<AddNewBooking />)

            setSelectedOption('select')
            setSelect('advanced')

        });
        setComponent(<ClientInfo />)
    };


    const handleInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (selected, setFieldValue) => {
        const selectedValues = selected ? selected.map(option => option.value) : [];
        setUser({ ...user, rooms: selectedValues });
        setFieldValue('rooms', selectedValues);
        setSelectedRooms(selected);
    };


    return (
        <div style={{backgroundColor : "#415A77"}}>
            <br />
            <br />
            <div className="mobile-container" style={{backgroundColor : "#415A77"}}>

                <div className="formContent" style={{backgroundColor : "#415A77"}}>
                <h1 style={{textAlign:"center", color : "white", fontWeight : "bold",marginBottom:"10px"}}>ADVANCE BOOKING</h1>


                        <Formik
                            enableReinitialize
                            initialValues={user}
                            validationSchema={schema}
                            onSubmit={handleSubmit}
                        >
                        {({ handleSubmit, handleChange, setFieldValue }) => (
                            <Form className="formm" style={{backgroundColor : "#E0E1DD"}} onSubmit={handleSubmit}>
                                <div className="form-section date">
                                    <div className="date-field">
                                        <Form.Label htmlFor="from">From:</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="fromdate"
                                            value={user.fromdate}
                                            onChange={(e) => {
                                                handleInput(e);
                                                handleChange(e);
                                            }}
                                        />
                                        <ErrorMessage name="fromdate" component="div" className="error1" />
                                    </div>
                                    <div className="date-field">
                                        <Form.Label htmlFor="to">To:</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="todate"
                                            value={user.todate}
                                            onChange={(e) => {
                                                handleInput(e);
                                                handleChange(e);
                                            }}
                                        />
                                        <ErrorMessage name="todate" component="div" className="error1" />
                                    </div>
                                </div>

                                <div className="form-section">
                                    <Form.Label htmlFor="name">Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={user.name}
                                        onChange={(e) => {
                                            handleInput(e);
                                            handleChange(e);
                                        }}
                                    />
                                    <ErrorMessage name="name" component="div" className="error1" />
                                </div>

                                <div className="form-section">
                                    <Form.Label htmlFor="mobileNo">Mobile No</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="mobileNo"
                                        value={user.mobileNo}
                                        onChange={(e) => {
                                            handleInput(e);
                                            handleChange(e);
                                        }}
                                    />
                                    <ErrorMessage name="mobileNo" component="div" className="error1" />
                                </div>

                                <div className="form-section">
                                    <Form.Label>Rooms:</Form.Label>
                                    <Select
                                        isMulti
                                        options={rooms}
                                        value={selectedRooms}
                                        onChange={selected => handleSelectChange(selected, setFieldValue)}
                                        placeholder="Select rooms"
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        isOptionDisabled={option => option.isDisabled}

                                    />

                                </div>

                                <div className="form-section">
                                    <Form.Label htmlFor="amount">Amount</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="amount"
                                        disabled
                                        value= {user.amount}
                                        
                                        onChange={(e) => { handleInput(e); handleChange(e); }}
                                    
                                    />

                                </div>

                                <div className="form-section">
                                    <Form.Label htmlFor="discountamount">Discount</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="discountamount"
                                        value={user.discountamount}
                                        onChange={(e) => {
                                            handleInput(e);
                                            handleChange(e);
                                        }}
                                    />
                                </div>

                                <div className="form-section">
                                    <Form.Label htmlFor="totalamount">Total Amount</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="totalamount"
                                        value={user.rooms &&
                                             user.amount - Number(user.discountamount) }
                                        onChange={(e) => {
                                            handleInput(e);
                                            handleChange(e);
                                        }}
                                        disabled
                                    />

                                </div>

                                <div className="form-section">
                                    <div className="advancepaid-container">
                                        <Form.Label htmlFor="advancepaid">Advance Paid</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="advancepaid"
                                            value={user.advancepaid}
                                            onChange={(e) => {
                                                handleInput(e);
                                                handleChange(e);
                                            }}
                                        />
                                        <ErrorMessage name="advancepaid" component="div" className="error1" />
                                    </div>


                                    <div className="form-section balance ">
                                        <Form.Label htmlFor="totalamount">BalanceAmount</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="totalamount"
                                            value={
                                                user.rooms &&
                                                user.amount - Number(user.discountamount) - Number(user.advancepaid)}
                                              onChange={(e) => { handleInput(e); handleChange(e); }}
                                          
                                        
                                            disabled
                                        />
                                        <Form.Label htmlFor="remarks">Remarks</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="remarks"
                                            value={user.remarks}
                                            onChange={(e) => {
                                                handleInput(e);
                                                handleChange(e);
                                            }}
                                        /><Form.Label htmlFor="remarks">Paid On</Form.Label>
                                        <Form.Control
                                            type="Date"
                                            name="paidon"
                                            value={user.paidon}
                                            onChange={(e) => {
                                                handleInput(e);
                                                handleChange(e);
                                            }}
                                        />
                                    </div>

                                    <div className="payment-mode">
                                        <Form.Label htmlFor="paymentmode">Payment Mode</Form.Label>
                                        <Form.Select
                                            name="paymentmode"
                                            onChange={(e) => {
                                                handleInput(e);
                                                handleChange(e);
                                            }}
                                        >
                                            <option value="Cash">Cash</option>
                                            <option value="GPay">GPay</option>
                                        </Form.Select>
                                    </div>
                                </div>

                                <div className="save-button">
                                    <button type="submit" >Save</button>

                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>  
        </div>
    );
};
