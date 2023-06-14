import React from 'react';
import './Loader.css';

function Loader({Style}) {
    console.log(Style)
    return (
        <div>
            <section className="tloadingContainer" style={Style}>
                <span className="tloader" />
            </section>
        </div>
    );
}

export default Loader;
