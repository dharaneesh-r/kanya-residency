import React, { useContext, useState } from 'react'
import { ErrorMessage, Formik } from 'formik'
import * as yup from "yup"
import axios from 'axios'
import { userContex } from '../Home/Home'
import { IoArrowBackCircleOutline } from 'react-icons/io5'
import Dashboard from '../Home/Homepage'
import DataTable from 'react-data-table-component'
import "./monthly.css"

const MonthlyCollectionReport = () => {

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

    const defaultStartDate = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-01`;

    const lastDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    const defaultEndDate = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(lastDayOfMonth).padStart(2, '0')}`;

    const [checkoutdata, setCheckOutData] = useState([])
    const [startDate, setStartDate] = useState(defaultStartDate)
    const [endDate, setEndDate] = useState(defaultEndDate)

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://49.204.232.254:91/report/monthlyCollection', {
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
        { name: "Client Name", selector: data => data.name },
        { name: "Phone Number", selector: data => data.mobileno },
        { name: "Room Name", selector: data => data.roomName },
        { name: "Paid On", selector: data => data.paidOn },
        { name: "Advance Paid", selector: data => data.advancepaid },
        { name: "Payment Mode", selector: data => data.paymentmode },
        { name: "Final Amount", selector: data => data.finalamount },
        { name: "Status", selector: data => data.status }
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
            <div className="monthly-report-container" style={{ backgroundColor: "E0E1DD", boxShadow: "1px 2px 10px 5px black" }}>
                <Formik initialValues={{ startDate: defaultStartDate, endDate: defaultEndDate }} validationSchema={schema} enableReinitialize onSubmit={handleSubmit}>
                    {({ handleSubmit, handleChange }) => (
                        <form className="report-form" onSubmit={handleSubmit}>
                            <div className="header">
                                <IoArrowBackCircleOutline onClick={() => setComponent(<Dashboard />)} className="back-icon" />
                                <h3>Monthly Collection Report</h3>
                            </div>

                            <div className="form-group">
                                <div className="date-picker">
                                    <label htmlFor="startDate">From:</label>
                                    <input type="date" name="startDate" value={startDate} onChange={(e) => { setStartDate(e.target.value); handleChange(e) }} />
                                    <ErrorMessage name="startDate" component="div" className="error" />
                                </div>
                                <div className="date-picker">
                                    <label htmlFor="endDate">To:</label>
                                    <input type="date" name="endDate" value={endDate} onChange={(e) => { setEndDate(e.target.value); handleChange(e) }} />
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
}

export default MonthlyCollectionReport;
