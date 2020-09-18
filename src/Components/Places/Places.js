import React, { useState } from 'react';
import './Places.css';
import { locationData } from '../fakeDataLocation/fakeDataLocation';
import Place from '../Place/Place';
import { useHistory } from 'react-router-dom';

const Places = () => {

    const history = useHistory();

    const [selectedPlace, setSelectedPlace] = useState(locationData[0]);

    const handleClick = (data) => {
        setSelectedPlace(data);
    }

    const handleBooking = () => {
        history.push( `/booking/${selectedPlace.id}`);
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-3 heading">
                    <h1>{selectedPlace.name}</h1>
                    <p>{selectedPlace.description}</p>
                    <button onClick={handleBooking} className="custom-btn">Booking</button>
                </div>
                <div className="col-md-8 pictures">
                {
                    locationData.map(place => <Place handleClick={handleClick} selectedPlace={selectedPlace} data={place}></Place>)
                }
                
                </div>
            </div>
        </div>
        
    );
};

export default Places;