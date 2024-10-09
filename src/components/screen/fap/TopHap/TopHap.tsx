import React from "react";
import {RoundButton} from "../../../otherViews/buttons/RoundButton.tsx";
import {LineProgressBar} from "../../../otherViews/progresBar/LineProgresBar.tsx";
import IcLevel from "../../../../assets/icon/icon-level.svg";
import IcCat from "../../../../assets/icon/ic_cat.svg";
import IcGift from "../../../../assets/icon/ic_gift.svg";
import IcSettings from "../../../../assets/icon/ic_settings.svg";
import {InformationBarSimple} from "../../../otherViews/informationBar/InformationBarSimple.tsx";
import IcCoins from "../../../../assets/icon/ic_coin.svg";
import {formatNumber} from "../../../../core/Utils.ts";

interface TopHapParams {
    coins: number;
    perTap: number;
    progress: number;
    maxProgress: number;
    onClickProfile : () => void;
    onClickSettings: () => void;
    onClickDaily: () => void;
}

export const TopHap: React.FC<TopHapParams> = ({coins, onClickProfile,perTap, progress, maxProgress,onClickSettings, onClickDaily}) => {

    const progressPercentage = (progress / maxProgress) * 100;

    return (
        <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>

            <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'center',
                alignItems: 'center',
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                }}>
                    <RoundButton size={48} bgColor={"#222"} tx={'o'} clickHandler={onClickProfile}/>
                    <div style={{display: 'flex', flexDirection: 'column', marginLeft: '16px'}}>
                        <div style={{
                            display: "flex",
                            flexDirection: 'row',
                            marginBottom: '4px'
                        }}>
                            <div style={{display: 'flex', flexDirection: 'row'}}>


                                <img src={IcLevel} style={{width: '16px', height: '16px'}}/>

                                <span style={{
                                    marginRight: '12px',
                                    color: '#B5B7B9',
                                    fontFamily: "UbuntuRegular",
                                    fontSize: '14px'
                                }}>
                                Beginner
                            </span>
                            </div>

                            <span style={{color: 'white', fontFamily: 'UbuntuMedium', fontSize: '14px'}}>
                                {progressPercentage.toFixed(1)}%
                            </span>
                        </div>
                        <LineProgressBar progress={progress} height={8} maxValue={maxProgress}/>
                    </div>
                </div>

                <div style={{
                    display: "flex",
                    flexDirection: 'row',
                    gap: '8px'
                }}>
                    <RoundButton size={48} bgColor={"#000"} image={IcCat} sizeItem={24}/>
                    <RoundButton size={48} bgColor={"#000"} image={IcGift} sizeItem={24} clickHandler={onClickDaily}/>
                    <RoundButton size={48} bgColor={"#000"} image={IcSettings} sizeItem={24} clickHandler={onClickSettings}/>
                </div>

            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                marginTop: '8px',
                alignItems: 'center',
                alignContent: 'center'
            }}>

                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '8px',
                    alignItems: 'center',
                    alignContent: 'center'
                }}>
                    <img src={IcCoins} style={{ width: '32px', height: '32px'}}/>
                    <span style={{
                        color: '#F0EFFB',
                        stroke: 'black',
                        strokeWidth: '1px',
                        fontFamily: 'UbuntuBold',
                        fontSize: '24px'
                    }}>
                    {formatNumber(coins)}
                </span>
                </div>

                <div style={{
                    display: 'inline-flex',
                    flexDirection: 'column',
                    gap: '4px'
                }}>

                    <InformationBarSimple txFirst={`+${perTap}`} txSecond={"per tap"}/>
                    <InformationBarSimple txFirst={"+1"} txSecond={"per hour"}/>
                </div>
            </div>

        </div>
    )
}