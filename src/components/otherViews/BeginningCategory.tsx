import React from "react";
import IcCircle from "../../assets/icon/ic_circle_pos.svg";

interface BeginningCategoryParam {
    tx: string;
}

export const BeginningCategory: React.FC<BeginningCategoryParam> = ({tx}) => {

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
            gap: '8px',
        }}>

            <img src={IcCircle} style={{
                width: '8px',
                height: '8px'
            }}/>

            <span style={{
                fontSize: '18px',
                fontFamily: 'UbuntuBold',
                color: '#F0EFFB'
            }}>
                {tx}
            </span>

        </div>
    )

}