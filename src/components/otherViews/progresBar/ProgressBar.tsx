
import React from 'react';

const Progressbar: React.FC = () => {
    const overlayStyle: React.CSSProperties = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20000
    };

    const loaderStyle: React.CSSProperties = {
        border: '6px dashed white',  // Dashed border for dotted effect
        borderTop: '6px dashed white',
        borderRadius: '50%',
        width: '60px',  // Smaller size
        height: '60px',
        animation: 'spin 2.5s linear infinite'
    };

    const keyframesStyle = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;

    return (
        <>
            <style>{keyframesStyle}</style>
            <div style={overlayStyle}>
                <div style={loaderStyle}></div>
            </div>
        </>
    );
};

export default Progressbar;
