const ResponseTableRow = ({ responseData, faculty, SNo }) => {
    console.log(responseData);

    const result = responseData[0].map((item, index) => {
        return responseData.reduce((sum, array) => {
            return sum + +array[index];
        }, 0);
    });
    console.log(result);

    const maxMarks = 5 * +responseData.length;
    return (
        <>
            <tr>
                <td className="data" rowSpan="6">
                    {SNo}
                </td>
                <td className="data" rowSpan="6">
                    {faculty.split(' + ')[0]}
                </td>
                <td className="data" rowSpan="6">
                    {faculty.split(' + ')[1]}
                </td>
                <td className="data">Subject Knowledge(A)</td>
                <td className="data">{result[0]}</td>
                <td className="data">{maxMarks}</td>
                <td className="data">
                    {`${((result[0] / maxMarks) * 100).toFixed(2)}%`}
                </td>
                <td className="data" rowSpan="6">
                    {`${(
                        (((result[0] / maxMarks) * 100 +
                            (result[1] / maxMarks) * 100 +
                            (result[2] / maxMarks) * 100 +
                            (result[3] / maxMarks) * 100 +
                            (result[4] / maxMarks) * 100 +
                            (result[5] / maxMarks) * 100) /
                            600) *
                        100
                    ).toFixed(2)}%`}
                </td>
            </tr>
            <tr>
                <td className="data">Communication Skills(B)</td>
                <td className="data">{result[1]}</td>
                <td className="data">{maxMarks}</td>
                <td className="data">
                    {`${((result[1] / maxMarks) * 100).toFixed(2)}%`}
                </td>
            </tr>
            <tr>
                <td className="data">
                    Interactive approach and clear doubts(C)
                </td>
                <td className="data">{result[2]}</td>
                <td className="data">{maxMarks}</td>
                <td className="data">
                    {`${((result[2] / maxMarks) * 100).toFixed(2)}%`}
                </td>
            </tr>
            <tr>
                <td className="data">Cover all topics(D)</td>
                <td className="data">{result[3]}</td>
                <td className="data">{maxMarks}</td>
                <td className="data">
                    {`${((result[3] / maxMarks) * 100).toFixed(2)}%`}
                </td>
            </tr>
            <tr>
                <td className="data">Punctuality in taking classes(E)</td>
                <td className="data">{result[4]}</td>
                <td className="data">{maxMarks}</td>
                <td className="data">
                    {`${((result[4] / maxMarks) * 100).toFixed(2)}%`}
                </td>
            </tr>
            <tr>
                <td className="data">Control over the class(F)</td>
                <td className="data">{result[5]}</td>
                <td className="data">{maxMarks}</td>
                <td className="data">
                    {`${((result[5] / maxMarks) * 100).toFixed(2)}%`}
                </td>
            </tr>
        </>
    );
};

export default ResponseTableRow;
