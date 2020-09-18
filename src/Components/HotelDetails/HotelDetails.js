import React from 'react';
import GradeIcon from '@material-ui/icons/Grade';
import './HotelDetails.css';

const HotelDetails = (props) => {
    const {img, name, ratingPeople, id, guests, bedRooms, beds,  baths, rating, pricePerNight, priceTotal} = props.hotel;
    return (
        <div className="container hotel-box">
            <div className="row">
                <div className="col-md-6 img-box">
                    <img src={img} alt=""/>
                </div>
                <div className="col-md-6">
                    <h5>{name}</h5>
                    <p>{guests} guests {bedRooms} bedrooms {beds} beds {baths} baths </p>
                    <p>Wif Air conditioning kitchen</p>
                    <p>Cancellation fexibility available</p>
                    <p><span className="rating"><GradeIcon/></span> {rating}({ratingPeople})&nbsp;&nbsp;&nbsp;
                    ${pricePerNight}/night {priceTotal} $total</p>
                </div>
            </div>
        </div>
    );
};

export default HotelDetails;