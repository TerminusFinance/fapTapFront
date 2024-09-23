import React from "react";

interface LineProgressBarProps {
    progress: number;
    height: number;
    name: string;
    secondName: string;
}

export const LineProgressBarLevel: React.FC<LineProgressBarProps> = ({progress, height, name, secondName}) => {
    return (
        <div style={{ position: 'relative', width: "100%", height: height }}>
            {/* Контейнер для текста слева */}
            <div style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#fff',
                zIndex: 3,
                fontSize: '14px',
                fontWeight: 'bold',
                paddingLeft: '8px'
            }}>
                {`${name}`}
            </div>

            {/* Контейнер для текста справа */}
            <div style={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#fff',
                zIndex: 3,
                fontSize: '14px',
                fontWeight: 'bold',
                paddingRight: '8px'
            }}>
                {secondName}
            </div>

            {/* Фон прогресс-бара */}
            <div style={{
                width: "100%",
                height: height,
                background: '#191B20',
                borderRadius: 16,
                overflow: 'hidden',
                zIndex: 2
            }}>
                {/* Прогресс */}
                <div style={{
                    width: `${progress}%`,
                    height: '100%',
                    background: 'linear-gradient(93deg, #B3ACFC 0%, #584CF4 100%)',
                    borderRadius: 16,
                    transition: 'width 0.3s ease'
                }}/>
            </div>
        </div>
    );
};
