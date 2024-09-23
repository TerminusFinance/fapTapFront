import React from "react";
import IcInfo from "../../../assets/icon/ic_info_circle.svg";

interface InformationBarSimpleParams {
    txFirst: string;
    txSecond: string;
    onClick?: () => void | null;
}

export const InformationBarSimple: React.FC<InformationBarSimpleParams> = ({txFirst, txSecond, onClick}) => {

    return (
        <div style={{
            paddingLeft: 8,
            paddingRight: 8,
            paddingTop: 8,
            paddingBottom: 8,
            background: 'rgb(19, 20, 24, 72%)',
            borderRadius: 999,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
            display: 'inline-flex', // измените на inline-flex чтобы элемент занимал только необходимую ширину
            flexDirection: 'row',
            boxSizing: 'border-box'
        }} onClick={onClick}>
            <span style={{
                color: 'white',
                fontSize: '12px',
                fontFamily: 'UbuntuBold'
            }}>
                {txFirst}
            </span>

            <span style={{
                color: '#B5B7B9',
                fontSize: '12px',
                fontFamily: 'UbuntuRegular'
            }}>
                {txSecond}
            </span>

            <img src={IcInfo} style={{
                width: "16px",
                height: '16px'
            }}/>

        </div>
    )
}
