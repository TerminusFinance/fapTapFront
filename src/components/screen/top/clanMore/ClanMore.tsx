import React, {useState} from "react";
import {Clan} from "../../../../core/RemoteWorks/TopRemote.tsx";
import IcHeaderTop from "../../../../assets/icon/ic_header_top.svg";
import NavigationBar from "../../../otherViews/navigationBar/NavigationBar.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import IcCoins from "../../../../assets/icon/ic_coin.svg";
import {formatNumberToK, handleCopy, sendToTgChose, useTelegramBackButton} from "../../../../core/Utils.ts";
import {MiddleDie} from "../../../otherViews/die/MiddleDie.tsx";
import IcCup from "../../../../assets/icon/ic_trophy.svg";
import {ButtonMulti} from "../../../otherViews/buttons/ButtonMulti.tsx";
import {ButtonRound} from "../../../otherViews/buttons/ButtonRound.tsx";
import IcCopy from "../../../../assets/icon/ic_copy.svg";
import {useToast} from "../../../otherViews/toast/ToastContext.tsx";
import {ButtonMain} from "../../../otherViews/buttons/ButtonMain.tsx";
import {ModalRating} from "../../../modal/modalRating/ModalRating.tsx";

export const ClanMore: React.FC = () => {
    try {
        useTelegramBackButton(true)
    } catch (e) {
        console.log("error in postEvent - ", e)
    }
    // const [loading, setLoading] = useState(false);
    const location = useLocation()
    const {clanItem} = location.state as { clanItem: Clan }
    // setLoading(false)
    const navigate = useNavigate();

    const handleNav = (marsh: string) => {
        navigate(`/${marsh}`);
    };

    const {showToast} = useToast();
    const [isVisibleModalrating, setIsVisibleModalrating] = useState(false)
    const handleShowToast = (message: string, type: 'success' | 'error' | 'info') => {
        showToast(message, type);
    };

    const closeModal = () => {
        setIsVisibleModalrating(false)
    }


    return (
        <div style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            maxHeight: '100vh',
            background: '#131418',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflow: 'hidden',
            boxSizing: 'border-box',
            justifyContent: 'space-between',
        }}>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                // height: '100%',
                overflowY: 'auto',
            }}>


                <div style={{
                    width: 390,
                    height: 345,
                    paddingBottom: 173,
                    paddingLeft: 34,
                    paddingRight: 34,
                    left: 0,
                    top: 0,
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'inline-flex'
                }}>
                    <div style={{
                        width: 322,
                        height: 90,
                        background: 'linear-gradient(180deg, #B3ACFC 0%, #584CF4 100%)',
                        boxShadow: '0px 0px 200px rgba(0, 0, 0, 0.25)',
                        borderRadius: '50%',
                        filter: 'blur(200px)',
                        zIndex: 0
                    }}/>
                </div>

                <img src={IcHeaderTop} style={{
                    width: '100px',
                    height: '100px',
                    marginBottom: '8px',
                    marginTop: '32px'
                }}/>

                <span style={{
                    fontFamily: 'UbuntuBold',
                    color: '#F0EFFB',
                    fontSize: '24px',
                    marginBottom: '8px'
                }}>
                {clanItem.clanName}
            </span>

                <span style={{
                    fontFamily: 'UbuntuBold',
                    color: '#F0EFFB',
                    fontSize: '16px',
                    marginBottom: '8px',
                    textAlign: 'center'
                }}>
                {clanItem.description}
            </span>

                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '12px',
                    width: '100%',
                    boxSizing: 'border-box',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    marginTop: '8px'
                }}>
                    <MiddleDie txTitle={"Squad Rank "} ic={IcCup} txItem={`${formatNumberToK(clanItem.rating)}`}/>
                    <MiddleDie txTitle={"Members"} ic={IcCoins} txItem={`2`}/>
                </div>



            </div>


            <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: '#131418',
            }}>

                <div style={{width: '100%', height: '1.5px', background: '#191B20', marginBottom: '8px'}}/>

                <div style={{
                    width: '100%',
                    paddingRight: '16px',
                    paddingLeft: '16px',
                    boxSizing: 'border-box'
                }}>
                    <ButtonMain tx={"Up clan rating"} onRed={false} onClick={() => {setIsVisibleModalrating(true)}}/>
                </div>

                <div style={{width: '16px'}}/>

                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center', // Ensure both buttons are vertically aligned
                    justifyContent: 'space-between', // Spread them out horizontally
                }}>
                    <div style={{
                        flex: 1, // Make the button take the remaining space
                        paddingRight: '16px',
                        paddingLeft: '16px',
                    }}>
                        <ButtonMulti tx={"Invite Friends"} onClick={() => {
                            sendToTgChose(clanItem.clanId)
                        }} onLoading={false} bgClr={"#584CF4"}/>
                    </div>

                    <ButtonRound img={IcCopy} onClick={() => {
                        handleCopy(`t.me/TapFapCoinBot/Enjoy?startapp=${clanItem.clanId}`)
                        handleShowToast("Success copy", "info")
                    }}/>
                    <div style={{width: '16px'}}/>
                </div>

                <div style={{height: '16px'}}/>
                <NavigationBar
                    initialSelected={"Top"}
                    onFriendsClick={() => handleNav("friends")}
                    onFapClick={() => handleNav('fap')}
                    onQuestClick={() => handleNav('quests')}
                    onTopClick={() => {
                    }}
                    onImproveClick={() => handleNav("improve")}
                />
            </div>

            {/*{loading && <ProgressBar/>}*/}
            <ModalRating isVisible={isVisibleModalrating} onClose={closeModal} onBtnClick={() => {navigate(-1)}}/>
        </div>
    )

}