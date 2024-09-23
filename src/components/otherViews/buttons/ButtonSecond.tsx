import React, { useState } from "react";

interface ButtonSecondParam {
    tx: string;
    onClick: () => void;
}

export const ButtonSecond: React.FC<ButtonSecondParam> = ({ tx, onClick }) => {
    const [isPressed, setIsPressed] = useState(false);

    return (
        <div
            style={{
                width: "100%",
                paddingLeft: 32,
                paddingRight: 32,
                paddingTop: 16,
                paddingBottom: 16,
                background: "#252830",
                borderRadius: 999,
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
                display: "inline-flex",
                transition: "transform 0.1s ease, box-shadow 0.1s ease",
                cursor: "pointer",
                transform: isPressed ? "scale(0.95)" : "scale(1)",
                boxShadow: isPressed
                    ? "0 4px 8px rgba(0, 0, 0, 0.2)"
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
            <div
                style={{
                    textAlign: "center",
                    color: "#B5B7B9",
                    fontSize: 16,
                    fontFamily: "UbuntuBold",
                }}
            >
                {tx}
            </div>
        </div>
    );
};
