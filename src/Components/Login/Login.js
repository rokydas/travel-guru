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

    const [errorMessage, setErrorMessage] = useState('');

    const [passwordMatched, setPasswordMatched] = useState(false)

    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const GoogleProvider = new firebase.auth.GoogleAuthProvider();
    var FbProvider = new firebase.auth.FacebookAuthProvider();

    const [user, setUser] = useState({});

    const [signedInUser, setSignedInUser] = useContext(UserContext);

    const [isNew, setIsNew] = useState(false);

    const handlePassLogin = (event) => {
        const newUser = {...user}
        newUser[event.target.name] = event.target.value;
        setUser(newUser);
    }

    const handlePassChange = (event) => {
        let isFieldValid = false;
        
        const isUpper =  (/[A-Z]/.test(event.target.value));
        const isLower =  (/[a-z]/.test(event.target.value));
        const isLength = event.target.value.length >= 6
        const isNumber = /\d{1}/.test(event.target.value);

        setIsPasswordValid({isUpper, isLower, isLength, isNumber});

        if(isUpper && isLower && isLength && isNumber){
            isFieldValid = true;
        }

        // assignValueToUser(isFieldValid, event.target.name, event.target.value);

        if(isFieldValid){
            const newUser = {...user};
            newUser[event.target.name] = event.target.value;
            setUser(newUser);
        }
    }

    const handleConfirmPass = (event) => {
        if(user.password === event.target.value) {
            setPasswordMatched(true);
            const newUser = {...user};
            newUser[event.target.name] = event.target.value;
            setUser(newUser);
        }
        else{
            setPasswordMatched(false);
        }
    }

    const handleOnBlur = (event) => {
        let isFieldValid = false;

        if(event.target.name === 'email'){
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        
        else{
            isFieldValid = true;
        }

        // assignValueToUser(isFieldValid, event.target.name, event.target.value);

        if(isFieldValid){
            const newUser = {...user};
            newUser[event.target.name] = event.target.value;
            setUser(newUser);
        }
    }

    const handleCreateAccount = (event) => {
        if(user.email && user.password && user.password === user.confirmPassword) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(res => {
                setSignedInUser(user);
                const name = user.firstName + ' ' + user.lastName;
                const newUser = {...user};
                newUser.displayName = name;
                setSignedInUser(newUser);
                updateUserProfile(name);
                history.replace(from);
            })
            .catch(function(error) {
                const errorMessage = error.message;
                setErrorMessage(errorMessage);
            });
        }
        event.preventDefault();
    }

    const updateUserProfile = (name) => {
        const newUser = firebase.auth().currentUser;
        newUser.updateProfile({
            displayName: name,
        })
        .then(function() {
            // updated successfully
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
            history.replace(from);
        })
        .catch(function(error) {
            setErrorMessage(error.message)
        });
        event.preventDefault();
    }

    const handleFbSignIn = () => {
        firebase.auth().signInWithPopup(FbProvider)
        .then(function(result) {
            const fbUser = result.user;
            const {displayName, email, photoURL} = fbUser;
            const newUser = {
                displayName: displayName,
                email: email || 'example@example.com',
                photoURL: photoURL
            }
            setSignedInUser(newUser);
            history.replace(from);
          }).catch(function(error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
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
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }

    return (
        <div className="login">
            {isNew && <h2>Create an account</h2>}
            {!isNew && <h2>Login</h2>}
            <form action="">
                {isNew && 
                    <div>
                        <input onBlur={handleOnBlur} placeholder="First Name" type="text" name="firstName" id="" required/><br/><br/>
                        <input onBlur={handleOnBlur} placeholder="Last Name" type="text" name="lastName" id=""/><br/><br/>
                    </div>
                }
                
                <input onChange={handleOnBlur} placeholder="Username or Email" type="email" name="email"/><br/><br/>
                {isNew ? <input onChange={handlePassChange} type="password" name="password" placeholder="Password"/>
                : <div>
                   <input onChange={handlePassLogin} type="password" name="password" placeholder="Password"/>
                </div>}

                {isNew ? 
                    <div style={{color: 'red'}}>
                        {!isPasswordValid.isUpper && <li>Password must have at least one uppercase character</li>}
                        {!isPasswordValid.isLower && <li>Password must have at least one lowercase character</li>}
                        {!isPasswordValid.isNumber && <li>Password must have at least one number</li>}
                        {!isPasswordValid.isLength && <li>Password length have to be greater than or equal to 6</li>}<br/>
                        <input onChange={handleConfirmPass} placeholder="Confirm Password" type="password" name="confirmPassword" id=""/><br/>
                        {!passwordMatched && <li>Password and Confirm Password don't match</li>}<br/>
                    </div>
                :
                    <div>
                        <input type="checkbox" name="remember" label="Remember me"/>&nbsp;&nbsp;
                        Remember Me<br/><br/>
                        Forget Password?<br/><br/>
                    </div>
                }
                
                <p style={{color: 'red'}}>{errorMessage}</p> 
                {isNew ? <input className="google-fb" onClick={handleCreateAccount} type="submit" value="Create an account"/>
                : <input className="google-fb" onClick={handleLogin} type="submit" value="Login"/>}

                {isNew ? <p>Already have an account? <span onClick={() => setIsNew(!isNew)} style={togglerStyle}>Login</span></p>
                : <p>Don't have an account? <span onClick={() => setIsNew(!isNew)} style={togglerStyle}>Create an account</span></p>}
                
            </form>
            <button className="google-fb" onClick={handleFbSignIn}>Continue with Facebook</button><br/>
            <button className="google-fb" onClick={handleGoogleSignIn}>Continue with Google</button>
        </div>
    );
};

export default Login;