/* eslint-disable jsx-a11y/no-static-element-interactions */
import axios from 'axios';
import React, { useState } from 'react';
import { Sidebar, Navbar } from 'components';
import './ChangePassword.css';
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';
import LoaderButton from 'components/loaderButton/LoaderButton';
import { restUrl } from '../../../endpoints';

function ChangePassword() {
    const navigate = useNavigate();

    const [navToggle, setNavToggle] = useState(false);
    const [mainToggle, setMainToggle] = useState(false);
    const [oldpasswordType, setOldPasswordType] = useState(true);
    const [newpasswordType, setNewPasswordType] = useState(true);
    const [confirmpasswordType, setConfirmPasswordType] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState({
        oldPass: '',
        newPass: '',
        confirmPass: '',
    });
    const token = localStorage.getItem('token');
    const togglePassword = (type) => {
        if (type === 'oldpasswordType') {
            setOldPasswordType((prevType) => !prevType);
        }
        if (type === 'newpasswordType') {
            setNewPasswordType((prevType) => !prevType);
        }
        if (type === 'confirmpasswordType') {
            setConfirmPasswordType((prevType) => !prevType);
        }
    };

    function resetPassword(e) {
        e.preventDefault();
        setIsLoading(true);

        if (password.newPass !== password.confirmPass) {
            toast.error('New Password and Confirm Password does not match', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            setIsLoading(false);
            return;
        }

        axios({
            method: 'PATCH',
            url: `${restUrl}/users/resetPassword`,
            data: {
                password: password.oldPass,
                newPassword: password.newPass,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                console.log(response);
                toast.success('Change Password Successfull', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                localStorage.removeItem('token');
                navigate('/login', { replace: true });
                setIsLoading(false);
            })
            .catch((err) => {
                // console.log(err.response.data.message);
                if (err.response?.data?.message) {
                    toast.error(err.response?.data?.message, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                } else {
                    toast.error('Something went wrong', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
                setIsLoading(false);
            });
    }

    return (
        <>
            {/* sidebar */}
            <Sidebar navToggle={navToggle} />
            <div
                className={
                    mainToggle
                        ? 'ChangePasswordMain active'
                        : 'ChangePasswordMain'
                }
            >
                {/* navbar */}
                <Navbar
                    setNavToggle={setNavToggle}
                    setMainToggle={setMainToggle}
                />
                <main>
                    <div className="changePasswordContainer">
                        <div className="box">
                            <form
                                name="changePasswordForm"
                                id="changePasswordForm"
                                onSubmit={resetPassword}
                            >
                                <h2 className="formTitle">Change Password</h2>

                                <div className="passwords">
                                    <label
                                        className="inputLabel"
                                        htmlFor="oldpassword"
                                    >
                                        Old Password
                                    </label>
                                    <input
                                        type={
                                            oldpasswordType
                                                ? 'password'
                                                : 'text'
                                        }
                                        id="oldPassword"
                                        minLength={6}
                                        required
                                        name="oldPassword"
                                        value={password.oldPass}
                                        onChange={(e) => {
                                            setPassword((prev) => ({
                                                ...prev,
                                                oldPass: e.target.value,
                                            }));
                                        }}
                                    />
                                    {oldpasswordType ? (
                                        <i
                                            className="fa-solid fa-eye-slash"
                                            onClick={() => {
                                                togglePassword(
                                                    'oldpasswordType',
                                                );
                                            }}
                                        />
                                    ) : (
                                        <i
                                            className="fa-solid fa-eye"
                                            onClick={() => {
                                                togglePassword(
                                                    'oldpasswordType',
                                                );
                                            }}
                                        />
                                    )}
                                    {/* <i className="fa-solid fa-eye" /> */}
                                </div>

                                <div className="passwords">
                                    <label
                                        className="inputLabel"
                                        htmlFor="newPassword"
                                    >
                                        New Password
                                    </label>
                                    <input
                                        type={
                                            newpasswordType
                                                ? 'password'
                                                : 'text'
                                        }
                                        minLength={6}
                                        required
                                        id="newPassword"
                                        name="newPassword"
                                        value={password.newPass}
                                        onChange={(e) => {
                                            setPassword((prev) => ({
                                                ...prev,
                                                newPass: e.target.value,
                                            }));
                                        }}
                                    />
                                    {newpasswordType ? (
                                        <i
                                            className="fa-solid fa-eye-slash"
                                            onClick={() => {
                                                togglePassword(
                                                    'newpasswordType',
                                                );
                                            }}
                                        />
                                    ) : (
                                        <i
                                            className="fa-solid fa-eye"
                                            onClick={() => {
                                                togglePassword(
                                                    'newpasswordType',
                                                );
                                            }}
                                        />
                                    )}
                                </div>

                                <div className="passwords">
                                    <label
                                        className="inputLabel"
                                        htmlFor="confirmPassword"
                                    >
                                        Confirm Password
                                    </label>
                                    <input
                                        type={
                                            confirmpasswordType
                                                ? 'password'
                                                : 'text'
                                        }
                                        id="confirmPassword"
                                        minLength={6}
                                        required
                                        name="confirmPassword"
                                        value={password.confirmPass}
                                        onChange={(e) => {
                                            setPassword((prev) => ({
                                                ...prev,
                                                confirmPass: e.target.value,
                                            }));
                                        }}
                                    />
                                    {confirmpasswordType ? (
                                        <i
                                            className="fa-solid fa-eye-slash"
                                            onClick={() => {
                                                togglePassword(
                                                    'confirmpasswordType',
                                                );
                                            }}
                                        />
                                    ) : (
                                        <i
                                            className="fa-solid fa-eye"
                                            onClick={() => {
                                                togglePassword(
                                                    'confirmpasswordType',
                                                );
                                            }}
                                        />
                                    )}
                                </div>

                                <LoaderButton
                                    display="Save"
                                    id="submitButton"
                                    className="submitButton"
                                    style={
                                        isLoading
                                            ? {
                                                  backgroundColor: '#1e90ff75',
                                                  cursor: 'not-allowed',
                                              }
                                            : {}
                                    }
                                    isLoading={isLoading}
                                    type="submit"
                                />
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default ChangePassword;
