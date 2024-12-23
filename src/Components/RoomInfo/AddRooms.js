import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import "./RoomInfo.css";
import { Button, Form, Modal } from 'react-bootstrap';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { userContex } from '../Home/Home';
import Dashboard from '../Home/Homepage';
import { IoArrowBackCircleOutline } from 'react-icons/io5';

const AddRooms = () => {

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

  let userId = sessionStorage.getItem('userId');

  const [getRooms, setGetRooms] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get("http://49.204.232.254:91/room/getalldata");
    setGetRooms(response.data.data);
  }

  const [newroomName, setNewRoomName] = useState("");

  const handleAddRoom = () => {
    let data = {
      roomName: newroomName,
      status: "Free",
      createdBy: userId
    };
    axios.post("http://49.204.232.254:91/room/createroom", data).then((res) => {
      fetchData();
    });
    handleClose();
  }

  const handleDelete = (roomId) => {
    let data = { roomId: roomId };
    let confirmdelete = window.confirm("Are you sure want to delete?");
    if (confirmdelete) {
      axios.post("http://49.204.232.254:91/room/deleteroom", data).then((res) => {
        fetchData();
      });
    }
  }

  const [editRoomId, setEditRoomId] = useState("");
  const handleEdit = (roomId) => {
    setEditRoomId(roomId);
    let filterRooms = getRooms.find((items) => items.roomId === roomId);
    setNewRoomName(filterRooms.roomName);
    handleShow();
  }

  const handleSubmit = () => {
    if (editRoomId) {
      handleUpdateRoom();
    } else {
      handleAddRoom();
    }
  }

  const handleUpdateRoom = () => {
    let data = {
      roomId: editRoomId,
      roomName: newroomName,
      status: "Free",
      updatedBy: userId
    };
    axios.post("http://49.204.232.254:91/room/createroom", data).then((res) => {
      fetchData();
    });
    setEditRoomId("");
    handleClose();
  }

  return (
    <div>
    <div style={{padding:"30px"}}></div>
      <div className="getrooms-ui">
        <div className="header-container">
          <IoArrowBackCircleOutline
            onClick={() => setComponent(<Dashboard />)}
            className="back-icon"
          />
          <Button onClick={handleShow} className="add-room-button">ADD</Button>
        </div>

        {getRooms.map((data) => (
          <div className="room-item" key={data.roomId}>
            <div className="room-name">{data.roomName}
              <span className="room-actions">
                <FaEdit onClick={() => handleEdit(data.roomId)} className="edit-icon" />
                <MdDelete onClick={() => handleDelete(data.roomId)} className="delete-icon" />
              </span>
            </div>
          </div>
        ))}

        <Modal show={show} onHide={handleClose} className="room-modal">
          <Modal.Header closeButton>
            <Modal.Title>Edit Room</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="room-name-input">
                <Form.Label>Room Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Room Name"
                  value={newroomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            <Button variant="primary" onClick={handleSubmit}>Save</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default AddRooms;
