import React from 'react';
import { GoogleLogout } from 'react-google-login';

const LogoutGoogleButton = () => {
    const onSuccess = () => {
        console.log('Logout Success currentUser');
    };

    return (
        <div className='aa'>
            <GoogleLogout
                clientId=" 282391974322-87evpe1qamta10q0uuskfqesibdvrtb0.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            />
        </div>
    );
};

export default LogoutGoogleButton;
