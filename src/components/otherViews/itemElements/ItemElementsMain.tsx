import React from "react";
import {ButtonNext} from "../buttons/ButtonNext.tsx";
import IcCoins from "../../../assets/icon/ic_coin.svg";

interface ItemElementsMainParam {
    title: string;
    img: string;
    txSecond: string;
    btnInformTx: string;
}

export const ItemElementsMain: React.FC<ItemElementsMainParam> = ({title, img, txSecond, btnInformTx}) => {

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '8px 8px',
            borderRadius: "16px",
            border: "2px solid #191B20",
            marginLeft: '8px',
            marginRight: '8px'
        }}>

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>

                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <img src={img} style={{
                        width: '56px',
                        height: '56px',
                        border: "1.5px solid white",
                        borderRadius: '999px'
                    }}/>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        justifyItems: 'center'
                    }}>

                    <span style={{
                        color: '#F0EFFB',
                        fontSize: '16px',
                        fontFamily: 'UbuntuMedium'
                    }}>{title}</span>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}>

                            <span style={{
                                color: '#B5B7B9',
                                fontSize: '14px',
                                fontFamily: 'UbuntuMedium'
                            }}>
                            {txSecond}
                        </span>

                        </div>

                    </div>
                </div>


                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                    gap: '10px'
                }}>

                    <div style={{
                        padding: '8px 12px',
                        border: "1px solid #252830",
                        borderRadius: '999px',
                        display: 'flex',
                        justifyContent: 'center',
                        justifyItems: 'center',
                        alignItems: "center",
                        alignContent: 'center',
                        height: '40px',
                    }}>
                        <img src={IcCoins} style={{
                            width: '16px', height: '16px'
                        }}/>

                    <span style={{
                        color: '#B5B7B9',
                        fontSize: '14px',
                        fontFamily: 'UbuntuMedium'
                    }}>{btnInformTx}</span>
                    </div>
                    <ButtonNext sizeBtn={32} onClick={() => {}} sizeImg={16}/>
                </div>

            </div>


        </div>

    )

}