import React from "react";
import {ButtonNext} from "../buttons/ButtonNext.tsx";

interface ItemElementsStatsParam {
    title: string;
    img: string;
    txSecond: string;
    handleClick: () => void;
}

export const ItemElementsStats: React.FC<ItemElementsStatsParam> = ({title, img, txSecond, handleClick}) => {

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            padding: '8px 8px',
            alignItems: 'center',
            alignContent: 'center',
            width: '100%',
            justifyContent: 'space-between'
        }}>

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                alignContent: 'center',
                gap: '8px'
            }}>

                <img src={img} style={{
                    width: '24px',
                    height: '24px'
                }}/>

                <span style={{
                    color: '#F0EFFB',
                    fontSize: '14px',
                    fontFamily: 'UbuntuMedium'
                }}>
                {title}
                </span>
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                alignContent: 'center',
                gap: '8px'
            }}>
                         <span style={{
                             color: '#F0EFFB',
                             fontSize: '14px',
                             fontFamily: 'UbuntuBold'
                         }}>
                {txSecond}
                </span>

                <ButtonNext sizeImg={16} onClick={handleClick} sizeBtn={24}/>
            </div>


        </div>

    )

}