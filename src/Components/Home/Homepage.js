import React, { useContext, useEffect, useState } from 'react'
import "./Home.css"
import axios from 'axios'
import advanceicon from "../../Images/advance icon.png"
import clienticon from "../../Images/client info.png"
import checkouticon from "../../Images/checkouticon.png"
import balanceicon from "../../Images/balanceicon.png"
import collectionicon from "../../Images/collectionicon.png"
import calendericon from "../../Images/calendericon.png"
import { useNavigate } from 'react-router-dom'
import { userContex } from './Home'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap'
import { AdvanceBooking } from '../AdvanceBooking/AdvanceBooking'
import Clientdetails from '../Clientdetails/Clientdetails'
import CheckOutReport from '../Reports/CheckOutReport'
import MonthlyCollectionReport from '../Reports/MonthlyCollectionReport'
import Viewbooking from '../View/View'
import ChartDemo from './ChartDemo'
function Dashboard() {

  const navigate = useNavigate();

  const [GetCleintInfo, setGetCleintInfo] = useState([])
  const [GetAdvance, setGetAdvance] = useState([])
  const [GetCheckOut, setGetCheckOut] = useState([])
  const [GetBalanceAmt, setGetBalanceAmt] = useState({})
  const [GetCollectionAmt, setGetCollectionAmt] = useState([])

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

  //START DATE

  const [StartDate, setStartDate] = useState(new Date().toISOString().substring(0, 10))

  console.log(StartDate)

  //GET CLIENT INFO

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://49.204.232.254:91/Dashboard/getClientInfo", {
          startDate: StartDate
        })
        console.log(response.data.data)
        setGetCleintInfo(response.data.data)
      } catch (err) {
        console.log(err)
      }
    };

    fetchData();
  }, []);

  //GET ADVANCE

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://49.204.232.254:91/Dashboard/getAdvance", {
          startDate: StartDate
        })
        console.log(response.data.data)
        setGetAdvance(response.data.data)
      } catch (err) {
        console.log(err)
      }
    };
    fetchData()
  }, [])

  //GET CHECKOUT 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://49.204.232.254:91/Dashboard/getCheckOut", {
          startDate: StartDate
        })
        console.log(response.data.data)
        setGetCheckOut(response.data.data)
      } catch (err) {
        console.log(err)
      }
    };
    fetchData()
  }, [])

  //GET BALANCE AMOUNT

  useEffect(() => {
    console.log(StartDate)
    const fetchData = async () => {
      try {
        const response = await axios.post("http://49.204.232.254:91/Dashboard/getBalanceAmt", {
          startDate: StartDate
        })
        console.log(response.data)
        console.log(response.data.AdvanceBal)
        console.log(response.data.TotallyBalance)
        setGetBalanceAmt(response.data.TotallyBalance)
        console.log("GetBalanceAmt", GetBalanceAmt)
      } catch (err) {
        console.log(err)
      }
    };
    fetchData()
  }, [])

  //GET COLLECTION AMOUNT

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://49.204.232.254:91/Dashboard/getCollectionAmt", {
          startDate: StartDate
        })
        console.log(response.data)
        console.log(response.data.TotallyPaid)
        setGetCollectionAmt(response.data.TotallyPaid)
      } catch (err) {
        console.log(err)
      }
    };
    fetchData()
  }, [])

  return (
    <div className='dashboard-responsive'>
            <h2 className="animated-title">
              <span className="kanya">KANYA</span>{" "}<span className="residency">RESIDENCY</span>
            </h2>
      <div className='main-dashboard'>
        <div className="container">
        </div>
        <Container className="dashboard-container">
          <Row className="dashboard-row">

            {/* ADVANCE */}
            <Col xs={10} lg={3} className="dashboard-col animate-col">
              <Row>
                <Col className="dashboard-title">ADVANCE</Col>
                <Col><Button className="dashboard-button" onClick={() => setComponent(<AdvanceBooking />)}>Action</Button></Col>
              </Row>
              <div className="dashboard-divider"></div>
              <Row className="dashboard-content">
                <Col><img src={advanceicon} className="icon-size animate-icon" alt="Advance Icon" /></Col>
                <Col className="dashboard-data">{GetAdvance.length}</Col>
              </Row>
            </Col>

            {/* CLIENT INFO */}
            <Col xs={10} lg={3} className="dashboard-col animate-col">
              <Row>
                <Col className="dashboard-title">CLIENT INFO</Col>
                <Col><Button className="dashboard-button" onClick={() => setComponent(<Clientdetails />)}>Action</Button></Col>
              </Row>
              <div className="dashboard-divider"></div>
              <Row className="dashboard-content">
                <Col><img src={clienticon} className="icon-size animate-icon" alt="Client Info Icon" /></Col>
                <Col className="dashboard-data">{GetCleintInfo.length}</Col>
              </Row>
            </Col>

            {/* CHECKOUT */}
            <Col xs={10} lg={3} className="dashboard-col animate-col">
              <Row>
                <Col className="dashboard-title">CHECKOUT</Col>
                <Col><Button className="dashboard-button" onClick={() => setComponent(<CheckOutReport />)}>Action</Button></Col>
              </Row>
              <div className="dashboard-divider"></div>
              <Row className="dashboard-content">
                <Col><img src={checkouticon} className="icon-size animate-icon" alt="Checkout Icon" /></Col>
                <Col className="dashboard-data">{GetCheckOut.length}</Col>
              </Row>
            </Col>

            {/* BALANCE */}
            <Col xs={10} lg={3} className="dashboard-col animate-col">
              <Row>
                <Col className="dashboard-title">BALANCE</Col>
                <Col></Col>
              </Row>
              <div className="dashboard-divider"></div>
              <Row className="dashboard-content">
                <Col><img src={balanceicon} className="icon-size animate-icon" alt="Balance Icon" /></Col>
                <Col className="dashboard-data">{JSON.stringify(GetBalanceAmt)}</Col>
              </Row>
            </Col>

            {/* COLLECTION */}
            <Col xs={10} lg={3} className="dashboard-col animate-col">
              <Row>
                <Col className="dashboard-title">COLLECTION</Col>
                <Col><Button className="dashboard-button" onClick={() => setComponent(<MonthlyCollectionReport />)}>Action</Button></Col>
              </Row>
              <div className="dashboard-divider"></div>
              <Row className="dashboard-content">
                <Col><img src={collectionicon} className="icon-size animate-icon" alt="Collection Icon" /></Col>
                <Col className="dashboard-data">{JSON.stringify(GetCollectionAmt)}</Col>
              </Row>
            </Col>

            {/* VIEW */}
            <Col xs={10} lg={3} className="dashboard-col animate-col">
              <Row>
                <Col className="dashboard-title">VIEW</Col>
                <Col><Button className="dashboard-button" onClick={() => setComponent(<Viewbooking />)}>Action</Button></Col>
              </Row>
              <div className="dashboard-divider"></div>
              <Row className="dashboard-content">
                <Col><img src={calendericon} className="icon-size animate-icon" alt="View Icon" /></Col>
                <Col className="dashboard-data"></Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <div>
          {/* <ChartDemo /> */}
        </div>
      </div>
      <div style={{marginBottom : "50px"}}></div>
    </div>
  )
}

export default Dashboard