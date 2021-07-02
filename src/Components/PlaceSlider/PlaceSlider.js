import React from 'react';
import fakeData from '../fakeData/fakeData';
import Place from '../Place/Place';

const PlaceSlider = ({ currentPlace, setCurrentPlace, setIsNextDisable, setIsPreviousDisable }) => {
    return (
        <div className="d-flex justify-content-center">
            <div className="row">
                {
                    fakeData.map((place, index) =>
                        <Place
                            key={place.id}
                            index={index}
                            currentPlace={currentPlace}
                            place={place}
                            setCurrentPlace={setCurrentPlace}
                            setIsNextDisable={setIsNextDisable}
                            setIsPreviousDisable={setIsPreviousDisable}
                        />)
                }
            </div>
        </div>
    );
};

export default PlaceSlider;