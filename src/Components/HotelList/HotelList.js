import React from 'react';
import { fakeDataHotel } from '../fakeDataHotel/fakeDataHotel';
import GoogleMap from '../GoogleMap/GoogleMap';
import HotelDetails from '../HotelDetails/HotelDetails';
import './HotelList.css';

const HotelList = () => {
    return (
        <div className="hotel-list">
            <div className="row">
                <div className="col-md-6">
                    {
                        fakeDataHotel.map(hotel => <HotelDetails key={hotel.id} hotel={hotel} />)
                    }
                </div>
                <div className="col-md-6">
                    <GoogleMap/>
                </div>
            </div>
        </div>
    );
};

export default HotelList;