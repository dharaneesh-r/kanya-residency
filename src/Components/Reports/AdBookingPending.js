import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import "./adbookingpending.css"
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { userContex } from '../Home/Home';
import Dashboard from '../Home/Homepage';
import DataTable from 'react-data-table-component';

const AdBookingPending = () => {

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

    const [advanceBooking, setAdvanceBooking] = useState([])

    useEffect(() => {
        axios.get("http://49.204.232.254:91/report/advancebookingpendingamt").then((res) => {
            console.log(res.data.data)
            setAdvanceBooking(res.data.data)
        })
    }, [])
    
    let column = [
        {
            name: "From Date",
            selector: data => new Date(data.fromdate).toISOString().substring(0,10),
            sortable: true
        }, {
            name: "To Date",
            selector: data => new Date(data.todate).toISOString().substring(0,10),
        }, {
            name: "Name",
            selector: data => data.name
        },{
            name : "Room Name",
            selector : data => data.roomName
        },{
            name : "Advance Paid",
            selector : data => data.advancepaid
        },{
            name : "Balance Amount",
            selector : data => data.balanceamount
        }
    ]

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
        < div style={{backgroundColor: "#415A77",boxShadow: "1px 2px 10px 5px black"}}>
            <div style={{padding : "20px"}}></div>
            <div className='ad-booking-report-container' style={{backgroundColor : "#E0E1DD",boxShadow : "1px 2px 10px 5px black"}}>
            <div>
                <h3>
                    <IoArrowBackCircleOutline onClick={() => setComponent(<Dashboard />)} style={{ float: "left", cursor: "pointer", fontSize: "30px", marginRight: "10px" }} />
                    ADVANCE PAYMENT PENDING REPORT
                </h3>
                <div className='ad-booking-data-box'>
                    <DataTable 
                        data={advanceBooking}
                        customStyles={customStyles}
                        columns={column}
                        pagination
                        paginationPerPage={10}
                    />
                </div>
            </div>
        </div>
        </div>
    )
}

export default AdBookingPending;
