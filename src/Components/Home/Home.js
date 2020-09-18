import React, { createContext, useState } from 'react';
import Booking from '../Booking/Booking';
import Header from '../Header/Header';
import Login from '../Login/Login';
import './Home.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Places from '../Places/Places';
import NotFound from '../NotFound/NotFound';
import HotelList from '../HotelList/HotelList';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

export const UserContext = createContext();

const Home = () => {

    const [signedInUser, setSignedInUser] = useState({});

    return (
        <div className="home">
            <UserContext.Provider value={[signedInUser, setSignedInUser]}>
                <Router>
                    <Header/>
                    <Switch>
                        <Route path='/home'>
                            <Places/>
                        </Route>
                        <Route exact path='/'>
                            <Places/>
                        </Route>
                        <Route path='/booking/:id'>
                            <Booking/>
                        </Route>
                        <Route path='/login'>
                            <Login/>
                        </Route>
                        <PrivateRoute path='/hotel'>
                            <HotelList/>
                        </PrivateRoute>
                        <Route path='*'>
                            <NotFound/>
                        </Route>
                        
                    </Switch>
                </Router>
            </UserContext.Provider>
        </div>
    );
};

export default Home;