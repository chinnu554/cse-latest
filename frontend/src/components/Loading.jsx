import React from 'react';
import './Loading.css';

const Loading = ({ message = "Loading...", fullScreen = false, minHeight }) => {
    return (
        <div
            className={`loading-container ${fullScreen ? 'fullscreen' : ''}`}
            style={minHeight ? { minHeight } : {}}
        >
            <div className="spinner"></div>
            {message && <p className="loading-text">{message}</p>}
        </div>
    );
};

export default Loading;
