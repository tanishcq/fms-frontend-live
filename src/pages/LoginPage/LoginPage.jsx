import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { LoginGoogleButton } from 'components';
import { gapi } from 'gapi-script';
// eslint-disable-next-line import/extensions
import LoaderButton from '../../components/loaderButton/LoaderButton.jsx';
import loginIllustration from '../../assets/images/loginIllustration.webp';
import fcamLogo from '../../assets/images/fcamLogo.png';
import './LoginPage.css';
import { restUrl } from '../../endpoints';

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const SCOPES = 'https://www.googleapis.com/auth/drive';

    useEffect(() => {
        gapi.load('client:auth2', () => {
            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                scope: SCOPES,
            });
            // .then(() => {
            //     // console.log(gapi.auth?.getToken()?.access_token);
            //     sessionStorage.setItem(
            //         'googleAccessToken',
            //         gapi.auth?.getToken()?.access_token,
            //     );
            //     getAllFormData();
            // });
        });
    }, []);

    const onLogin = (email) => {
        // e.preventDefault();
        setIsLoading(true);

        axios({
            method: 'post',
            url: `${restUrl}/users/signin`,
            contentType: 'application/json',
            data: {
                email,
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);

                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem(
                        'user',
                        JSON.stringify({
                            userName: response.data.user.username,
                            email: response.data.user.email,
                        }),
                    );
                    navigate('/admin/dashboard');
                    toast.success('Logged In Successfully', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                } else {
                    toast.error('Something went wrong', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                console.log(error);
                if (error.response?.status === 400) {
                    toast.error(error.response.data.message, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                    setIsLoading(false);
                } else {
                    toast.error('Something went wrong', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
                setIsLoading(false);
            });
    };

    return (
        <div className="loginBody">
            <main className="Main_login">
                <nav>
                    <div className="logo">
                        <img src={fcamLogo} alt="logo" />
                    </div>
                    <div className="nav-links" id="navLinks">
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/">Features</Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                <section className="main-container">
                    <div className="img-container">
                        <img src={loginIllustration} alt="img" />
                    </div>
                    <div className="form-container">
                        <h1>Welcome Back!</h1>
                        <LoginGoogleButton onLogin={onLogin} />
                        {/* <p className="loginNote">
                            Note : Please log in with google to use google forms
                            services
                        </p> */}
                        {/* <form onSubmit={onLogin}>
                            <div className="input-container">
                                <i className="fa-solid fa-user" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={email}
                                    pattern="\S*@msijanakpuri\.com"
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    required
                                />
                            </div>

                            <div className="input-container">
                                <i className="fa-solid fa-lock" />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    minLength={5}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    required
                                />
                            </div>

                            <div className="rf-container">
                                <div className="remember">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        id="remember"
                                    />
                                    <label htmlFor="remember">Remember</label>
                                </div>
                                <div className="forgot">
                                    <Link to="/forgot-password">
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>

                            <LoaderButton
                                display="Log In"
                                style={
                                    isLoading
                                        ? {
                                              backgroundColor:
                                                  'rgb(0, 145, 0, 0.5)',
                                              cursor: 'not-allowed',
                                          }
                                        : {}
                                }
                                isLoading={isLoading}
                                type="submit"
                            />
                        </form> */}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default LoginPage;
