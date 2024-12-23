import React, { createContext, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import './Homedemo.css'
import View from "../View/View"
import 'bootstrap/dist/css/bootstrap.min.css';
import { AdvanceBooking } from '../AdvanceBooking/AdvanceBooking';
import AddNewBooking from '../AddNewBooking/AddNewBooking';
import RoomInfo from '../RoomInfo/RoomInfo';
import 'bootstrap-icons/font/bootstrap-icons.css'
import ClientInfo from '../ClientInfo/ClientInfo';
import Homepage from './Homepage';
import { MdOutlineFiberNew } from "react-icons/md";
import { FaStackExchange } from "react-icons/fa";
import Clientdetails from '../Clientdetails/Clientdetails';
import { MdOutlineApartment } from "react-icons/md";
import Reports from '../Reports/Reports';
import AdBookingPending from '../Reports/AdBookingPending';
import RoomStatus from '../RoomInfo/RoomStatus';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Dashboard from './Homepage';
import Roomwiseclientreport from '../Reports/RoomWiseClientReport';
import { SlPeople } from "react-icons/sl";
import { MdApartment } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { FaRupeeSign } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { MdOutlineWorkHistory } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoBagCheckOutline } from "react-icons/io5";
import { BiCollection } from "react-icons/bi";
import CheckOutReport from '../Reports/CheckOutReport';
import DailyCollectionReport from '../Reports/DailyCollectionReport';
import { useNavigate } from 'react-router-dom';
import { IoMdLogOut } from "react-icons/io";
import { MdOutlineEventAvailable } from "react-icons/md";
import AddRooms from '../RoomInfo/AddRooms';
import { FaHome } from "react-icons/fa";
import MonthlyCollectionReport from '../Reports/MonthlyCollectionReport';
import RoomDetails from '../RoomInfo/RoomDetails';
export let userContex = createContext()


