import React, { useContext, useState } from 'react';
import './roomstatus.css';
import { ErrorMessage, Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import RoomCheckOut from './RoomCheckOut';
import { userContex } from '../Home/Home';

const RoomStatus = () => {
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
    ] = useContext(userContex);

    // Calculate default start and end dates
    const today = new Date();
    const firstDayOfMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-01`;
    const lastDayOfMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()}`; // Last day of the current month

    const [searchDate, setSearchDate] = useState([]);
    const [startDate, setStartDate] = useState(firstDayOfMonth);
    const [endDate, setEndDate] = useState(lastDayOfMonth);

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://49.204.232.254:91/report/roominfostatus', {
                startDate: startDate,
                endDate: endDate,
            });
            console.log(response);
            setSearchDate(response.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCheckout = (roomInfoId, clientId) => {
        setComponent(<RoomCheckOut roomInfoId={roomInfoId} clientId={clientId} />);
    };

    const schema = yup.object().shape({
        startDate: yup.string().required("Start date is required"),
        endDate: yup.string().required("End date is required"),
    });

    const columns = [
        { name: "From Date", selector: data => new Date(data.fromdate).toISOString().substring(0, 10) },
        { name: "To Date", selector: data => new Date(data.todate).toISOString().substring(0, 10) },
        { name: "Client Name", selector: data => data.clientName },
        { name: "Gender", selector: data => data.gender },
        { name: "Mobile Number", selector: data => data.mobileNo },
        { name: "Paid Amount", selector: data => data.paidamount },
        { name: "Adult", selector: data => data.adult },
        { name: "Children", selector: data => data.children },
        { name: "Room Name", selector: data => data.roomName },
        { name: "Time", selector: data => data.time },
        { name: "Checkout", selector: data => <Button className='room-button-design' onClick={() => handleCheckout(data.roomInfoId, data.clientId)}>Checkout</Button> }
    ];

    const customStyles = {
        headRow: {
            style: {
                backgroundColor: "#3C4A72",
                color: "white",
                textAlign: "center",
                fontWeight: "bold",
            }
        },
        headCells: {
            style: {
                color: "white",
                fontSize: "14px",
                fontWeight: "bold",
                mariginLeft: "20px",
                marginRight: "20px",
            }
        },
        cells: {
            style: {
                fontSize: "14px",
                textAlign: "center",
                padding: "10px",
            }
        },
        pagination: {
            style: {
                display: 'flex',
                justifyContent: 'center',
                padding: '10px',
            }
        }
    };

    return (
        <div className='bookstatus'>
            <div className='mobile-container'>
                <div className='formContent' style={{ backgroundColor: "#E0E1DD", boxShadow: "1px 2px 10px 5px black" }}>
                    <h2 style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        color: "#333",
                        textAlign: "center",
                        marginBottom: "20px",
                        textTransform: "uppercase",
                        letterSpacing: "1px"
                    }}>
                        ROOM STATUS
                    </h2>

                    <Formik
                        initialValues={{ startDate: firstDayOfMonth, endDate: lastDayOfMonth }}
                        validationSchema={schema}
                        enableReinitialize
                        onSubmit={handleSubmit}
                    >
                        {({ handleSubmit, handleChange, setFieldValue }) => (
                            <form className='form-section' onSubmit={handleSubmit}>
                                <div className='date-field'>
                                    <label htmlFor="from">From:</label>
                                    <input
                                        type="date"
                                        className='form-control'
                                        name="startDate"
                                        value={startDate}
                                        onChange={(e) => {
                                            setStartDate(e.target.value);
                                            setFieldValue("startDate", e.target.value);
                                        }}
                                    />
                                    <ErrorMessage name="startDate" component="div" className="error1" />
                                </div>
                                <br />
                                <div className='date-field'>
                                    <label htmlFor="to">To:</label>
                                    <input
                                        type="date"
                                        className='form-control'
                                        name="endDate"
                                        value={endDate}
                                        onChange={(e) => {
                                            setEndDate(e.target.value);
                                            setFieldValue("endDate", e.target.value);
                                        }}
                                    />
                                    <ErrorMessage name="endDate" component="div" className="error1" />
                                </div>
                                <div className='save-button'>
                                    <button type="submit">Search</button>
                                </div>
                            </form>
                        )}
                    </Formik>
                    <div className='room-status-table'>
                        <DataTable
                            data={searchDate}
                            customStyles={customStyles}
                            columns={columns}
                            pagination
                            paginationPerPage={10}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomStatus;
