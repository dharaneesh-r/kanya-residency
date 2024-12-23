import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import './Viewbookingnew.css';

function Viewbookingnew() {
    const [bookedDates, setBookedDates] = useState([]);
    const [hoveredDate, setHoveredDate] = useState(null);
    const [hoveredAvailableRooms, setHoveredAvailableRooms] = useState(null);

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const [years, setYears] = useState(currentYear);
    const [months, setMonths] = useState(currentMonth);
    const [availablerooms, setAvailableRooms] = useState([]);

    useEffect(() => {
        if (years && months) {
            let data = { year: years, month: months };

            axios.get('http://49.204.232.254:91/room/getalldata').then((roomResponse) => {
                const allRooms = roomResponse.data.data;

                axios.post('http://49.204.232.254:91/report/get-within-range', data).then((res) => {
                    setBookedDates(res.data);

                    const availableRoomsByDay = res.data.map((dayData) => {
                        if (dayData.status === 'Partially Booked' || dayData.status === 'Not Booked') {
                            const bookedRooms = dayData.rooms;
                            const availableRooms = allRooms.filter((room) => !bookedRooms.includes(room.roomId));

                            return {
                                day: dayData.day,
                                availableRooms: availableRooms.map((room) => room.roomName),
                                partiallyBookedRooms: allRooms.filter((room) => bookedRooms.includes(room.roomId)).map((room) => room.roomName),
                            };
                        } else {
                            return {
                                day: dayData.day,
                                availableRooms: [],
                                partiallyBookedRooms: [],
                            };
                        }
                    });

                    setAvailableRooms(availableRoomsByDay);
                });
            });
        }
    }, [years, months]);

    const generateYears = () => {
        const startYear = 1970;
        let years = [];
        for (let i = currentYear; i >= startYear; i--) {
            years.push(i);
        }
        return years;
    };

    const monthsArray = [
        { value: 1, label: 'January' },
        { value: 2, label: 'February' },
        { value: 3, label: 'March' },
        { value: 4, label: 'April' },
        { value: 5, label: 'May' },
        { value: 6, label: 'June' },
        { value: 7, label: 'July' },
        { value: 8, label: 'August' },
        { value: 9, label: 'September' },
        { value: 10, label: 'October' },
        { value: 11, label: 'November' },
        { value: 12, label: 'December' },
    ];

    return (
        <Container className="viewbooking-container">

            <div className='input-form'>
                <Form.Select
                    aria-label="Year select"
                    style={{ width: "70%", margin: 'auto', textAlign: "center" }}
                    name="year"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                >
                    <option value="">Select Year</option>
                    {generateYears().map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </Form.Select>


                <Form.Select
                    aria-label="Month select"
                    value={months}
                    style={{ width: "70%", margin: "auto", textAlign: "center", }}
                    onChange={(e) => setMonths(Number(e.target.value))}

                >
                    <option value="">Select Month</option>
                    {monthsArray.map((month) => (
                        <option key={month.value} value={month.value} >
                            {month.label}
                        </option>
                    ))}
                </Form.Select>
            </div>

            <Row>
                <Col lg={6}>
                    <Row>
                        {bookedDates.slice(0, 15).map((dayData) => (
                            <Col md={6} key={dayData.day}>
                                <Card className={`day-card ${dayData.status === 'Booked' ? 'fully-booked' : dayData.status === 'Partially Booked' ? 'partially-booked' : 'not-booked'}`}>
                                    <Card.Body>
                                        <Card.Title>Day {dayData.day}</Card.Title>
                                        <p>Status: {dayData.status}</p>
                                        <p>
                                            <strong>Available Rooms:</strong>{' '}
                                            {availablerooms.find((d) => d.day === dayData.day)?.availableRooms.join(', ') || 'None'}
                                        </p>
                                        {dayData.status === 'Partially Booked' && (
                                            <p>
                                                <strong>Booked Rooms:</strong> {availablerooms.find((d) => d.day === dayData.day)?.partiallyBookedRooms.join(', ') || 'None'}
                                            </p>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>

                <Col lg={6}>
                    <Row>
                        {bookedDates.slice(15).map((dayData) => (
                            <Col md={6} key={dayData.day}>
                                <Card className={`day-card ${dayData.status === 'Booked' ? 'fully-booked' : dayData.status === 'Partially Booked' ? 'partially-booked' : 'not-booked'}`}>
                                    <Card.Body>
                                        <Card.Title>Day {dayData.day}</Card.Title>
                                        <p>Status: {dayData.status}</p>
                                        <p>
                                            <strong>Available Rooms:</strong>{' '}
                                            {availablerooms.find((d) => d.day === dayData.day)?.availableRooms.join(', ') || 'None'}
                                        </p>
                                        {dayData.status === 'Partially Booked' && (
                                            <p>
                                                <strong>Booked Rooms:</strong> {availablerooms.find((d) => d.day === dayData.day)?.partiallyBookedRooms.join(', ') || 'None'}
                                            </p>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Viewbookingnew;

