import React from 'react';
import './Place.css';

const Place = (props) => {
    const data = props.data;
    const selectedPlace = props.selectedPlace;
    const handleClick = props.handleClick;
    return (
        <img className={`img-box ${selectedPlace.id === data.id && "active-place"}`} onClick={() => handleClick(data)} src={data.img} alt=""/>
    );
};

export default Place;