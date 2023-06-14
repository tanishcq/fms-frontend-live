import React, { useState, useEffect } from 'react';
import { Sidebar, Navbar, FormCard, ImportSheet } from 'components';
import { toast } from 'react-toastify';
import Loader from 'components/loader/Loader';
import axios from 'axios';
import noDataPng from '../../../assets/images/noData.png';
import './Analytics.css';
import { restUrl } from '../../../endpoints';

function Analytics() {
    const [navToggle, setNavToggle] = useState(false);
    const [mainToggle, setMainToggle] = useState(false);

    const [AllFormsData, setAllFormsData] = useState([]);
    const [pageLoading, setpageLoading] = useState(true);

    function getAllFormData() {
        // setIsLoading(true);
        const token = localStorage.getItem('token');

        axios({
            method: 'GET',
            // url: `http://fms-backend-production-ce11.up.railway.app/forms/`,
            url: `${restUrl}/forms/`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(async (response) => {
                // console.log(response);
                if (response.status === 200) {
                    // setIsLoading(false);
                    // console.log(response.data);
                    setpageLoading(false);
                    setAllFormsData(response.data);
                } else {
                    toast.error('Something went wrong', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                    // setIsLoading(false);
                }
            })
            .catch((error) => {
                // setIsLoading(false);
                toast.error('Something went wrong', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                // console.error(error);
            });
    }

    useEffect(() => {
        getAllFormData();
    }, []);

    const loaderStyle = {
        width: '100%',
        height: `calc(100vh - 300px)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        verticalAlign: 'top',
        background: '#ffffff',
    };

    return (
        <>
            {/* sidebar */}
            <Sidebar navToggle={navToggle} />
            <div
                className={
                    mainToggle ? 'AnalyticsMain active' : 'AnalyticsMain'
                }
            >
                {/* navbar */}
                <Navbar
                    setNavToggle={setNavToggle}
                    setMainToggle={setMainToggle}
                />

                {/* analytics */}
                <div className="AnalyticsFormContainer">
                    <div className="AnalyticscardHeader">
                        <h2
                            style={{
                                fontSize: '2.5em',
                                fontWeight: '600',
                                color: '#000000c7',
                                textAlign: 'center',
                                borderRadius: '10px',
                                padding: '1rem 2rem',
                                width: 'fit-content',
                                margin: 'auto',
                                marginBottom: '4rem',
                            }}
                        >
                            Analytics
                        </h2>
                    </div>
                    {/* eslint-disable-next-line no-nested-ternary */}
                    {pageLoading ? (
                        <Loader Style={loaderStyle} />
                    ) : AllFormsData.length > 0 ? (
                        <table className="tab">
                            <thead className="tabthead">
                                <tr className="tabtr">
                                    <th className="tabth">S No.</th>
                                    <th className="tabth">Form Name</th>
                                    <th className="tabth">Created On</th>
                                    <th className="tabth">Edit/Delete</th>
                                    <th className="tabth">Responses/Report</th>
                                    <th className="tabth">Share using email</th>
                                </tr>
                            </thead>
                            <tbody className="tabtbody">
                                {
                                    // eslint-disable-next-line no-nested-ternary

                                    AllFormsData?.map((item, index) => (
                                        <FormCard
                                            key={item.formId}
                                            sNO={index + 1}
                                            {...item}
                                            // eslint-disable-next-line react/jsx-no-bind
                                            getAllFormData={getAllFormData}
                                        />
                                    ))
                                }
                            </tbody>
                        </table>
                    ) : (
                        <div
                            style={{
                                // border: '2px solid red',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontFamily: 'Poppins, sans-serif',

                            }}
                        >
                            <img src={noDataPng} width="400px" alt="no data" />
                            <div
                                style={{
                                    marginTop:"20px",
                                    textAlign: 'center',
                                    
                                }}
                            >
                                <h1
                                    style={{
                                        // fontSize: '20px',
                                        fontFamily: 'Poppins, sans-serif',
                                    }}
                                >
                                    OOPs! Its Empty
                                </h1>
                                <h2 style={{fontFamily: 'Poppins, sans-serif'}}>
                                    Looks like you haven&apos;t created any form
                                    yet..!!
                                </h2>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Analytics;
