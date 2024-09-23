import React from "react";
import IcInfo from "../../../assets/icon/ic_info_circle.svg";

interface InformationBarTwoIcParams {
    tx: string;
    onClick?: () => void | null;
    icLeft: string;
    icRight?: string| null
}

export const InformationBarTwoIc: React.FC<InformationBarTwoIcParams> = ({ tx, onClick, icLeft, icRight }) => {
    return (
        <div style={{
            paddingLeft: 8,
            paddingRight: 8,
            paddingTop: 8,
            paddingBottom: 8,
            background: 'rgb(19, 20, 24, 80%)',
            borderRadius: 999,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
            display: 'inline-flex',
            flexDirection: 'row',
            boxSizing: 'border-box',
            whiteSpace: 'nowrap',
        }} onClick={onClick}>

            <img src={icLeft} style={{
                width: "24px",
                height: '24px'
            }} />

            <span style={{
                color: "white",
                fontSize: '15px',
                fontFamily: 'UbuntuRegular',
            }}>
                {tx}
            </span>

            <img
                src={icRight ? icRight : IcInfo}
                style={{
                    width: "24px",
                    height: '24px'
                }}
                alt="Icon"
            />
        </div>
    );
}