import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import "./Clientdetails.css"
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { userContex } from '../Home/Home'
import ClientDetailsEdit from './Clientdetailsedit'
import Dashboard from '../Home/Homepage'
import DataTable from 'react-data-table-component'
import { Button } from 'react-bootstrap'

function Clientdetails() {

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

    const [clientInfo, setClientInfo] = useState([])

    useEffect(() => {
        fetchAllClientInfo()
    }, [])

    let fetchAllClientInfo = async () => {
        let result = await axios.get("http://49.204.232.254:91/clientinfo/getalldata")
        console.log(result.data.data)
        setClientInfo(result.data.data)
    }

    const handleDelete = async (clientId) => {
        try {
            const response = await axios.post(`http://49.204.232.254:91/clientinfo/removeClient`, {
                clientId: clientId
            })
            console.log(response.data)
            alert("Client Data Deleted!!!")
            fetchAllClientInfo()
        } catch (err) {
            console.log(err)
        }
    }

    let handleEdit = (clientId) => {
        console.log("Edit")
        setComponent(<ClientDetailsEdit clientId={clientId} />)
    }

    let columns = [
        {
            name: "Name",
            selector: clientData => clientData.name
        },
        {
            name: "Phone Number",
            selector: clientData => clientData.mobileno
        },
        {
            name: "Edit",
            selector: clientData => (
                <Button className="edit-btn" onClick={() => handleEdit(clientData.clientId)}>
                    Edit
                </Button>
            )
        },
        {
            name: "Delete",
            selector: clientData => (
                <Button className="delete-btn" onClick={() => handleDelete(clientData.clientId)}>
                    Delete
                </Button>
            )
        }
    ]

    const customStyles = {
        headRow: {
            style: {
                backgroundColor: "#3C4A72",
                color: "white",
                textAlign: "center",
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }
        },
        headCells: {
            style: {
                color: "white",
                fontSize: "15px",
                fontWeight: "600",
                padding: "10px",
            }
        },
        cells: {
            style: {
                fontSize: "15px",
                textAlign: "center",
                padding: "15px",
            }
        },
        pagination: {
            style: {
                display: 'flex',
                justifyContent: 'center',
                padding: '10px',
            }
        }
    }

    return (
        < div style={{backgroundColor : "#415A77", boxShadow : "1px 2px 10px 5px black"}}>
            <div style={{ padding: '20px' }}></div>
            <div className="client-details-container" style={{backgroundColor : "#E0E1DD",boxShadow: "0px 5px 10px black"}}>
                <div >
                    <h3>
                        <IoArrowBackCircleOutline
                            onClick={() => setComponent(<Dashboard />)}
                            style={{ float: "left", cursor: "pointer", fontSize: "30px", marginRight: "10px" }}
                        />
                        CLIENT INFORMATION
                    </h3>
                    <div className="client-details-table">
                        <DataTable
                            data={clientInfo}
                            customStyles={customStyles}
                            columns={columns}
                            pagination
                            paginationPerPage={10}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Clientdetails;
