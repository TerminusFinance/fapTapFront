import React, {useState} from "react";

interface ButtonMainParam {
    tx: string;
    onClick: () => void;
    onRed?: boolean;
    imgInTx?: string | null;
}

export const ButtonMain: React.FC<ButtonMainParam> = ({tx, onClick, onRed, imgInTx}) => {
    const [isPressed, setIsPressed] = useState(false);

    return (
        <div style={{
            width: '100%',
            paddingLeft: 32,
            paddingRight: 32,
            paddingTop: 16,
            paddingBottom: 16,
            background: onRed? '#F44C54' : '#584CF4',
            borderRadius: 999,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
            display: 'inline-flex',
            transition: "transform 0.1s ease, box-shadow 0.1s ease",
            cursor: "pointer",
            transform: isPressed ? "scale(0.95)" : "scale(1)",
            boxShadow: isPressed
                ? "0 4px 8px rgba(0, 0, 0, 0.2)"
                : "",
            outline: "none",
            userSelect: "none",
            border: "none",
            WebkitTapHighlightColor: "transparent",
        }} onClick={onClick}
             onMouseDown={() => setIsPressed(true)}
             onMouseUp={() => setIsPressed(false)}
             onMouseLeave={() => setIsPressed(false)}
             onTouchStart={() => setIsPressed(true)}
             onTouchEnd={() => setIsPressed(false)}
        >
            <div style={{
                textAlign: 'right',
                color: '#F0EFFB',
                fontSize: 16,
                fontFamily: 'UbuntuBold',
            }}>{tx}
            </div>
            {imgInTx &&
            <img src={imgInTx} style={{
                width: '16px',
                height: '16px'
            }}/>
            }
        </div>
    )

}