import React from 'react';
import './Place.css';
import fakeData from '../fakeData/fakeData';

const Place = ({ place, currentPlace, index, setCurrentPlace, setIsNextDisable, setIsPreviousDisable }) => {

    const handleUpdateCurrentPlace = () => {
        setCurrentPlace(place.id-1);

        if((place.id)-1 === fakeData.length-1) setIsNextDisable(true);
        else setIsNextDisable(false);

        if((place.id)-1 === 0) setIsPreviousDisable(true);
        else setIsPreviousDisable(false);
    }

    return (
        <div className="col-md-6 col-sm-6 col-12 col-lg-6 col-xl-6 col-xxl-3" onClick={handleUpdateCurrentPlace}>
            <img className={`img-fluid place-image ${currentPlace === index ? 'active-place' : 'inactive-place'}`} src={place.img} alt="" />
            <h4 className="place-name">{place.name}</h4>
        </div>
    );
};

export default Place;