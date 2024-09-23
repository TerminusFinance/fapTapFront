import React, {useState} from "react";
import SpinnerProgressBar from "../progresBar/SpinnerProgressBar.tsx";

interface ButtonMultiParam {
    tx: string;
    onClick: () => void;
    bgClr: string;
    onLoading: boolean;
}

export const ButtonMulti: React.FC<ButtonMultiParam> = ({tx, onClick, bgClr, onLoading}) => {
    const [isPressed, setIsPressed] = useState(false);

    return (
        <div style={{
            width: '100%',
            paddingLeft: 32,
            paddingRight: 32,
            paddingTop: 16,
            paddingBottom: 16,
            background: bgClr,
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
                display: 'flex',
                flexDirection: 'row',
                gap: '4px',
                alignItems: "center",
                alignContent: 'center'
            }}>
                {onLoading &&
                    <div style={{
                        width: '24px',
                        height: '24px'
                    }}>
                        <SpinnerProgressBar size={24} color={"white"}/>
                    </div>
                }

                {tx}
            </div>
        </div>
    )

}