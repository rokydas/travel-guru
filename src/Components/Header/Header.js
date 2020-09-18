import React, { useContext } from 'react';
import Logo from '../../travel-guru-resource/Logo2.png';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import './Header.css';
import { UserContext } from '../Home/Home';

const Header = () => {

    const [signedInUser, setSignedInUser] = useContext(UserContext);

    const handleLogOut = () => {
        setSignedInUser({})
    }

    return (
        <div>
            <Navbar bg="transparent" variant="dark">
                <Nav className="mr-auto">
                    <Link to="/"><Navbar.Brand className="nav"><img src={Logo} alt="Logo"/></Navbar.Brand></Link>
                    <Nav.Link><input className="nav search" type="text" placeholder="Search your destination" name=""></input></Nav.Link>
                </Nav>
                <Nav className="ml-auto">
                    <Nav.Link className="active nav">News</Nav.Link>
                    <Nav.Link className="active nav">Destination</Nav.Link>
                    <Nav.Link className="active nav">Blog</Nav.Link>
                    <Nav.Link className="active nav">Contact</Nav.Link>
                    {signedInUser.email && <Nav.Link className="active nav" href="#pricing">{signedInUser.displayName}</Nav.Link>}
                    {signedInUser.email && <Nav.Link><button onClick={handleLogOut} className="custom-btn nav">Log out</button></Nav.Link>}
                    {!signedInUser.email && <Nav.Link><Link to="/login"><button className="custom-btn nav">Log in</button></Link></Nav.Link>}
                </Nav>
            </Navbar>
        </div>
        
    );
};

export default Header;