import React, { useContext } from 'react'
import './RoomInfo.css'
import { useState, useEffect } from 'react'
import * as yup from 'yup'
import { ErrorMessage, Formik } from 'formik'
import Select from "react-select";
import axios from 'axios'
import Swal from 'sweetalert2'
import { Button, Form } from 'react-bootstrap'
import { userContex } from '../Home/Home'
import Homepage from '../Home/Homepage'

function
    RoomInfo({ roomInfoId }) {
    console.log(roomInfoId)
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
    console.log(ClientId)
    // const options = [
    //     { value: 'GF', label: 'GF' },
    //     { value: 'IA', label: 'IA' },
    //     { value: 'IB', label: 'IB' },
    //     { value: 'IIA', label: 'IIA' },
    //     { value: 'IIB', label: 'IIB' },
    // ];
    const [rooms, setRooms] = useState([]);
    let [user, setUser] = useState({
        fromdate: "",
        todate: "",
        rooms: [],
        checkin: "",
        totalamount: "",
        advancepaid: "",
        paymentmode: "Cash",
        discountamount: '',
        finalamount: '',
        paidon: new Date().toISOString().substring(0, 10),
        balanceamount: ""

    })

    let [allrooms, setallroom] = useState([])

    let today = new Date()
    let currentyear = today.getFullYear()
    let currentmonth = today.getMonth() + 1
    console.log(currentyear, currentmonth)


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

    let [bookingId, setbookingId] = useState("")
    useEffect(() => {
        if (ClientId) {
            axios.post('http://49.204.232.254:91/clientinfo/getbyid', {
                clientId: ClientId
            }).then(res => {
                console.log(res.data);
                let data = res.data.data[0]
                console.log(data)
                setbookingId(data.bookingId)
            })
            // setUser({
            //     ...user,
            //     fromdate: new Date(user.fromdate).toISOString().substring(0, 10),
            //     todate: new Date(user.todate).toISOString().substring(0, 10),
            //     rooms: user.rooms,
            //     checkin: user.checkin,
            //     totalamount: user.totalamount,
            //     paid: user.paid,
            //     paymentmode: user.paymentmode,
            //     discount: user.discount,
            //     finalamount: user.finalamount
            // })
        }
    }, [ClientId])
    const [selectedRooms, setSelectedRooms] = useState([]);

    useEffect(() => {
        if (bookingId) {
            axios.post('http://49.204.232.254:91/advroombooking/getbyid', { bookingId: bookingId })
                .then(res => {
                    let bookingiddata = res.data.data[0];
                    console.log(bookingiddata)
                    const roomIds = bookingiddata.roomId;
                    const roomNames = bookingiddata.roomName;
                    const selectedRooms = roomIds.map((id, index) => ({
                        value: id,
                        label: roomNames[index]
                    }));

                    setUser({
                        ...user,
                        name: bookingiddata.name,
                        mobileNo: bookingiddata.mobileno,
                        amount: bookingiddata.advancepaid,
                        fromdate: new Date(bookingiddata.fromdate).toISOString().substring(0, 10),
                        todate: new Date(bookingiddata.todate).toISOString().substring(0, 10),
                        rooms: roomIds,
                        totalamount: bookingiddata.finalamount,
                        discountamount: bookingiddata.discountamount,
                        advancepaid: bookingiddata.advancepaid,
                        discountamount: bookingiddata.discountamount,
                        balanceamount: bookingiddata.balanceamount, //balance amount
                        paymentmode: bookingiddata.paymentmode,
                        remarks: bookingiddata.remarks,
                        _id: bookingiddata._id
                    });
                    console.log(user)
                    setSelectedRooms(selectedRooms); // Pre-populate selected rooms in the form
                });
        }
        // seteditadvance(true)

    }, [bookingId, rooms]);
    useEffect(() => {
        console.log(roomInfoId)
        if (roomInfoId) {
            let data = {
                roomInfoId: roomInfoId
            }
            console.log(data)
            axios.post("http://49.204.232.254:91/roominfo/getbyid", data).then(res => {
                console.log(res.data)
                let data = res.data.data[0]
                console.log(data)

                const roomIds = data.roomId;
                    const roomNames = data.roomName;
                    const selectedRooms = roomIds.map((id, index) => ({
                        value: id,
                        label: roomNames[index]
                    }));


                setUser({
                    ...user,
                    fromdate: new Date(data.fromdate).toISOString().substring(0,10),
                    todate: new Date(data.todate).toISOString().substring(0,10),
                    rooms: roomIds,
                    checkin: data.time,
                    totalamount: data.finalamount,
                    advancepaid: data.paidamount,
                    paymentmode: "Cash",
                    discountamount: data.discountamount,
                    finalamount: data.finalamount,
                    paidon: new Date().toISOString().substring(0, 10),
                    balanceamount: ""
                })
                setSelectedRooms(selectedRooms);
                setEditData(true)
            })


        }
    }, [roomInfoId])

    useEffect(() => {
        axios.get("http://49.204.232.254:91/room/getalldata").then(res => {
            const roomOptions = res.data.data.map(room => ({
                value: room.roomId,
                label: room.roomName
            }));
            setRooms(roomOptions);
            console.log(rooms)
        });
    }, []);
    let [advance, setAdvance] = useState([])
    const handleInputadvance = (e) => {
        setAdvance({ ...advance, [e.target.name]: e.target.value });
    };
    const handleSelectChangevalue = (selected, setFieldValue) => {
        const selectedValues = selected ? selected.map(option => option.value) : [];
        console.log(selectedValues)

        setFieldValue('rooms', selectedValues);


        setAdvance(prevAdvance => ({
            ...prevAdvance,
            rooms: selectedValues
        }));
    };


    // console.log(user);

    const [editData, setEditData] = useState(false)

    let handleSubmit = () => {
        if (editData) {
            handleUpdate()
        }
        else {
            handleSave()
        }
    }

    let handleUpdate = () => {
        console.log(user);
        let total = user.rooms.length * 7000
        let finalAmount = user.rooms.length * 7000 - Number(user.discount)

        axios.post('http://49.204.232.254:91/roominfo/insertroominfo', {
            roomInfoId: roomInfoId,
            rooms: user.rooms,
            fromdate: new Date(user.fromdate).toISOString().substring(0, 10),
            todate: new Date(user.todate).toISOString().substring(0, 10),
            time: user.checkin,
            totalamount: user.totalamount,
            discountamount: user.discountamount,
            finalamount: user.totalamount - Number(user.discountamount),
            paidamount: user.advancepaid,
            paidOn : user.paidon,
            paymentmode: user.paymentmode,
            clientId: ClientId || 0,

        }).then(res => {
            console.log(res.data);
            Swal.fire({
                title: "Booked!",
                text: "Update Booking Successful!",
                icon: "success"
            });
            setActiveTab('dashboard')
            setComponent(<Homepage />)
        })
    }

    let handleSave = () => {
        console.log(user);
        let total = user.rooms.length * 7000
        let finalAmount = user.rooms.length * 7000 - Number(user.discount)

        axios.post('http://49.204.232.254:91/roominfo/insertroominfo', {
            rooms: user.rooms,
            fromdate: new Date(user.fromdate).toISOString().substring(0, 10),
            todate: new Date(user.todate).toISOString().substring(0, 10),
            time: user.checkin,
            totalamount: user.totalamount,
            discountamount: user.discountamount,
            finalamount: user.totalamount - Number(user.discountamount),
            paidamount: user.advancepaid,
            paidOn : user.paidon,
            paymentmode: user.paymentmode,
            clientId: ClientId || 0,

        }).then(res => {
            console.log(res.data);
            Swal.fire({
                title: "Booked!",
                text: "Booking Successful!",
                icon: "success"
            });
            setActiveTab('dashboard')
            setComponent(<Homepage />)
        })
    }
    let handleInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    let schema = yup.object().shape(
        {
            fromdate: yup.string().required(),
            todate: yup.string().required(),
            checkin: yup.string().required(),
            advancepaid: yup.string().required(),
        }
    )

    const handleSelectChange = (selected, setFieldValue) => {
        const selectedValues = selected ? selected.map(option => option.value) : [];
        setUser({ ...user, rooms: selectedValues });
        setFieldValue('rooms', selectedValues);
        setSelectedRooms(selected);
    };

    //AMOUNT AND ROOM CALCUATION

    let ratePerRoomPerDay = 7000

    useEffect(() => {
        if (user.fromdate && user.todate && selectedRooms.length) {
            const fromDate = new Date(user.fromdate);
            const toDate = new Date(user.todate);
            const days = Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24)) + 1;


            const calculatedAmount = days * selectedRooms.length * ratePerRoomPerDay;
            setUser({ ...user, totalamount: calculatedAmount });
        } else {
            setUser({ ...user, totalamount: 0 });
        }
    }, [user.fromdate, user.todate, selectedRooms]);




    return (
        <div className='conttt'>
            <div className='body' style={{backgroundColor : "#415A77"}}>
                <Formik initialValues={user}
                    validationSchema={schema} enableReinitialize
                    onSubmit={handleSubmit}>
                    {({ handleChange, handleSubmit, setFieldValue }) => (
                        <Form className='forrmm' style={{ boxShadow : "1px 2px 10px 5px black", backgroundColor : "#E0E1DD"}} onSubmit={handleSubmit}  >
                            <h1 style={{ marginBottom: '30px', color : "black" }}>Room Info</h1>
                            <div className='date'>
                                <div className='froms'>
                                    <Form.Label className="froomm">  From:</Form.Label>
                                    <Form.Control type="date" name="fromdate" value={user.fromdate}
                                        onChange={(e) => {
                                            handleInput(e);
                                            handleChange(e);
                                        }} />
                                    <ErrorMessage
                                        name="fromdate"
                                        component="div"
                                        className="error2"
                                    />
                                </div>
                                <div className='To'>
                                    <Form.Label className="too">  To:</Form.Label>
                                    <Form.Control type="date" name="todate" value={user.todate} onChange={(e) => {
                                        handleInput(e);
                                        handleChange(e);
                                    }} />
                                    <ErrorMessage
                                        name="todate"
                                        component="div"
                                        className="error2"
                                    />
                                </div>
                            </div>
                            <div className='combine_Room_check' >
                                <div className='RoomContent'>
                                    {/* <label for="room" >Rooms</label> */}
                                    {/* <Select
                                        isMulti
                                        rooms={rooms}
                                        value={rooms.filter(rooms => user.rooms.includes(rooms.value))}
                                        onChange={selected => handleSelectChange(selected, setFieldValue)}
                                        placeholder="Select rooms..."
                                        className='multiSelect'
                                    /> */}
                                    <Form.Group className="mb-3" controlId="rooms">
                                        <Form.Label>Rooms:</Form.Label>
                                        <Select
                                            isMulti
                                            options={rooms}
                                            value={selectedRooms}
                                            onChange={selected => handleSelectChange(selected, setFieldValue)}
                                            placeholder="Select rooms"
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                        />
                                        <ErrorMessage name="rooms" component="div" className="text-danger" />
                                    </Form.Group>
                                    {/* <ErrorMessage
                                        name="room"
                                        component="div"
                                        className="error2"
                                    /> */}
                                </div>
                                <div className='check' >
                                    <div className='checkkk' >  <Form.Label>Check in Time</Form.Label>
                                        <Form.Control type='time' name='checkin' value={user.checkin} onChange={(e) => {
                                            handleInput(e);
                                            handleChange(e);
                                        }} />
                                    </div>
                                    <div>
                                        <ErrorMessage
                                            name="checkin"
                                            component="div"
                                            className="error2"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='content_total_paid'>
                                <div className='paidd' >
                                    <div>
                                        <div className='contetn_Total' >
                                            <Form.Label>Totalamount</Form.Label>
                                            <Form.Control name='totalamount'
                                                // value={user.rooms && user.rooms.length * 7000}
                                                value={user.totalamount}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className='total_paid' >
                                            <Form.Label>Discount</Form.Label>
                                            <Form.Control name='discountamount' value={user.discountamount} onChange={(e) => {
                                                handleInput(e);
                                                handleChange(e);
                                            }} />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className='content_total_paid'>
                                <div className='paidd' >
                                    <div>
                                        <div className='contetn_Total' >
                                            <Form.Label>Final amount</Form.Label>
                                            <Form.Control name='finalamount'
                                                // value={user.rooms && (user.rooms.length * 7000) - (user.discountamount)} 
                                                value={user.rooms &&
                                                    user.totalamount - Number(user.discountamount)}
                                                onChange={(e) => { handleInput(e); handleChange(e); }}

                                                disabled

                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className='total_paid' >
                                            <Form.Label>Paid</Form.Label>
                                            <Form.Control name='advancepaid' value={user.advancepaid} onChange={(e) => {
                                                handleInput(e);
                                                handleChange(e);
                                            }} />
                                        </div>
                                        <ErrorMessage
                                            name="advancepaid"
                                            component="div"
                                            className="error2"
                                        />
                                    </div>

                                </div>
                            </div>

                            <div>
                                <div className='contetn_Total' >
                                    <Form.Label>Balance amount</Form.Label>
                                    <Form.Control name='finalamount'
                                        // value={user.rooms.length * 7000 - user.discountamount - user.advancepaid} 
                                        value={
                                            user.rooms &&
                                            user.totalamount - Number(user.discountamount) - Number(user.advancepaid)}
                                        onChange={(e) => { handleInput(e); handleChange(e); }}

                                        disabled
                                    />
                                </div>

                                <div className='total_paid' >
                                    <Form.Label>Paid On</Form.Label>
                                    <Form.Control name='paidon' type="Date" value={user.paidon} onChange={(e) => {
                                        handleInput(e);
                                        handleChange(e);
                                    }} />
                                </div>

                            </div>






                            <div className='payment_erro'  >
                                <div className='contetn_payment' >
                                    <Form.Label>Payment Mode</Form.Label>
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
                            <div className='save_button' >
                                <Button type='submit'>Save</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default RoomInfo