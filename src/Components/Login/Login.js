import React, { useContext, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { firebaseConfig } from './firebase.config';
import './Login.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from '../Home/Home';

firebase.initializeApp(firebaseConfig);

const Login = () => {

    const togglerStyle = {
        color: '#F9A51A',
        cursor: 'pointer'
    }

    const [isPasswordValid, setIsPasswordValid] = useState({
        isUpper: false,
        isLower: false,
        isNumber: false,
        isLength: false
    });

    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const GoogleProvider = new firebase.auth.GoogleAuthProvider();
    var FbProvider = new firebase.auth.FacebookAuthProvider();

    const [user, setUser] = useState({});

    const [signedInUser, setSignedInUser] = useContext(UserContext);

    const [isNew, setIsNew] = useState(false);

    const handlePassChange = (event) => {
        
    }

    const handleOnBlur = (event) => {
        let isFieldValid = false;

        if(event.target.name === 'email'){
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
        }

        else if(event.target.name === 'password' || event.target.name === 'confirmPassword'){
            isFieldValid = event.target.value.length >= 6 && /\d{1}/.test(event.target.value);
        }
        
        else{
            isFieldValid = true;
        }

        if(isFieldValid){
            const newUser = {...user};
            newUser[event.target.name] = event.target.value;
            setUser(newUser);
            console.log(user);
        }
        
    }

    const handleCreateAccount = (event) => {
        if(user.email && user.password && user.password === user.confirmPassword) {
            
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(res => {
                // updateUserProfile(displayName);
                setSignedInUser(user);
                const name = user.firstName + ' ' + user.lastName;
                updateUserProfile(name);
                history.replace(from);
            })
            .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
        }
        event.preventDefault();
        history.replace(from);
    }

    const updateUserProfile = (name) => {
        var user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name,
        })
        .then(function() {
            console.log('User name updated successfully');
        })
        .catch(function(error) {
            console.log(error)
        });
    }

    const handleLogin = (event) => {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
            const newUserInfo = {...user};
            newUserInfo.displayName = res.user.displayName;
            setUser(newUserInfo);
            setSignedInUser(newUserInfo);
        })
        event.preventDefault();
        history.replace(from);
    }

    const handleFbSignIn = () => {
        firebase.auth().signInWithPopup(FbProvider).then(function(result) {
            var token = result.credential.accessToken;
            var fbUser = result.user;
            const {displayName, email, photoURL} = fbUser;
            const newUser = {
                displayName: displayName,
                email: email || 'example@example.com',
                photoURL: photoURL
            }
            setSignedInUser(newUser);
            history.replace(from);
          }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
          });
    }

    const handleGoogleSignIn = () => {
        firebase.auth().signInWithPopup(GoogleProvider)
        .then(res => {
            const {displayName, email, photoURL} = res.user;
            setSignedInUser({displayName, email, photoURL});
            history.replace(from);
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            console.log(errorMessage);
        });
    }

    return (
        <div className="login">
            {/* <h3>Name: {signedInUser.displayName}</h3>
            <p>Email: {signedInUser.email}</p>
            <img src={signedInUser.photoURL} alt=""/> */}
            {isNew && <h2>Create an account</h2>}
            {!isNew && <h2>Login</h2>}
            <form action="">
                {isNew && 
                    <div>
                        <input onBlur={handleOnBlur} placeholder="First Name" type="text" name="firstName" id="" required/><br/><br/>
                        <input onBlur={handleOnBlur} placeholder="Last Name" type="text" name="lastName" id=""/><br/><br/>
                    </div>
                }
                
                <input onBlur={handleOnBlur} placeholder="Username or Email" type="email" name="email"/><br/><br/>
                <input onBlur={handleOnBlur} type="password" name="password" placeholder="Password"/>

                {isNew ? 
                    <div style={{color: 'red'}}>
                        <li>Password must have at least one uppercase character</li>
                        <li>Password must have at least one lowercase character</li>
                        <li>Password must have at least one number</li>
                        <li>Password length have to be greater than or equal to 6</li><br/>
                        <input onBlur={handleOnBlur} placeholder="Confirm Password" type="password" name="confirmPassword" id=""/><br/>
                        <li>Password and Confirm Password don't match</li><br/>
                    </div>
                :
                    <div>
                        <input type="checkbox" name="remember" label="Remember me"/>&nbsp;&nbsp;
                        Remember Me<br/><br/>
                        <Link to="/forget">Forget Password?</Link><br/><br/>
                    </div>
                }
                
                {isNew ? <input onClick={handleCreateAccount} type="submit" value="Create an account"/>
                : <input onClick={handleLogin} type="submit" value="Login"/>}

                {isNew ? <p>Already have an account? <span onClick={() => setIsNew(!isNew)} style={togglerStyle}>Login</span></p>
                : <p>Don't have an account? <span onClick={() => setIsNew(!isNew)} style={togglerStyle}>Create an account</span></p>}
                
            </form>
            <button onClick={handleFbSignIn}>Continue with Facebook</button><br/>
            <button onClick={handleGoogleSignIn}>Continue with Google</button>
        </div>
    );
};

export default Login;