import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { locationData } from '../fakeDataLocation/fakeDataLocation';
import DatePickers from '../Date/Date';
import './Booking.css';

const Booking = () => {
    const id = Number(useParams().id);

    const data = locationData.find(place => place.id === id);

    return (
        <div className="row" style={{color: 'white'}}>
            <div className="place-info col-md-4">
                <h1>{data.name}</h1>
                <p>{data.description}</p>
            </div>
            <div className="booking-info col-md-4">
                <p>Origin</p>
                <input type="text" name="origin" id=""/>
                <p>Destination</p>
                <input type="text" name="destination" id=""/>
                <DatePickers label = "From"/>
                <DatePickers label = "To"/>
                <Link to="/hotel"><button>Start Booking</button></Link>
            </div>
        </div>
    );
};

export default Booking;