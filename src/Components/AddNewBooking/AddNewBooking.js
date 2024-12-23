import React, { useContext, useState } from 'react'
import './AddNewBooking.css'
import ClientInfo from '../ClientInfo/ClientInfo';
import Advanced from '../Advanced/Advanced';
import RoomInfo from '../RoomInfo/RoomInfo';
import { userContex } from '../Home/Home';


function AddNewBooking() {
    // const [selectedOption, setSelectedOption] = useState('select');
    // let [select, setSelect] = useState('new')
    const [
        setComponent,
        setActiveTab,
        selectedOption,
        setSelectedOption,
        select,
        setSelect
    ] = useContext(userContex)

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className='main-container'>
            <div className='A-Container'>
                <div className='select-container'>
                    <label style={{color : "white"}}>
                        <input
                            type="radio"
                            value="select"
                            checked={selectedOption === 'select'}
                            onChange={handleChange}
                        />
                        Select
                    </label>
                    <label style={{color : "white"}}>
                        <input
                            type="radio"
                            value="clientInfo"
                            checked={selectedOption === 'clientInfo'}
                            onChange={handleChange}
                        />
                        Client Info
                    </label>
                    <label style={{color : "white"}}>
                        <input
                            type="radio"
                            value="roomInfo"
                            checked={selectedOption === 'roomInfo'}
                            onChange={handleChange}
                        />
                        Room Info
                    </label>
                </div>
            </div>
            {selectedOption === 'clientInfo' && (
                <div className='c-container'>
                    <div className='new1'>
                        {/* <h2>Client Info Form</h2> */}
                        <ClientInfo />
                    </div>
                </div>
            )}

            {selectedOption === 'roomInfo' && (
                <div className='A-Container'>
                    <RoomInfo />
                </div>
            )}

            {selectedOption === 'select' && (
                <div className='A-Container1'>
                    <h2>Select</h2>
                    <div className='b-container'>
                        <div className='select-container1'>
                            <label>
                                <input
                                    type="radio"
                                    value="new"
                                    checked={select === 'new'}
                                    onChange={(e) => setSelect(e.target.value)}
                                />
                                New
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="advanced"
                                    checked={select === 'advanced'}
                                    onChange={(e) => setSelect(e.target.value)}
                                />
                                Advanced
                            </label>
                        </div>

                        {select === 'new' && (
                            <div className='new'>
                                <ClientInfo />
                            </div>
                        )}
                        {select === 'advanced' && (
                            <div>
                                <h1>Advanced</h1>
                                <div className='box2'><Advanced /></div>
                            </div>
                        )}
                    </div>
                </div>
            )}

        </div>
    )
}

export default AddNewBooking