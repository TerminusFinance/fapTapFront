import React from "react";

interface LineProgressBarProps {
    progress: number;
    maxValue: number;
    height: number;
}

export const LineProgressBar: React.FC<LineProgressBarProps> = ({ progress, maxValue, height }) => {

    // Calculate the percentage based on progress and maxValue
    const progressPercentage = (progress / maxValue) * 100;

    return (
        <div style={{
            width: "100%",
            height: height,
            background: '#191B20',
            borderRadius: 16,
            overflow: 'hidden',
            zIndex: 2
        }}>
            <div style={{
                width: `${progressPercentage}%`,  // Use calculated percentage
                height: '100%',
                background: 'linear-gradient(93deg, #B3ACFC 0%, #584CF4 100%)',
                borderRadius: 16,
                transition: 'width 0.3s ease'
            }}/>
        </div>
    )
}
