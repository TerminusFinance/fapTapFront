import React, {useState} from "react";

interface ButtonRoundParam {
    img: string
    onClick: () => void;
    size?: number;
}

export const ButtonRound: React.FC<ButtonRoundParam> = ({ onClick, img, size }) => {
    const [isPressed, setIsPressed] = useState(false);

    return (
        <div
            style={{
                width: size? `${size}px` : '56px',
                height: size? `${size}px` : '56px',
                background: '#252830',
                display: "flex",
                borderRadius: '50%',
                justifyContent: "center",
                alignItems: "center",
                transition: "transform 0.1s ease, box-shadow 0.1s ease, background-color 0.1s ease",
                cursor: "pointer",
                transform: isPressed ? "scale(0.95)" : "scale(1)",
                boxShadow: isPressed
                    ? "0 2px 4px rgba(0, 0, 0, 0.2)"
                    : "",
                outline: "none",
                userSelect: "none",
                border: "none",
                WebkitTapHighlightColor: "transparent", // Убираем выделение на мобильных устройствах
            }}
            onClick={onClick}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => setIsPressed(false)}
            onTouchStart={() => setIsPressed(true)}
            onTouchEnd={() => setIsPressed(false)}
        >
            <img src={img} style={{
                width: '24px',
                height: '24px',
            }}/>
        </div>
    );
};
