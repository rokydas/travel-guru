import React from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import PlaceDescription from '../PlaceDescription/PlaceDescription';
import PlaceSlider from '../PlaceSlider/PlaceSlider';
import { useState } from 'react';
import fakeData from '../fakeData/fakeData';

const Home = () => {

    const [currentPlace, setCurrentPlace] = useState(0);

    const [isPreviousDisable, setIsPreviousDisable] = useState(true);
    const [isNextDisable, setIsNextDisable] = useState(false);

    const updateCurrentPlace = (res) => {
        let newCurrentPlace = currentPlace;
        if (res && newCurrentPlace + 1 === fakeData.length - 1) {
            setIsNextDisable(true);
        }
        if (!res && newCurrentPlace - 1 === 0) {
            setIsPreviousDisable(true);
        }
        if (res) {
            newCurrentPlace++;
            setIsPreviousDisable(false);
        }
        else {
            newCurrentPlace--;
            setIsNextDisable(false);
        }
        setCurrentPlace(newCurrentPlace);
    }

    console.log('currentPlace', currentPlace);
    return (
        <div className="home-page">
            <Navbar />
            <div className="custom-container">
                <h1 className="text-center text-white mb-3 heading">Travel Guru</h1>
                <h3 className="text-center text-white mb-5">Choose your favorite tourist place in our site</h3>

                <div className="d-flex justify-content-center search-box">
                    <input placeholder="Search your destination" type="text" name="" id="" />
                    <button className="search-btn">Search</button>
                </div>

                <div className="row">
                    <div className="col-xl-4 col-lg-12 col-md-12">
                        <PlaceDescription currentPlace={currentPlace} />
                    </div>
                    <div className="col-xl-8 col-lg-12 col-md-12">
                        <PlaceSlider
                            currentPlace={currentPlace}
                            setCurrentPlace={setCurrentPlace}
                            setIsNextDisable={setIsNextDisable}
                            setIsPreviousDisable={setIsPreviousDisable}
                        />
                        <div className="d-flex justify-content-center">
                            <button onClick={() => updateCurrentPlace(false)} disabled={isPreviousDisable} className="arrow-btn me-5">«</button>
                            <button onClick={() => updateCurrentPlace(true)} disabled={isNextDisable} className="arrow-btn">»</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;