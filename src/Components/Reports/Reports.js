import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import "./Reports.css"
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { userContex } from '../Home/Home';
import Dashboard from '../Home/Homepage';
import DataTable from 'react-data-table-component';

const Reports = () => {

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

    const [getReports, setGetReports] = useState([])

    useEffect(() => {
        axios.get("http://49.204.232.254:91/report/clientpendingamt").then((res) => {
            console.log(res.data.data)
            setGetReports(res.data.data)
        })
    }, [])

    let customStyles = {
        headRow: {
            style: {
                backgroundColor: "#3C4A72",  // Consistent color scheme
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }
        },
        headCells: {
            style: {
                fontSize: "15px",
                fontWeight: "600",
                width: "150px",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }
        },
        cells: {
            style: {
                fontSize: "15px",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
            }
        }
    }

    let column = [{
        name: "From Date",
        selector: data => new Date(data.fromdate).toISOString().substring(0, 10)
    }, {
        name: "To Date",
        selector: data => new Date(data.todate).toISOString().substring(0, 10)
    }, {
        name: "Client Name",
        selector: data => data.clientName
    }, {
        name: "Gender",
        selector: data => data.gender
    }, {
        name: "Mobile No",
        selector: data => data.mobileNo
    }, {
        name: "Final Amount",
        selector: data => data.finalamount
    }, {
        name: "Paid Amount",
        selector: data => data.paidamount
    }, {
        name: "Adult",
        selector: data => data.adult
    }, {
        name: "Children",
        selector: data => data.children
    }, {
        name: "Time",
        selector: data => data.time
    }]

    return (
        <>
            <div style={{ padding: "20px" }}></div>
            <div className='daily-collection-report-container' style={{backgroundColor : "#E0E1DD",boxShadow: "0px 5px 10px black"}}>
                <div>
                    <h3>
                        <IoArrowBackCircleOutline
                            onClick={() => setComponent(<Dashboard />)}
                            style={{ float: "left", cursor: "pointer" }}
                        />
                        CLIENT PENDING PAYMENT REPORT
                    </h3>
                    <div className='client-data-box'>
                        <DataTable
                            data={getReports}
                            columns={column}
                            customStyles={customStyles}
                            pagination
                            paginationPerPage={10}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reports;
