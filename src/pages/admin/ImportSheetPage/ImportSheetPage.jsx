import React, { useState } from 'react';
import { Sidebar, Navbar, ImportSheet } from 'components';
import './ImportSheetPage.css';

const ImportSheetPage = () => {
    const [navToggle, setNavToggle] = useState(false);
    const [mainToggle, setMainToggle] = useState(false);
    return (
        <>
            <Sidebar navToggle={navToggle} />
            <div
                className={
                    mainToggle ? 'ImportSheetMain active' : 'ImportSheetMain'
                }
            >
                {/* navbar */}
                <Navbar
                    setNavToggle={setNavToggle}
                    setMainToggle={setMainToggle}
                />
                <main>
                    <div className="ImportSheetContainer">
                        <div className="box">
                            <ImportSheet />
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default ImportSheetPage;
