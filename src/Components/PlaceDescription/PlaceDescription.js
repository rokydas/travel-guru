import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import fakeData from '../fakeData/fakeData';
import './PlaceDescription.css';
import { Link } from 'react-router-dom';

const PlaceDescription = ({ currentPlace }) => {

    // const newPlace = fakeData[currentPlace];
    // setPlace(newPlace);

    const [place, setPlace] = useState(fakeData[0]);

    useEffect(() => {
        setPlace(fakeData[currentPlace]);
    }, [currentPlace])

    return (
        <div>
            <div className="description">
                <h1 className="heading">{place?.name}</h1>
                <p>{place?.description}</p>
                <Link to={`/booking/${place?.id}`}><button className="custom-btn text-center">Booking → </button></Link>
            </div>
        </div>
    );
};

export default PlaceDescription;