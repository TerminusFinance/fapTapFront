import React from 'react';

interface SpinnerProgressBarProps {
    size?: number; // Опциональный размер в пикселях
    color?: string; // Опциональный цвет обводки
}

const SpinnerProgressBar: React.FC<SpinnerProgressBarProps> = ({ size = 50, color = 'white' }) => {
    const spinnerStyle: React.CSSProperties = {
        display: 'inline-block',
        width: `${size}px`,
        height: `${size}px`,
    };

    const svgStyle: React.CSSProperties = {
        animation: 'rotate 2s linear infinite',
        width: '100%',
        height: '100%',
    };

    const circleStyle: React.CSSProperties = {
        stroke: color, // Цвет круга теперь динамический
        strokeWidth: 4,
        fill: 'none',
        strokeLinecap: 'round',
        animation: 'dash 1.5s ease-in-out infinite',
    };

    return (
        <>
            <div style={spinnerStyle}>
                <svg style={svgStyle} viewBox="0 0 50 50">
                    <circle style={circleStyle} cx="25" cy="25" r="20" />
                </svg>
            </div>
            <style>
                {`
                @keyframes rotate {
                    100% {
                        transform: rotate(360deg);
                    }
                }

                @keyframes dash {
                    0% {
                        stroke-dasharray: 1, 150;
                        stroke-dashoffset: 0;
                    }
                    50% {
                        stroke-dasharray: 90, 150;
                        stroke-dashoffset: -35;
                    }
                    100% {
                        stroke-dasharray: 90, 150;
                        stroke-dashoffset: -124;
                    }
                }
                `}
            </style>
        </>
    );
};

export default SpinnerProgressBar;
