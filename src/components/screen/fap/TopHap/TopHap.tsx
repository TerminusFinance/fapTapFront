import React from "react";
import {RoundButton} from "../../../otherViews/buttons/RoundButton.tsx";
import {LineProgressBar} from "../../../otherViews/progresBar/LineProgresBar.tsx";
import IcLevel from "../../../../assets/icon/icon-level.svg";
import IcCat from "../../../../assets/icon/ic_cat.svg";
import IcGift from "../../../../assets/icon/ic_gift.svg";
import IcSettings from "../../../../assets/icon/ic_settings.svg";
import {InformationBarSimple} from "../../../otherViews/informationBar/InformationBarSimple.tsx";
import IcCoins from "../../../../assets/icon/ic_coin.svg";

interface TopHapParams {
    coins: number;
    onClickProfile : () => void;

}

export const TopHap: React.FC<TopHapParams> = ({coins, onClickProfile}) => {

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
                                32.6%
                            </span>
                        </div>
                        <LineProgressBar progress={10} height={8}/>
                    </div>
                </div>

                <div style={{
                    display: "flex",
                    flexDirection: 'row',
                    gap: '8px'
                }}>
                    <RoundButton size={48} bgColor={"#000"} image={IcCat} sizeItem={24}/>
                    <RoundButton size={48} bgColor={"#000"} image={IcGift} sizeItem={24}/>
                    <RoundButton size={48} bgColor={"#000"} image={IcSettings} sizeItem={24}/>
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
                    {coins}
                </span>
                </div>

                <div style={{
                    display: 'inline-flex',
                    flexDirection: 'column',
                    gap: '4px'
                }}>

                    <InformationBarSimple txFirst={"+1"} txSecond={"per tap"}/>
                    <InformationBarSimple txFirst={"+1"} txSecond={"per hour"}/>
                </div>
            </div>

        </div>
    )
}