import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import "./roomdetails.css"
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { userContex } from '../Home/Home'
import Dashboard from '../Home/Homepage'
import DataTable from 'react-data-table-component'
import RoomInfo from './RoomInfo'
import * as yup from 'yup';
import { ErrorMessage, Formik } from 'formik';


function RoomDetails() {

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

    const [roomDetails, setRoomDetails] = useState([])

    // useEffect(() => {
    //     fetchAllRoomDetails()

    // }, [])



    const cdate = new Date();

    const startOfMonth = new Date(cdate.getFullYear(), cdate.getMonth(), 1);
    const endOfMonth = new Date(cdate.getFullYear(), cdate.getMonth() + 1, 0);
  
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };
  
   
  
  useEffect(()=>{
    fetchAllRoomDetails()
  },[])
  
    let [currentdate,setcurrentdate]=useState({
        fromDate: formatDate(startOfMonth),toDate:formatDate(endOfMonth),
    })

    let fetchAllRoomDetails = async () => {

        let result = await axios.get("http://49.204.232.254:91/roominfo/getall", {
            startDate: currentdate.fromDate,
            endDate: currentdate.toDate
        })
        console.log(result.data.data)
        setRoomDetails(result.data.data)
    }

    const handleDelete = async (roomInfoId) => {
        try {
            const response = await axios.post(`http://49.204.232.254:91/roominfo/deleteroominfo`, {
                roomInfoId: roomInfoId
            })
            console.log(response.data)
            alert("Room Data Deleted!!!")
            // fetchAllRoomDetails()
        } catch (err) {
            console.log(err)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            startDate: currentdate.fromDate,
            endDate: currentdate.toDate,
        };
console.log(data)
        axios
            .get('http://49.204.232.254:91/roominfo/getall', data)
            .then((res) => {
                setRoomDetails(res.data.data);
            });
    };


   

    let handleEdit = (roomInfoId) => {
        console.log("Edit")
        setComponent(<RoomInfo roomInfoId={roomInfoId} />)
    }

    let columns = [
        {
            name: "From Date",
            selector: data => new Date(data.fromdate).toISOString().substring(0, 10)
        },
        {
            name: "To Date",
            selector: data => new Date(data.todate).toISOString().substring(0, 10)
        },
        {
            name: "Room Name",
            selector: data => data.roomName.join(", ")
        },
        {
            name: "Total Amount",
            selector: data => data.totalamount
        },
        {
            name: "Final Amount",
            selector: data => data.finalamount
        },
        {
            name: "Paid Amount",
            selector: data => data.paidamount
        },
        {
            name: "Discount Amount",
            selector: data => data.discountamount
        },
        {
            name: "Payment Mode",
            selector: data => data.paymentmode
        },
        {
            name: "Time",
            selector: data => data.time
        },
        {
            name: 'Edit',
            selector: data => <button className="edit-btn" onClick={() => handleEdit(data.roomInfoId)}>Edit</button>
        },
        {
            name: 'Delete',
            selector: data => <button className="delete-btn" onClick={() => handleDelete(data.roomInfoId)}>Delete</button>
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

    const handleInputChange = (e) => {
        setcurrentdate({...currentdate, [e.target.name] : e.target.value})
    }

    return (
        <div style={{ backgroundColor: "#415A77", boxShadow: "1px 2px 10px 5px black" }}>
            <div style={{ padding: "20px" }}></div>
            <div className='room-details-container' style={{ backgroundColor: "#E0E1DD", boxShadow: "0px 5px 10px black" }}>
                <div>
                    <h3>
                        <IoArrowBackCircleOutline onClick={() => setComponent(<Dashboard />)} style={{ float: "left", cursor: "pointer", fontSize: "30px", marginRight: "10px" }} />
                        ROOM DETAILS
                    </h3>

                  
                        <form className="report-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <div className="date-picker">
                                    <label htmlFor="fromDate">From:</label>
                                    <input type="date" name="fromDate" value={currentdate.fromDate} onChange={(e) => { handleInputChange(e)}} />
                                   
                                </div>
                                <div className="date-picker">
                                    <label htmlFor="toDate">To:</label>
                                    <input type="date" name="toDate" value={currentdate.toDate} onChange={(e) => {  handleInputChange(e)}} />
                                  
                                </div>
                            </div>



                            <button type="submit" className="submit-btn">Submit</button>

                            {roomDetails.length > 0 && (
                                <div className="room-details-table">
                                  
                                </div>
                            )}
                        </form>
                 
           
                <DataTable
                                        data={roomDetails}
                                        columns={columns}
                                        customStyles={customStyles}
                                        pagination
                                        paginationPerPage={10}
                                    />
                </div>
            </div>
        </div>
    )
}

export default RoomDetails;


