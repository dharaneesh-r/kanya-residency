import React, { useContext, useState } from 'react';
import { ErrorMessage, Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import Dashboard from '../Home/Homepage';
import { userContex } from '../Home/Home';
import { Form } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import './dailycollection.css';

const DailyCollectionReport = () => {
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

    // Calculate today's date as default startDate
    const todayDate = new Date().toISOString().substring(0, 10);
    const [dailyCollectionReport, setDailyCollectionReport] = useState([]);
    const [startDate, setStartDate] = useState(todayDate);

    const handleSubmit = () => {
        axios
            .post('http://49.204.232.254:91/report/dailyCollection', {
                startDate: startDate,
            })
            .then((res) => {
                setDailyCollectionReport(res.data.data);
            });
    };

    let schema = yup.object().shape({
        startDate: yup.string().required('It should not be empty'),
    });

    let columns = [
        {
            name: 'From Date',
            selector: (data) => new Date(data.fromdate).toISOString().substring(0, 10),
        },
        {
            name: 'To Date',
            selector: (data) => new Date(data.todate).toISOString().substring(0, 10),
        },
        {
            name: 'Client Name',
            selector: (data) => data.name,
        },
        {
            name: 'Phone Number',
            selector: (data) => data.mobileno,
        },
        {
            name: 'Advance Paid',
            selector: (data) => data.advancepaid,
        },
        {
            name: 'Final Amount',
            selector: (data) => data.finalamount,
        },
        {
            name: 'Paid On',
            selector: (data) => data.paidOn,
        },
        {
            name: 'Payment Mode',
            selector: (data) => data.paymentmode,
        },
        {
            name: 'Room Name',
            selector: (data) => data.roomName,
        },
        {
            name: 'Status',
            selector: (data) => data.status,
        },
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
            <div style={{ padding: "20px" }}>
                <div className="daily-collection-report-container" style={{ boxShadow: "1px 2px 10px 5px black" }}>
                    <div className="form-container">
                        <Formik
                            initialValues={{ startDate: todayDate }}
                            validationSchema={schema}
                            enableReinitialize
                            onSubmit={handleSubmit}
                        >
                            {({ handleSubmit, handleChange }) => (
                                <Form className="report-form" onSubmit={handleSubmit}>
                                    <div className="header">
                                        <IoArrowBackCircleOutline
                                            onClick={() => setComponent(<Dashboard />)}
                                            className="back-icon"
                                        />
                                        <h3>Daily Collection Report</h3>
                                    </div>

                                    <div className="form-group">
                                        <div className="date-picker">
                                            <label htmlFor="startDate">From:</label>
                                            <input
                                                type="date"
                                                name="startDate"
                                                value={startDate}
                                                onChange={(e) => {
                                                    setStartDate(e.target.value);
                                                    handleChange(e);
                                                }}
                                            />
                                            <ErrorMessage name="startDate" component="div" className="error" />
                                        </div>
                                    </div>

                                    <button type="submit" className="submit-btn">
                                        Search
                                    </button>

                                    <div className="data-table-container">
                                        <DataTable
                                            data={dailyCollectionReport}
                                            columns={columns}
                                            customStyles={customStyles}
                                            pagination
                                            paginationPerPage={10}
                                        />
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DailyCollectionReport;