function Home() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [advance, setAdvance] = useState("")
    let [component, setComponent] = useState(<Dashboard />)
    const [selectedOption, setSelectedOption] = useState('select');
    let [select, setSelect] = useState('new')
    let [ClientId, setClientId] = useState('')
    let [id, setId] = useState('')
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    let user = sessionStorage.getItem('username')

    //NAVIGATE HOOK

    const navigate = useNavigate()

    //LOGOUT 

    const logout = () => {
        sessionStorage.clear(user)
        navigate("/")
    }

    return (
        <div>
            <userContex.Provider value={[
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
            ]}>
                <nav className="navbar">

                    <div className="navbar-container">
                        <div>

                            <div style={{ margin: "10px" }}>
                                <a
                                    href="#dashboard"
                                    className={activeTab === 'dashboard' ? 'active' : ''} style={{ textDecoration: "none" }}
                                    onClick={() => { setActiveTab('dashboard'); setComponent(<Dashboard />) }}
                                >
                                    <span><div className='spanx'>KANYA RESIDENCY</div></span>
                                </a>
                            </div>
                        </div>
                        <div className='navwrap'>
                            <ul className="nav-links">
                                <li className='link-heading'>
                                    <a
                                        href="#dashboard"
                                        className={activeTab === 'dashboard' ? 'active' : ''}
                                        onClick={() => { setActiveTab('dashboard'); setComponent(<Dashboard />) }}
                                    >
                                        Home
                                    </a>
                                </li>
                                <li className='link-heading'>
                                    <a
                                        href="#add-booking"
                                        className={activeTab === 'add-booking' ? 'active' : ''}
                                        onClick={() => { setActiveTab('add-booking'); setComponent(<AddNewBooking />) }}
                                        style={{ marginLeft: "5px" }}
                                    >
                                        New
                                    </a>
                                </li>
                                <li className='link-heading'>
                                    <a
                                        href="#advance-booking"
                                        className={activeTab === 'advance-booking' ? 'active' : ''}
                                        onClick={() => { setActiveTab('advance-booking'); setComponent(<AdvanceBooking />) }}
                                    >
                                        Advance
                                    </a>
                                </li>
                                <li className='link-heading'>
                                    <a
                                        href="#RoomStatus"
                                        className={activeTab === 'RoomStatus' ? 'active' : ''}
                                        onClick={() => {
                                            setActiveTab('RoomStatus'); setComponent(<RoomStatus />

                                            )
                                        }}
                                    >
                                        <div class="dropdown">
                                            Room Status
                                        </div>
                                    </a>
                                </li>



                            </ul>

                            <div className="dropdown-burger">
                                <div onClick={handleShow} style={{
                                    cursor: 'pointer', color: "white", paddingTop: "10px"
                                }}>
                                    <GiHamburgerMenu size="26" style={{ marginBottom: "10px" }} />
                                </div>

                                <Offcanvas show={show} onHide={handleClose} style={{ backgroundColor: "#E0E1DD" }}>
                                    <Offcanvas.Header closeButton>
                                        <Offcanvas.Title style={{ fontWeight: "bold" }}>KANYA RESIDENCY<br />Welcome {user}</Offcanvas.Title>
                                    </Offcanvas.Header>
                                    <Offcanvas.Body>
                                        <div style={{ marginTop: '20px' }}>
                                            <div style={{ marginBottom: '10px', backgroundColor: "black", paddingLeft: "10px", paddingRight: "10px", borderRadius: "10px", paddingTop: "10px", paddingBottom: "10px", fontSize: "20px" }}>
                                                <a
                                                    href="#dashboard"
                                                    className={activeTab === 'dashboard' ? 'active' : ''}
                                                    onClick={() => { setActiveTab('dashboard'); setComponent(<Dashboard />) 
                                                        handleClose()
                                                    }}
                                                >
                                                    <div class="dropdown" style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                                                        <FaHome /> Home
                                                    </div>
                                                </a>
                                            </div>

                                            <div style={{ marginBottom: '10px', backgroundColor: "black", paddingLeft: "10px", paddingRight: "10px", borderRadius: "10px", paddingTop: "10px", paddingBottom: "10px", fontSize: "20px" }}>
                                                <a
                                                    href="#add-booking"
                                                    className={activeTab === 'add-booking' ? 'active' : ''}
                                                    onClick={() => { setActiveTab('add-booking'); setComponent(<AddNewBooking />) 
                                                        handleClose()
                                                    }}
                                                >
                                                    <div class="dropdown" style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                                                        <MdOutlineWorkHistory /> New
                                                    </div>
                                                </a>
                                            </div>
                                            <div style={{ marginBottom: '10px', backgroundColor: "black", paddingLeft: "10px", paddingRight: "10px", borderRadius: "10px", paddingTop: "10px", paddingBottom: "10px", fontSize: "20px" }}>
                                                <a
                                                    href="#advance-booking"
                                                    className={activeTab === 'advance-booking' ? 'active' : ''}
                                                    onClick={() => { setActiveTab('advance-booking'); setComponent(<AdvanceBooking />) 

                                                        handleClose()
                                                    }}
                                                >
                                                    <div class="dropdown" style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                                                        <FaRegEye /> Advance
                                                    </div>
                                                </a>
                                            </div>


                                            <div style={{ marginBottom: '10px', backgroundColor: "black", paddingLeft: "10px", paddingRight: "10px", borderRadius: "10px", paddingTop: "10px", paddingBottom: "10px", fontSize: "20px" }}>
                                                <a
                                                    href="#RoomStatus"
                                                    className={activeTab === 'RoomStatus' ? 'active' : ''}
                                                    onClick={() => {
                                                        setActiveTab('RoomStatus'); setComponent(<RoomStatus />

                                                        )
                                                        handleClose()
                                                    }}
                                                >
                                                    <div class="dropdown" style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                                                        <MdOutlineApartment /> Room Status
                                                    </div>
                                                </a>
                                            </div>
                                            <div style={{ marginBottom: '10px', backgroundColor: "black", paddingLeft: "10px", paddingRight: "10px", borderRadius: "10px", paddingTop: "10px", paddingBottom: "10px", fontSize: "20px" }}>
                                                <a
                                                    href="#view-booking"
                                                    style={{ textDecoration: "none", color: "white" }}
                                                    onClick={() => {
                                                        setActiveTab('view-booking'); setComponent(<View />

                                                        )
                                                        handleClose()
                                                    }}
                                                >
                                                    <div class="dropdown" style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                                                        <FaRegEye /> View
                                                    </div>
                                                </a>
                                            </div>

                                            <div style={{ marginBottom: '10px', backgroundColor: "black", paddingLeft: "10px", paddingRight: "10px", borderRadius: "10px", paddingTop: "10px", paddingBottom: "10px", fontSize: "20px" }}>
                                                <a
                                                    href="#clientdetails"
                                                    style={{ textDecoration: "none", color: "white" }}
                                                    onClick={() => {
                                                        setActiveTab('clientdetails'); setComponent(<Clientdetails />

                                                        )
                                                        handleClose()

                                                    }}
                                                >
                                                    <div class="dropdown" style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                                                        <TbListDetails /> Client Details
                                                    </div>
                                                </a>
                                            </div>



                                            <div style={{ marginBottom: '10px', backgroundColor: "black", paddingLeft: "10px", paddingRight: "10px", borderRadius: "10px", paddingTop: "10px", paddingBottom: "10px", fontSize: "20px" }}><a
                                                href="#AddRooms"
                                                style={{ textDecoration: "none", color: "white" }}
                                                onClick={() => {
                                                    setActiveTab('AddRooms'); setComponent(<AddRooms />

                                                    )
                                                    handleClose()

                                                }}
                                            >
                                                <div class="dropdown" style={{ paddingLeft: "5px" }}>
                                                    <MdOutlineEventAvailable /> Rooms
                                                </div>
                                            </a>
                                            </div>
                                            <div style={{ marginBottom: '10px', backgroundColor: "black", paddingLeft: "10px", paddingRight: "10px", borderRadius: "10px", paddingTop: "10px", paddingBottom: "10px", fontSize: "20px" }}><a
                                                href="#RoomDetails"
                                                style={{ textDecoration: "none", color: "white" }}
                                                onClick={() => {
                                                    setActiveTab('RoomDetails'); setComponent(<RoomDetails />

                                                    )
                                                    handleClose()

                                                }}
                                            >
                                                <div class="dropdown" style={{ paddingLeft: "5px" }}>
                                                    <MdOutlineEventAvailable /> Room Details
                                                </div>
                                            </a>
                                            </div>

                                            <div style={{ marginBottom: '10px', backgroundColor: "black", paddingLeft: "10px", paddingRight: "10px", borderRadius: "10px", paddingTop: "10px", paddingBottom: "10px", fontSize: "20px" }}>
                                                <a
                                                    href="#reports"
                                                    style={{ textDecoration: "none", color: "white" }}
                                                    onClick={() => {
                                                        setActiveTab('Reports'); setComponent(<Reports />

                                                        )
                                                        handleClose()

                                                    }}
                                                >
                                                    <div class="dropdown" style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                                                        <SlPeople /> Client Pending Reports
                                                    </div>
                                                </a>
                                            </div>


                                            <div style={{ marginBottom: '10px', backgroundColor: "black", paddingLeft: "10px", paddingRight: "10px", borderRadius: "10px", paddingTop: "10px", paddingBottom: "10px", fontSize: "20px" }}><a
                                                href="#AdBookingPending"
                                                style={{ textDecoration: "none", color: "white" }}
                                                onClick={() => {
                                                    setActiveTab('AdBookingPending'); setComponent(<AdBookingPending />

                                                    )
                                                    handleClose()

                                                }}

                                            >
                                                <div class="dropdown" style={{ paddingLeft: "5px" }}>
                                                    <FaRupeeSign /> Advance Payment Pending Reports
                                                </div>
                                            </a>
                                            </div>

                                            <div style={{ marginBottom: '10px', backgroundColor: "black", paddingLeft: "10px", paddingRight: "10px", borderRadius: "10px", paddingTop: "10px", paddingBottom: "10px", fontSize: "20px" }}>
                                                <a
                                                    href="#roomwiseclientreport"
                                                    style={{ textDecoration: "none", color: "white" }}
                                                    onClick={() => {
                                                        setActiveTab('roomwiseclientreport'); setComponent(<Roomwiseclientreport />

                                                        )
                                                        handleClose()

                                                    }}
                                                >
                                                    <div class="dropdown" style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                                                        <MdApartment /> Room Wise Client Report
                                                    </div>
                                                </a>
                                            </div>

                                            <div style={{ marginBottom: '10px', backgroundColor: "black", paddingLeft: "10px", paddingRight: "10px", borderRadius: "10px", paddingTop: "10px", paddingBottom: "10px", fontSize: "20px" }}><a
                                                href="#checkoutreport"
                                                style={{ textDecoration: "none", color: "white" }}
                                                onClick={() => {
                                                    setActiveTab('checkoutreport'); setComponent(<CheckOutReport />

                                                    )
                                                    handleClose()

                                                }}
                                            >
                                                <div class="dropdown" style={{ paddingLeft: "5px" }}>
                                                    <IoBagCheckOutline /> Checkout Reports
                                                </div>
                                            </a>
                                            </div>
                                            <div style={{ marginBottom: '10px', backgroundColor: "black", paddingLeft: "10px", paddingRight: "10px", borderRadius: "10px", paddingTop: "10px", paddingBottom: "10px", fontSize: "20px" }}><a
                                                href="#dailycollectionreport"
                                                style={{ textDecoration: "none", color: "white" }}
                                                onClick={() => {
                                                    setActiveTab('dailycollectionreport'); setComponent(<DailyCollectionReport />

                                                    )
                                                    handleClose()

                                                }}
                                            >
                                                <div class="dropdown" style={{ paddingLeft: "5px" }}>
                                                    <BiCollection /> Daily Collection Report
                                                </div>
                                            </a>
                                            </div>


                                            <div style={{ marginBottom: '10px', backgroundColor: "black", paddingLeft: "10px", paddingRight: "10px", borderRadius: "10px", paddingTop: "10px", paddingBottom: "10px", fontSize: "20px" }}><a
                                                href="#MonthlyCollectionReport"
                                                style={{ textDecoration: "none", color: "white" }}
                                                onClick={() => {
                                                    setActiveTab('MonthlyCollectionReport'); setComponent(<MonthlyCollectionReport />

                                                    )
                                                    handleClose()

                                                }}
                                            >
                                                <div class="dropdown" style={{ paddingLeft: "5px" }}>
                                                    <BiCollection /> Monthly Collection Report
                                                </div>
                                            </a>
                                            </div>

                                            <button style={{ paddingRight: "10px", paddingLeft: "10px", paddingTop: "10px", paddingBottom: "10px", borderRadius: "10px", backgroundColor: "black", color: "white", marginTop: "10px" }}
                                                onClick={logout}
                                            > <IoMdLogOut /> LOGOUT</button>
                                        </div>
                                    </Offcanvas.Body>
                                </Offcanvas>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="body-content">
                    {component}
                </div>
            </userContex.Provider>
        </div>
    )
}

export default Home