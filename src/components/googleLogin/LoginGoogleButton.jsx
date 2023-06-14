import React from 'react';
import { GoogleLogin } from 'react-google-login';

const LoginGoogleButton = ({ onLogin }) => {
    // checkLoginAndCreateForm ye prop hta diya
    const onSuccess = (res) => {
        console.log(res);
        localStorage.setItem(
            'userImage',
            JSON.stringify(res.profileObj.imageUrl),
        );
        // document.querySelector('.__imgBx > img').src = res.profileObj.imageUrl; // kuch error
        // document.querySelector(
        //     '.__user > h3',
        // ).innerText = `Welcome, ${res.profileObj.givenName}`;
        // checkLoginAndCreateForm(); abhi ke liye hta diya
        onLogin(res.profileObj.email);
    };

    const onFailure = (res) => {
        console.log('Login failed res:', res);
    };

    return (
        <div>
            <GoogleLogin
                clientId="282391974322-87evpe1qamta10q0uuskfqesibdvrtb0.apps.googleusercontent.com"
                buttonText="Sign in with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy="single_host_origin"
            />
        </div>
    );
};

export default LoginGoogleButton;
