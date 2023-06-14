/* eslint-disable */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import User from '../../assets/images/Sample_User_Icon.png';
import './Navbar.css';

const Navbar = ({setMainToggle,setNavToggle}) => {

    const userName = (JSON.parse(localStorage.getItem('user')))?.userName;
    const userImage = JSON.parse(localStorage.getItem('userImage'));
    // console.log(userImage);

    function adminSidebarToggle() {
        setNavToggle((prev) => !prev);
        setMainToggle((prev) => !prev);
    }

    return (
        <>
              <div className="__topbar">
                        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                        <div
                            onClick={adminSidebarToggle}
                            id="__toggle"
                        >
                            <i className="fa-solid fa-bars" />
                        </div>
                        {/* <div>
                            Feedback Management Portal for Maharaja Surajmal
                            Institute (GGSIPU)
                        </div> */}
                        <div className="__user">
                            <h3 style={{margin: '1rem'}}>Welcome, {userName}</h3>
                            <div className="__imgBx">
                                <img src={userImage? userImage : User} alt="User logo" />
                            </div>
                        </div>
                    </div>
        </>
    );
};

export default Navbar;
