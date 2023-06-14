import { useRef } from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';
import ResponseTableRow from './ResponseTableRow';

const ResponseTable = ({ responseData, title }) => {
    const tableRef = useRef(null);
    console.log(responseData);

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: title,
        sheet: 'Faculty Feedback',
    });

    // responseData.forEach(element => {

    // });
    return (
        <>
            <button
                type="button"
                onClick={onDownload}
                style={{
                    display: 'block',
                    border: 'none',
                    color: '#fff',
                    padding: '5px 10px',
                    fontSize: '16px',
                    marginBottom: '6px',
                    borderRadius: '5px',
                    transition: 'all 0.3s ease-in-out',
                    backgroundColor: 'rgb(0, 145, 0)',
                    marginLeft: 'auto',
                }}
            >
                {' '}
                {`Export ${title}`}{' '}
            </button>
            <table className="reportTable" ref={tableRef}>
                <thead>
                    <tr>
                        <th
                            style={{
                                fontSize: '2rem',
                            }}
                            className="head"
                            colSpan="8"
                        >
                            {title}
                        </th>
                    </tr>
                    <tr>
                        <th className="head">S. No. </th>
                        <th className="head"> Faculty </th>
                        <th className="head">Subject </th>
                        <th className="head"> Attributes </th>
                        <th className="head"> Total Points </th>
                        <th className="head"> Maximum Points </th>
                        <th className="head"> Points Scored in % </th>
                        <th className="head"> Average Percentage % </th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(responseData).map((key, i) => (
                        <ResponseTableRow
                            responseData={responseData[key]}
                            faculty={key}
                            key={i}
                            SNo={i + 1}
                        />
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default ResponseTable;
