import React, { useContext, useState, useEffect } from 'react';
import { ErrorMessage, Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { userContex } from '../Home/Home';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import Dashboard from '../Home/Homepage';
import DataTable from 'react-data-table-component';
import Select from 'react-select';
import './roomwise.css';

const RoomwiseClientReport = () => {
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
        setId,
    ] = useContext(userContex);

    const [roomwiseClient, setRoomwiseClient] = useState({
        rooms: [],
        fromDate: '',
        toDate: '',
    });

    const [rooms, setRooms] = useState([]);
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [roomwiseAllClient, setRoomwiseAllClient] = useState([]);

    useEffect(() => {
        axios
            .get('http://49.204.232.254:91/room/getalldata')
            .then((res) => {
                const roomOptions = res.data.data.map((room) => ({
                    value: room.roomId,
                    label: room.roomName,
                }));
                setRooms(roomOptions);
            })
            .catch((err) => console.error('Error fetching rooms:', err));

        const today = new Date();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        const formatDate = (date) => {
            let d = new Date(date);
            let month = '' + (d.getMonth() + 1);
            let day = '' + d.getDate();
            let year = d.getFullYear();
            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            return [year, month, day].join('-');
        };

        setRoomwiseClient({
            ...roomwiseClient,
            fromDate: formatDate(firstDayOfMonth),
            toDate: formatDate(lastDayOfMonth),
        });
    }, []);

    const schema = yup.object().shape({
        fromDate: yup.string().required('From date is required'),
        toDate: yup.string().required('To date is required'),
        rooms: yup.array().min(1, 'At least one room must be selected').required('Rooms are required'),
    });

    const handleSelectChange = (selected, setFieldValue) => {
        const selectedValues = selected ? selected.map((option) => option.value) : [];
        setFieldValue('rooms', selectedValues);
        setSelectedRooms(selected);
        setRoomwiseClient((prevState) => ({
            ...prevState,
            rooms: selectedValues,
        }));
    };

    const handleSubmit = () => {
        const data = {
            roomId: roomwiseClient.rooms.join(''),
            startDate: roomwiseClient.fromDate,
            endDate: roomwiseClient.toDate,
        };

        axios
            .post('http://49.204.232.254:91/report/roomwiseclient', data)
            .then((res) => {
                console.log(res.data)
                setRoomwiseAllClient(res.data.data);
            });
    };

    const columns = [
        { name: 'From Date', selector: (data) => new Date(data.fromdate).toISOString().substring(0, 10) },
        { name: 'To Date', selector: (data) => new Date(data.todate).toISOString().substring(0, 10) },
        { name: 'Client Name', selector: (data) => data.clientName },
        { name: 'Gender', selector: (data) => data.gender },
        { name: 'Mobile No', selector: (data) => data.mobileNo },
        { name: 'Room Name', selector: (data) => data.roomName },
        { name: 'Adult', selector: (data) => data.adult },
        { name: 'Children', selector: (data) => data.children },
        { name: 'Time', selector: (data) => data.time },
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
                padding: "10px",
            }
        },
        cells: {
            style: {
                fontSize: "14px",
                textAlign: "center",
                padding: "25px",
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
        <div style={{ backgroundColor: "#415A77" }}>
            <div style={{ padding: "10px" }}></div>
            <div className="monthly-report-container" style={{backgroundColor : "#E0E1DD",boxShadow: "1px 2px 10px 5px black"}}>
                <Formik
                    initialValues={roomwiseClient}
                    validationSchema={schema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ handleSubmit, handleChange, setFieldValue }) => (
                        <form className="report-form" onSubmit={handleSubmit}>
                            <div className="header">
                                <IoArrowBackCircleOutline onClick={() => setComponent(<Dashboard />)} className="back-icon" />
                                <h3>Roomwise Client Report</h3>
                            </div>

                            <div className="form-group">
                                <div className="date-picker">
                                    <label htmlFor="fromDate">From:</label>
                                    <input type="date" name="fromDate" value={roomwiseClient.fromDate} onChange={(e) => { handleChange(e); }} />
                                    <ErrorMessage name="fromDate" component="div" className="error" />
                                </div>
                                <div className="date-picker">
                                    <label htmlFor="toDate">To:</label>
                                    <input type="date" name="toDate" value={roomwiseClient.toDate} onChange={(e) => { handleChange(e); }} />
                                    <ErrorMessage name="toDate" component="div" className="error" />
                                </div>
                            </div>

                            <div className="form-group" style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems : "center" }}>
                                <label htmlFor="rooms" style={{ marginBottom: '8px', fontSize: '16px', fontWeight: 'bold' }}>Rooms:</label>
                                <Select
                                    isMulti
                                    options={rooms}
                                    value={selectedRooms}
                                    onChange={(selected) => handleSelectChange(selected, setFieldValue)}
                                    placeholder="Select rooms"
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    styles={{
                                        control: (base) => ({
                                            ...base,
                                            minHeight: '40px',
                                            borderColor: '#ccc',
                                            boxShadow: 'none',
                                            '&:hover': {
                                                borderColor: '#3C4A72',
                                            },
                                        }),
                                        multiValue: (base) => ({
                                            ...base,
                                            backgroundColor: '#3C4A72',
                                            color: 'white',
                                        }),
                                        multiValueLabel: (base) => ({
                                            ...base,
                                            color: 'white',
                                            fontSize: '14px',
                                        }),
                                        multiValueRemove: (base) => ({
                                            ...base,
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: '#2a3a56',
                                            },
                                        }),
                                    }}
                                />
                                <ErrorMessage name="rooms" component="div" className="error" style={{ color: 'red', marginTop: '5px' }} />
                            </div>

                            <button type="submit" className="submit-btn">Submit</button>

                            {roomwiseAllClient.length > 0 && (
                                <div className="data-table-container">
                                    <DataTable
                                        data={roomwiseAllClient}
                                        columns={columns}
                                        customStyles={customStyles}
                                        pagination
                                        paginationPerPage={10}
                                    />
                                </div>
                            )}
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default RoomwiseClientReport;
