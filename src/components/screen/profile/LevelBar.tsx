import React from "react";
import {LineProgressBar} from "../../otherViews/progresBar/LineProgresBar.tsx";
import {ButtonNext} from "../../otherViews/buttons/ButtonNext.tsx";

interface LevelBarParam {
    title: string;
    img: string;
    secondImg: string;
    txSecond: string;
    progress: number;
    maxProgress: number;
    btnInformTx: string;
    onClick: () => void;
}

export const LevelBar: React.FC<LevelBarParam> = ({title, img, secondImg, txSecond, progress, maxProgress,btnInformTx, onClick}) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            background: '#191B20',
            padding: '8px 8px',
            borderRadius: "16px"
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
                    gap: '10px',
                }}>
                    <img src={img} style={{
                        width: '56px',
                        height: '56px',
                        border: "1px solid white",
                        borderRadius: "999px",
                        objectFit: 'cover'
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

                            <img src={secondImg} style={{
                                width: '16px',
                                height: '16px'
                            }}/>
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
                        padding: '8px 8px',
                        border: "1px solid #252830",
                        borderRadius: '999px',
                        display: 'flex',
                        justifyContent: 'center',
                        justifyItems: 'center',
                        height: '40px',
                    }}>
                    <span style={{
                        color: '#B5B7B9',
                        fontSize: '14px',
                        fontFamily: 'UbuntuMedium'
                    }}>{btnInformTx}</span>
                    </div>
                    <ButtonNext sizeBtn={32} onClick={() => {onClick()}} sizeImg={16}/>
                </div>

            </div>

            <div style={{position: 'relative', width: '100%', marginTop: '8px'}}>
                <LineProgressBar progress={progress} height={24} maxValue={maxProgress}/>

                    <span style={{
                        position: 'absolute',
                        left: '10px', // Сдвиг текста от левого края
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#F0EFFB',
                        fontSize: '14px',
                        fontFamily: 'UbuntuMedium'
                    }}>
                        {progress}
                    </span>
            </div>

        </div>
    )
}