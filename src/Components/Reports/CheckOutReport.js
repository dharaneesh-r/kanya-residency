import React, { useContext, useState } from 'react';
import { ErrorMessage, Formik } from 'formik';
import * as yup from "yup";
import axios from 'axios';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { userContex } from '../Home/Home';
import Dashboard from '../Home/Homepage';
import DataTable from 'react-data-table-component';
import './checkout.css';

const CheckOutReport = () => {
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

    // Dynamically calculate the default start and end dates
    const today = new Date();
    const firstDayOfMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-01`;
    const lastDayOfMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()}`;

    const [checkoutdata, setCheckOutData] = useState([]);
    const [startDate, setStartDate] = useState(firstDayOfMonth);
    const [endDate, setEndDate] = useState(lastDayOfMonth);

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://49.204.232.254:91/report/checkoutdata', {
                startDate: startDate,
                endDate: endDate,
            });
            setCheckOutData(response.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    const schema = yup.object().shape({
        startDate: yup.string().required("Start date is required"),
        endDate: yup.string().required("End date is required"),
    });

    const columns = [
        { name: "From Date", selector: data => new Date(data.fromdate).toISOString().substring(0, 10) },
        { name: "To Date", selector: data => new Date(data.todate).toISOString().substring(0, 10) },
        { name: "Out Paid Amount", selector: data => data.outPaidAmt },
        { name: "Out Payment Mode", selector: data => data.outPaymentMode },
        { name: "Out Time", selector: data => data.outTime },
        { name: "Paid Amount", selector: data => data.paidamount },
        { name: "Payment Mode", selector: data => data.paymentmode },
        { name: "Room Name", selector: data => data.roomName },
        { name: "Status", selector: data => data.status },
        { name: "Time", selector: data => data.time }
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
        <div style={{ backgroundColor: "#415A77", placeContent: "center", height: "auto" }}>
            <div style={{ padding: "10px" }}></div>
            <div className="checkout-report-container" style={{ boxShadow: "0px 5px 10px black" }}>
                <Formik
                    initialValues={{ startDate: firstDayOfMonth, endDate: lastDayOfMonth }}
                    validationSchema={schema}
                    enableReinitialize
                    onSubmit={handleSubmit}
                >
                    {({ handleSubmit, handleChange, setFieldValue }) => (
                        <form className="report-form" onSubmit={handleSubmit}>
                            <div className="header">
                                <IoArrowBackCircleOutline onClick={() => setComponent(<Dashboard />)} className="back-icon" />
                                <h3>CheckOut Report</h3>
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
                                            setFieldValue("startDate", e.target.value);
                                        }}
                                    />
                                    <ErrorMessage name="startDate" component="div" className="error" />
                                </div>
                                <div className="date-picker">
                                    <label htmlFor="endDate">To:</label>
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={endDate}
                                        onChange={(e) => {
                                            setEndDate(e.target.value);
                                            setFieldValue("endDate", e.target.value);
                                        }}
                                    />
                                    <ErrorMessage name="endDate" component="div" className="error" />
                                </div>
                            </div>

                            <button type="submit" className="submit-btn">Search</button>

                            {checkoutdata.length > 0 && (
                                <div className="data-table-container">
                                    <DataTable
                                        data={checkoutdata}
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

export default CheckOutReport;
