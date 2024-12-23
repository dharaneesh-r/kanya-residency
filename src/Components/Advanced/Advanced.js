import React, { useContext, useEffect, useState } from 'react';
import './Advanced.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { userContex } from '../Home/Home';
import { AdvanceBooking } from '../AdvanceBooking/AdvanceBooking';
import DataTable from 'react-data-table-component';

function Advanced() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [setComponent, setActiveTab, selectedOption, setSelectedOption, select, setSelect, ClientId, setClientId, id, setId] = useContext(userContex);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            let response = await axios.get('http://49.204.232.254:91/advroombooking/getallData');
            setData(response.data);
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (bookingId) => {
        setActiveTab('advance-booking');
        setComponent(<AdvanceBooking bookingId={bookingId} />);
    };

    const handleDelete = (id) => {
        axios.post('http://49.204.232.254:91/advroombooking/deleteroom', { bookingId: id })
            .then(res => {
                Swal.fire({
                    text: "Deleted Successfully!",
                    icon: "success"
                });
                fetchData();
            });
    };

    const handleView = (id) => {
        setSelectedOption('clientInfo');
        setId(id);
    };

    const column = [{
        name: 'From Date',
        selector: data => new Date(data.fromdate).toISOString().substring(0, 10)
    }, {
        name: "To Date",
        selector: data => new Date(data.todate).toISOString().substring(0, 10)
    }, {
        name: "Client Name",
        selector: data => data.name
    }, {
        name: "Phone Number",
        selector: data => data.mobileno
    }, {
        name: "Room Name",
        selector: data => data.roomName.join(", ")
    }, {
        name: "Discount Amount",
        selector: data => data.discountamount
    }, {
        name: "Advance Paid",
        selector: data => data.advancepaid
    }, {
        name: "Balance Amount",
        selector: data => data.balanceamount
    }, {
        name: "Paid On",
        selector: data => data.paidOn
    }, {
        name: "Payment Mode",
        selector: data => data.paymentmode
    }, {
        name: 'Total Amount',
        selector: data => data.totalamount
    }, {
        name: 'Edit',
        selector: data => <button className="edit-btn" onClick={() => handleEdit(data.bookingId)}>Edit</button>
    }, {
        name: 'Delete',
        selector: data => <button className="delete-btn" onClick={() => handleDelete(data.bookingId)}>Delete</button>
    }, {
        name: "Check In",
        selector: data => <div>{data.status === false ? <button className="check-in-btn" onClick={() => handleView(data.bookingId)}>CheckIn</button> : "NIL"}</div>
    }];

    const customStyles = {
        headRow: {
            style: {
                backgroundColor: "#003366",
                color: "white",
                textAlign: "center",
            }
        },
        headCells: {
            style: {
                fontSize: "15px",
                width: "150px",
                textAlign: "center",
                color: "white",
            }
        },
        cells: {
            style: {
                fontSize: "14px",
                textAlign: "center",
                color: "#333",
            }
        }
    };

    if (loading) return <h4>Loading...</h4>;
    if (error) return <h4>{error}</h4>;

    return (
        <div className="viewbooking-container">
                <DataTable
                    data={data.data}
                    customStyles={customStyles}
                    columns={column}
                    pagination
                    paginationPerPage={10}
                />
        </div>
    );
}

export default Advanced;
