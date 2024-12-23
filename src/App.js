import './App.css'
import { AdvanceBooking } from './Components/AdvanceBooking/AdvanceBooking';
import ClientInfo from './Components/ClientInfo/ClientInfo';
// import { AdvanceBooking } from './Components/AdvanceBooking/AdvanceBooking';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
// import RoomInfo from './Components/RoomInfo/RoomInfo';
import SignUp from './Components/Signup/SignUp';
import {  BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

function App() {
  let location=useLocation()

  
  return (
    <div >
      {/* <RoomInfo/> */}
     {location.pathname ==="advancebooking"  && <Home/>}
   
        <Routes>
          <Route path='/'  element={<Login />}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/home' element={<Home/>}/>
         
        </Routes>
        
         
        
    </div>
  );
}

export default App;
