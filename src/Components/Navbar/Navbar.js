import React from 'react';
import './Navbar.css';
import logo from '../../travel-guru-resource/Logo2.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid text-white">
                <Link className="navbar-brand item-gap ms-5" to="/"><img className="logo" src={logo} alt="" /></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active text-white me-5" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active text-white me-5" to="/">Destination</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active text-white me-5" to="#">Blog</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active text-white me-5" to="#">Contact</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active text-white me-5" to="#"><button className="custom-btn">Login</button></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;