/* eslint-disable */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import * as FaIcons from 'react-icons/fa';
// import * as AiIcons from 'react-icons/ai';

// import { LoginPage, LandingPage } from 'pages';

import './Sidebar.css';

const Sidebar = ({ navToggle }) => {
    const SideBarPathIndex = {
        '/admin/dashboard': 0,
        '/admin/analytics': 1,
        '/admin/import-sheet': 2,
        '/admin/report-bug': 3,
    };
    // eslint-disable-next-line
    const [selectedOption, setSelectedOption] = useState(
        SideBarPathIndex[window.location.pathname],
    );

    const navigate = useNavigate();

    const logout = () => {
        toast.success('Logged out Successfully');
        localStorage.removeItem('token');
        navigate('/login');
    };
    return (
        <>
            <div className={navToggle ? '__navigation active' : '__navigation'}>
                <ul>
                    <li>
                        <a>
                            <span className="icon">
                            <i className="fa-solid fa-book-open-reader"/>
                            </span>
                            <span
                                className="title"
                                style={{
                                    fontSize: '2rem',
                                }}
                            >
                                Feedback Portal
                            </span>
                        </a>
                    </li>
                    <li className={selectedOption==0?'activePage': null}>
                        <Link to="/admin/dashboard">
                            <span className="icon">
                            <i className="fa-solid fa-house"/>
                            </span>
                            <span className="title">Dashboard</span>
                        </Link>
                    </li>
                    <li className={selectedOption==1?'activePage': null}>
                        <Link to="/admin/analytics">
                            <span className="icon">
                            <i className="fa-solid fa-chart-line"/>
                            </span>
                            <span className="title">Analytics</span>
                        </Link>
                    </li>
                    {/* <li className={selectedOption==2?'activePage': null}>
                        <Link to="/admin/change-password">
                            <span className="icon">
                                <i className="fa-solid fa-lock" />
                            </span>
                            <span className="title">Change Password</span>
                        </Link>
                    </li> */}
                    <li className={selectedOption==2?'activePage': null}>
                        <Link to="/admin/import-sheet">
                            <span className="icon">
                                <i className="fa-solid fa-lock" />
                            </span>
                            <span className="title">Import file</span>
                        </Link>
                    </li>
                    <li className={selectedOption==3?'activePage': null}>
                        <Link to="/admin/report-bug">
                            <span className="icon">
                                <i className="fa-solid fa-message" />
                            </span>
                            <span className="title">Report a Bug</span>
                        </Link>
                    </li>
                    <li>
                        <a style={{"cursor":"pointer"}} onClick={logout}>
                            <span className="icon">
                                <i className="fa-solid fa-right-from-bracket" />
                            </span>
                            <span className="title">Sign Out</span>
                        </a>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Sidebar;
