import React, { useState } from 'react';
import axios from 'axios';
import LoaderButton from 'components/loaderButton/LoaderButton';
import { Sidebar, Navbar } from 'components';
import { toast } from 'react-toastify';
import './ReportBug.css';
import { restUrl } from '../../../endpoints';

function ReportBug() {
    const [bugReport, setBugReport] = useState('');
    const [navToggle, setNavToggle] = useState(false);
    const [mainToggle, setMainToggle] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('user'));

    function sendBugReport(e) {
        e.preventDefault();

        if(bugReport.length > 0){
            setIsLoading(true);
            axios({
                method: 'POST',
                url: `${restUrl}/users/reportBugs`,
                data: { description: bugReport },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    console.log(response);
                    toast.success('Bug report send successfully', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                    setBugReport('');
                })
                .catch((err) => {
                    console.log(err.response?.data);
                    toast.error('Something went wrong', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                })
                .finally(() => setIsLoading(false));
        }
        else{
            toast.error('Report cannot be empty', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    }

    return (
        <>
            {/* sidebar */}
            <Sidebar navToggle={navToggle} />
            <div
                className={
                    mainToggle ? 'ReportBugMain active' : 'ReportBugMain'
                }
            >
                {/* navbar */}
                <Navbar
                    setNavToggle={setNavToggle}
                    setMainToggle={setMainToggle}
                />
                <main>
                    <div className="reportABugContainer">
                        <div className="box">
                            <form
                                name="reportABugForm"
                                id="reportABugForm"
                                onSubmit={sendBugReport}
                            >
                                <h2 className="title">Give your Feedback</h2>

                                <div className="emails">
                                    <label
                                        className="inputLabel"
                                        htmlFor="email"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="yourEmail"
                                        name="yourEmail"
                                        value={userData?.email}
                                        disabled
                                    />
                                </div>

                                <div className="feedback">
                                    <label
                                        className="inputLabel"
                                        htmlFor="feedback"
                                    >
                                        Feedback
                                    </label>
                                    <textarea
                                        name="message"
                                        id="feedback"
                                        cols="150"
                                        rows="8"
                                        value={bugReport}
                                        onChange={(e) => {
                                            setBugReport(e.target.value);
                                        }}
                                        required
                                    />
                                </div>

                                {/* <div className="buttonSubmit">
                                    <button
                                        type="submit"
                                        id="submitBtn"
                                        className="submitBtn"
                                    >
                                        <span>Submit</span>
                                    </button>
                                </div> */}
                                <LoaderButton
                                    display="Submit"
                                    id="submitBtn"
                                    className="submitBtn"
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

export default ReportBug;
