import React from 'react';
import './Booking.css';
import Navbar from '../Navbar/Navbar';
import PlaceDescription from '../PlaceDescription/PlaceDescription.js';
import fakeData from '../fakeData/fakeData';
import { useParams } from 'react-router-dom';

const Booking = () => {

    const { id } = useParams();

    return (
        <div className="booking-page">
            <Navbar />
            <div className="container mt-5 pt-5">
                <div className="row">
                    <div className="col-md-6">
                        <PlaceDescription currentPlace={id - 1} />
                    </div>
                    <div className="col-md-6">
                        <div className="d-flex justify-content-center">
                            <div className="booking-form-container">
                                <h3 className="mb-3">Booking Form</h3>
                                <form action="">
                                    <input className="form-control mb-2" type="text" name="origin" placeholder="Origin" id="" />
                                    <input className="form-control mb-2" type="text" name="destination" placeholder="Destination" id="" />
                                    <input className="form-control mb-2" type="date" name="" id="" />
                                    <input className="form-control mb-4" type="date" name="" id="" />
                                    <button className="custom-btn w-100">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;