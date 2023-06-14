import React, { useState } from 'react';
import { read, utils } from 'xlsx';
import SlidingPanel from 'react-sliding-side-panel';
import Loader from 'components/loader/Loader';
import { toast } from 'react-toastify';
import ResponseTable from '../formCard/ResponseTable';
import noDataPng from '../../assets/images/noData.png';

const ImportSheet = () => {
    const [file, setFile] = useState(null);
    const [pageLoading, setpageLoading] = useState(true);
    const [openPanel, setOpenPanel] = useState(false);
    const [responseObject, setResponseObject] = useState({});

    const handleFileChange = (event) => {
        const currentfile = event.target.files[0];
        setFile(currentfile);
    };

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

    const handleUpload = () => {
        setOpenPanel(true);
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = utils.sheet_to_json(worksheet, { header: 1 });
            generateReport(jsonData);
        };
        reader.readAsArrayBuffer(file);
    };

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
            <div className="generalMainBox">
                <input type="file" onChange={handleFileChange} />
                <button type="button" onClick={handleUpload}>
                    Generate Report
                </button>
            </div>

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
};

export default ImportSheet;
