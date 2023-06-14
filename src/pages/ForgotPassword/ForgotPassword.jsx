import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
// eslint-disable-next-line import/extensions
import LoaderButton from '../../components/loaderButton/LoaderButton.jsx';
import fcamLogo from '../../assets/images/fcamLogo.png';
import forgotImg from '../../assets/images/undraw_Authentication_re_svpt.png';
import { restUrl } from '../../endpoints';
import '../LoginPage/LoginPage.css';
import './ForgotPassword.css';

function ForgotPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const onLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);

        axios({
            method: 'post',
            url: `${restUrl}/forgot-password`,
            // url: `http://ec2-13-112-113-114.ap-northeast-1.compute.amazonaws.com:5000/forgot-password`,
            data: {
                email,
            },
        })
            .then((response) => {
                console.log(response);

                if (response.status === 200) {
                    if(response.data.message===`User doesn't exists!`){
                        toast.error(`User doesn't exists!`, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        });
                        setIsLoading(false);
                    }
                    else{
                        console.log(response.data);
                        navigate('/login', { replace: true });
    
                        toast.success('Password changed Successfully', {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        });
                        setIsLoading(false);
                    }
                    
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
                                <Link to="/login">Login</Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                <section className="main-container">
                    <div className="img-container">
                        <img src={forgotImg} alt="img" />
                    </div>
                    <div className="form-container">
                        <h1>Get a New Password</h1>
                        <form onSubmit={onLogin}>
                            <div className="input-container">
                                <i className="fa-solid fa-user" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="example@msijanakpuri.com"
                                    value={email}
                                    pattern="\S*@msijanakpuri\.com"
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    required
                                />
                            </div>
                            <div className="forgot_note">
                                <p
                                    style={{
                                        color: 'red',
                                        fontSize: '1.4rem',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Note: Enter your official email and a new
                                    password <br />
                                    will be sent to the provided email address.
                                    <br /> You can Login again with the new
                                    Password
                                </p>
                            </div>

                            <LoaderButton
                                display="Reset Password"
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
                        </form>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default ForgotPassword;
