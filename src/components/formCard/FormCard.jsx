/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState, useRef } from 'react';
import axios from 'axios';
import SlidingPanel from 'react-sliding-side-panel';
import Loader from 'components/loader/Loader';
import { toast } from 'react-toastify';
import { restUrl } from '../../endpoints';
import noDataPng from '../../assets/images/noData.png';
import './FormCard.css';
// import LoaderButton from 'components/loaderButton/LoaderButton';
import ResponseTable from './ResponseTable';

function FormCard({
    sNO,
    title,
    formId,
    responderUri,
    createdAt,
    _id,
    getAllFormData,
}) {
    // const [isLoading, setIsLoading] = useState(false);
    const [pageLoading, setpageLoading] = useState(true);
    const [openPanel, setOpenPanel] = useState(false);
    const [responseObject, setResponseObject] = useState({});
    const elementRef = useRef();

    const generateReport = (data) => {
        console.log(data);

        const obj = {};
        // eslint-disable-next-line no-restricted-syntax
        for (const [, key, ...values] of data) {
            if (key in obj) {
                obj[key].push([key, ...values]);
            } else {
                obj[key] = [[key, ...values]];
            }
        }

        // console.log(obj);
        const indexArray = [];
        let i = 0;
        const mainObj = {};
        // eslint-disable-next-line no-restricted-syntax
        for (const key in obj) {
            if (i < 1) {
                const questionsArr = obj[key][0];
                // console.log(questionsArr);
                questionsArr.forEach((element, index) => {
                    if (element.includes('Name of the')) {
                        indexArray.push(index);
                    }
                });
                // console.log(indexArray);
                i++;
            } else {
                i++;
                mainObj[key] = {};
                // console.log(obj[key]);
                const reponsesArray = obj[key];
                reponsesArray.forEach((element) => {
                    // console.log(element);
                    for (let index = 0; index < indexArray.length; index++) {
                        const mainIdx = indexArray[index];

                        const teachId = `${element[mainIdx]} + ${
                            data[0][mainIdx + 1].split('the')[1]
                        }`;
                        // console.log(teachId);

                        if (teachId in mainObj[key]) {
                            const tempArr = [];
                            for (let n = mainIdx + 1; n < mainIdx + 7; n++) {
                                tempArr.push(element[n]);
                            }
                            mainObj[key][teachId].push(tempArr);
                        } else {
                            const tempArr = [];
                            for (let n = mainIdx + 1; n < mainIdx + 7; n++) {
                                tempArr.push(element[n]);
                            }
                            mainObj[key][teachId] = [tempArr];
                        }
                    }
                });
            }
        }
        // console.log(obj);
        console.log(mainObj);
        setResponseObject(mainObj);
        setpageLoading(false);

        // console.log(responseObject);
        // console.log(Object.keys(mainObj));
    };

    async function getSheetResponses(spreadsheetId) {
        const accessTokenn = sessionStorage.getItem('googleAccessToken');
        fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A1:ZZ1000`,
            {
                method: 'GET',
                headers: new Headers({
                    Authorization: `Bearer ${accessTokenn}`,
                    'Content-Type': 'application/json',
                }),
            },
        )
            .then((response) => {
                // console.log(response);
                return response.json();
            })
            .then((data) => {
                generateReport(data.values);
            })
            .catch((error) => {
                console.log(error);
                toast.error('Something went wrong', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            });
    }

    function getFormResponses(reportFormId) {
        setOpenPanel(true);
        const accessToken = sessionStorage.getItem('googleAccessToken');
        fetch(`https://forms.googleapis.com/v1/forms/${reportFormId}`, {
            method: 'GET',
            headers: new Headers({
                Authorization: `Bearer ${accessToken}`,
            }),
            // body: JSON.stringify(update),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                // console.log(data);
                if (data.linkedSheetId) {
                    getSheetResponses(data.linkedSheetId);
                } else {
                    toast.error(
                        'Google Sheet corresponding to this form not found',
                        {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        },
                    );
                    console.log(data);
                }
            })
            .catch((error) => {
                toast.error('Something went wrong', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                console.log(error);
            });
    }

    const editForm = (editFormId) => {
        window.open(
            `https://docs.google.com/forms/d/${editFormId}/edit`,
            '_blank',
        );
    };

    const deleteForm = (deleteFormId) => {
        const token = localStorage.getItem('token');
        // elementRef.current.classList.add("deleting");

        if (!window.confirm('Are you sure you want to delete the form?'))
            return;

        elementRef.current.style.opacity = '0.5';
        elementRef.current.style.pointerEvents = 'none';

        // console.log(deleteFormId);
        axios({
            method: 'DELETE',
            // url: `http://fms-backend-production-ce11.up.railway.app/forms/${deleteFormId}`,
            url: `${restUrl}/forms/${deleteFormId}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                // console.log(response);
                if (response.status !== 500 || response.status !== 400) {
                    getAllFormData();
                }
            })
            .catch((err) => {
                console.log(err?.response?.data);
            });
    };

    function shareForm() {
        const encodedMessage = encodeURIComponent(responderUri);
        window.open(`mailto:?subject=${title}&body=${encodedMessage}`);
        // window.open(`https://api.whatsapp.com/send?text=${encodedMessage}`);
    }

    const loaderStyle = {
        width: '100%',
        height: `calc(100vh - 90px)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        verticalAlign: 'top',
        flexDirection: 'column',
        background: '#ffffff',
    };

    return (
        <>
            <tr className="tabtr" ref={elementRef}>
                <td className="tabtd" data-label="S No.">
                    {sNO}
                </td>
                <td data-label="Form Name" className="tab-title">
                    {title}
                </td>
                <td className="tabtd" data-label="Created On">
                    {createdAt?.split('T')[0]}
                </td>
                <td className="tabtd" data-label="Edit Form">
                    <button
                        type="button"
                        className="editBtn"
                        onClick={() => {
                            editForm(formId);
                        }}
                    >
                        Edit Form
                    </button>
                    <button
                        type="button"
                        className="deleteBtn"
                        onClick={() => {
                            deleteForm(_id);
                        }}
                        // ref={elementRef}
                    >
                        <i className="fa-solid fa-trash" />
                    </button>
                </td>
                <td className="tabtd" data-label="Responses">
                    <button
                        type="button"
                        className="reportBtn"
                        onClick={() => {
                            getFormResponses(formId);
                        }}
                    >
                        Generate Report
                    </button>
                </td>

                <td className="tabtd" data-label="Share">
                    <button
                        type="button"
                        className="shareFormBtn"
                        onClick={() => {
                            shareForm();
                        }}
                    >
                        Share
                    </button>
                </td>
            </tr>
            <SlidingPanel type="right" isOpen={openPanel} size={90}>
                <div>
                    <div
                        style={{
                            padding: '70px 20px 20px 20px',
                        }}
                    >
                        {/* eslint-disable-next-line no-nested-ternary */}
                        {pageLoading ? (
                            <Loader Style={loaderStyle} />
                        ) : Object.keys(responseObject).length > 0 ? (
                            Object.keys(responseObject).map((key, i) => (
                                <ResponseTable
                                    responseData={responseObject[key]}
                                    key={i}
                                    title={key}
                                />
                            ))
                        ) : (
                            <div style={loaderStyle}>
                                <img
                                    src={noDataPng}
                                    width="250px"
                                    alt="no data"
                                />
                                <h1
                                    style={{
                                        marginTop: '10px',
                                        fontSize: '18px',
                                    }}
                                >
                                    No Responses received yet!
                                </h1>
                            </div>
                        )}
                    </div>
                    <button
                        type="button"
                        style={{
                            position: 'absolute',
                            top: '20px',
                            left: '20px',
                            fontSize: '1.6rem',
                            background: 'transparent',
                            boxShadow: 'rgb(136 136 136) 0px 0px 2px 0px',
                            padding: '5px 15px',
                            cursor: 'pointer',
                            borderRadius: '10px',
                        }}
                        onClick={() => setOpenPanel(false)}
                    >
                        ✖
                    </button>
                </div>
            </SlidingPanel>
        </>
    );
}

export default FormCard;
