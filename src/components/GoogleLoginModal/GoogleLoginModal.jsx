/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import LoginGoogleButton from '../googleLogin/LoginGoogleButton';
import './GoogleLoginModal.css';

const GoogleLoginModal = ({ createForm, getAccessToken }) => {
    const [modalContent, setmodalContent] = useState('');
    // const [checkboxoption, setcheckboxOption] = useState(false);

    function setFormNameAndCreateForm() {
        const formName = document.getElementById('formName').value;
        setmodalContent(
            <div className="modal">
                <div
                    onClick={() => {
                        document.getElementById('modal-btn').checked = false;
                    }}
                    className="cross"
                    style={{
                        position: 'absolute',
                        top: '20px',
                        right: '40px',
                        cursor: 'pointer',
                        backgroundColor: 'white',
                        padding: '5px 15px',
                        borderRadius: '10px',
                    }}
                >
                    <p
                        style={{
                            fontSize: '15px',
                        }}
                    >
                        ✖
                    </p>
                </div>
                <div className="modal-wrap">
                    <br />
                    <br />
                    <p>Please wait,The form is being created...</p>
                    <br />
                    <br />
                </div>
            </div>,
        );
        createForm(formName);
    }

    async function checkLoginAndCreateForm() {
        if (await getAccessToken()) {
            setmodalContent(
                <div className="modal">
                    <div
                        onClick={() => {
                            document.getElementById(
                                'modal-btn',
                            ).checked = false;
                        }}
                        className="cross"
                        style={{
                            position: 'absolute',
                            top: '20px',
                            right: '40px',
                            cursor: 'pointer',
                            backgroundColor: 'white',
                            padding: '5px 15px',
                            borderRadius: '10px',
                        }}
                    >
                        <p
                            style={{
                                fontSize: '15px',
                            }}
                        >
                            ✖
                        </p>
                    </div>
                    <div className="modal-wrap">
                        <br />
                        <br />
                        <form
                            className="formNameInputModal"
                            onSubmit={() => {
                                setFormNameAndCreateForm();
                            }}
                        >
                            <label htmlFor="formName">Enter Form Name : </label>
                            <input type="text" id="formName" required />
                            <button type="submit">Done</button>
                        </form>
                        {/* <p>Please wait,The form is being created...</p> */}
                        <br />
                        <br />
                    </div>
                </div>,
            );
        } else {
            // eslint-disable-next-line no-alert
            setmodalContent(
                <div className="modal">
                    <div
                        onClick={() => {
                            document.getElementById(
                                'modal-btn',
                            ).checked = false;
                        }}
                        className="cross"
                        style={{
                            position: 'absolute',
                            top: '20px',
                            right: '40px',
                            cursor: 'pointer',
                            backgroundColor: 'white',
                            padding: '5px 15px',
                            borderRadius: '10px',
                        }}
                    >
                        <p
                            style={{
                                fontSize: '15px',
                            }}
                        >
                            ✖
                        </p>
                    </div>
                    <div className="modal-wrap">
                        <p>Click below to login from your google account.</p>
                        <br />
                        <br />
                        <span className="googleLoginButton">
                            <LoginGoogleButton
                                checkLoginAndCreateForm={
                                    checkLoginAndCreateForm
                                }
                            />
                        </span>
                    </div>
                </div>,
            );
        }
    }

    return (
        <>
            <input
                className="modal-btn"
                type="checkbox"
                id="modal-btn"
                name="modal-btn"
                // eslint-disable-next-line no-unneeded-ternary
                // checked={checkboxoption ? 'checked' : false}
                // onChange={() => {}} // eslint-disable-line no-empty-function
            />
            <label htmlFor="modal-btn" onClick={checkLoginAndCreateForm}>
                Create Form
            </label>
            {modalContent}
        </>
    );
};

export default GoogleLoginModal;
