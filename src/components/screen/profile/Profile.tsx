import React, {useEffect, useState} from "react";
import {MiddleDie} from "../../otherViews/die/MiddleDie.tsx";
import IcCoins from "../../../assets/icon/ic_coin.svg";
import IcTrophy from "../../../assets/icon/ic_trophy.svg";
import {LevelBar} from "./LevelBar.tsx";
import {InformationBoard} from "../../otherViews/board/InformationBoard.tsx";
import {BeginningCategory} from "../../otherViews/BeginningCategory.tsx";
import {ItemElementsStats} from "../../otherViews/itemElements/ItemElementsStats.tsx";
import {ButtonSecond} from "../../otherViews/buttons/ButtonSecond.tsx";
import {ModalDeleteAccount} from "../../modal/modalDeleteAccount/ModalDeleteAccount.tsx";
import NavigationBar from "../../otherViews/navigationBar/NavigationBar.tsx";
import {useNavigate} from "react-router-dom";
import {formatNumberToK, useTelegramBackButton} from "../../../core/Utils.ts";
import {useData} from "../../otherViews/DataContext.tsx";
import {ButtonMain} from "../../otherViews/buttons/ButtonMain.tsx";
import {useTonConnectUI, useTonWallet} from "@tonconnect/ui-react";
import {Address} from "ton-core";
import {getUserById} from "../../../core/RemoteWorks/UsersRemote.tsx";
import {updateUser} from "../../../core/RemoteWorks/AirDropRemote.tsx";
import {useTranslation} from "react-i18next";
import IcCoinUp from "../../../assets/icon/ic_coin.svg";

export const ProfileScreen: React.FC = () => {


    const [showInfoBoard, setShowInfoBoard] = useState<boolean>(false);
    const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
    const {dataApp, setDataApp} = useData()
    const [tonConnectUI] = useTonConnectUI();
    const wallet = useTonWallet();
    const [setUpAddress, setSetUpAddress] = useState(false)
    const { t } = useTranslation();
    // Check if the InformationBoard was already closed
    useEffect(() => {
        const isInfoBoardClosed = localStorage.getItem("infoBoardClosed");
        if (isInfoBoardClosed === "true") {
            setShowInfoBoard(false);
        }
    }, []);

    const navToAirdrop = () => {
        if(dataApp.enabledAirDrop == 0) {
            navigate('/airDrop')
        }
    }

    const updateAddressUsers = async (address: string) => {
        await updateUser({address: address});
        const dataApsResultino = await getUserById()
        if (typeof dataApsResultino == "object") {
            setDataApp(dataApsResultino);
        }
    };
    useEffect(() => {
        const mestConst = async () => {
            const addressWallet = wallet?.account?.address ? Address.parse(wallet?.account?.address as string) : undefined;
            console.log("addressWallet in mestConst, -", addressWallet)
            if ((dataApp.address == undefined || dataApp.address == "" || dataApp.address == null) && addressWallet !== undefined && setUpAddress) {
                await updateAddressUsers(addressWallet.toString());
            }
        }
        mestConst()

    }, [wallet]);

    const callAddressMenu = async () => {
        console.log("address", dataApp.address)
        if (dataApp.address == undefined || dataApp.address === "") {
            setSetUpAddress(true)
            if(wallet) {
                await tonConnectUI.disconnect()
            }
            tonConnectUI.modal.open()
        }
    }



    try {
        useTelegramBackButton(true)
    } catch (e) {
        console.log("error in postEvent - ", e)
    }
    const handleInfoBoardClose = () => {
        setShowInfoBoard(false);
        localStorage.setItem("infoBoardClosed", "true");
    };

    // const openBottomSheet = () => {
    //     setBottomSheetVisible(true);
    // };

    const closeBottomSheet = () => {
        setBottomSheetVisible(false);
    };

    const navigate = useNavigate();


    const handleNav = (marsh: string) => {

        navigate(`/${marsh}`);
    };


    return (
        <div style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            background: '#131418',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
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

            <div style={{
                display: 'flex',
                alignItems: 'center',
                boxSizing: 'border-box',
                flexDirection: 'column',
                width: '100%'
            }}>

                <div style={{
                    position: 'relative',
                    width: '64px',
                    height: "64px",
                    borderRadius: '50%',
                    marginTop: '32px',
                    background: "white",
                    zIndex: 2,
                    alignContent: 'center',
                    alignItems: 'center',
                }}>
                    <p style={{fontSize: '24px', color: 'black', textAlign: 'center'}}>{dataApp.userName[0]}</p>
                </div>

                <p style={{
                    fontSize: '24px',
                    fontFamily: 'UbuntuBold',
                    color: 'white',
                }}>{dataApp.userName}</p>

                {/*<p style={{*/}
                {/*    fontSize: '14px',*/}
                {/*    fontFamily: 'UbuntuMedium',*/}
                {/*    color: '#584CF4',*/}
                {/*    marginTop: '4px'*/}
                {/*}}>@name</p>*/}


                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '12px',
                        width: '100%',
                        boxSizing: 'border-box',
                        paddingLeft: '16px',
                        paddingRight: '16px',
                        marginTop: '8px'
                    }}
                >
                    <MiddleDie txTitle={"Your Balance"} ic={IcCoins} txItem={`${formatNumberToK(dataApp.coins)}`}/>
                    <MiddleDie txTitle={"Your Rank"} ic={IcTrophy} txItem={`#${dataApp.ligsUser?.position}`}
                               dopBtnVisible={true}/>
                </div>

                {dataApp.ligsUser &&
                    <div style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        paddingLeft: '16px',
                        paddingRight: '16px',
                        marginTop: '16px'
                    }}>
                        <LevelBar title={dataApp.ligsUser?.levelName} txSecond={dataApp.ligsUser?.points.toString()}
                                  img={dataApp.ligsUser?.avatar} secondImg={IcCoinUp}
                                  btnInformTx={`Level #${dataApp.ligsUser?.level}`} progress={dataApp.ligsUser.points} maxProgress={dataApp.ligsUser.maxPoints}
                                  onClick={() => handleNav('userLigs')}/>
                    </div>
                }

            </div>


            {showInfoBoard && (
                <div style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    marginTop: '16px'
                }}>
                    <InformationBoard
                        tx={"Increase your Exp by investing in improvements. As you level up, your profit per tap grows, and new improvements and PVP leagues unlock."}
                        onClickClose={handleInfoBoardClose}
                    />
                </div>
            )}

            {/*<div style={{*/}
            {/*    width: '100%',*/}
            {/*    marginTop: '8px',*/}
            {/*    paddingLeft: '16px',*/}
            {/*}}>*/}
            {/*    <BeginningCategory tx={"Your Squad"}/>*/}
            {/*</div>*/}


            {/*<div style={{*/}
            {/*    width: '100%',*/}
            {/*    marginTop: '8px',*/}
            {/*    paddingLeft: '16px',*/}
            {/*    paddingRight: '16px'*/}
            {/*}}>*/}
            {/*    <ItemElementsMain title={"Terraria"} txSecond={"Rank: #32"} btnInformTx={"16B"} img={""}/>*/}
            {/*</div>*/}

            <div style={{
                width: '100%',
                marginTop: '8px',
                paddingLeft: '16px',
            }}>
                <BeginningCategory tx={"Your Stat"}/>
            </div>

            <div style={{
                width: '100%',
                marginTop: '8px',
                paddingLeft: '16px',
                paddingRight: '16px',
            }}>
                <ItemElementsStats img={IcTrophy} title={"Your rank on top:"} txSecond={`#${dataApp.ligsUser?.position}`} handleClick={() => {
                }}/>
            </div>


            <div style={{
                width: '100%',
                marginTop: '8px',
                paddingLeft: '16px',
                paddingRight: '16px',
            }}>
                <ButtonMain onClick={() => callAddressMenu()}
                            tx={dataApp.address ? t('profile.wallet.sub_title_v2') : t('profile.wallet.sub_title_v1')}/>

            </div>

            <div style={{
                height: '12px'
            }}/>

            <div style={{
                width: '100%',
                marginTop: '8px',
                paddingLeft: '16px',
                paddingRight: '16px',
            }}>
                <ButtonSecond onClick={() => navToAirdrop()}
                              tx={dataApp.enabledAirDrop == 0 ? t('profile.air_drop.sub_title_v2') : t('profile.air_drop.sub_title_v1')}/>

            </div>


            <div style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '100%',
                zIndex: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>

                <div style={{height: '16px'}}/>
                <NavigationBar
                    initialSelected={""}
                    onFriendsClick={() => handleNav("friends")}
                    onFapClick={() => handleNav('fap')}
                    onQuestClick={() => handleNav('quests')}
                    onTopClick={() => handleNav('top')}
                    onImproveClick={() => handleNav("improve")}
                />
            </div>

            <ModalDeleteAccount isVisible={isBottomSheetVisible} onClose={closeBottomSheet} userCodeInvite={"1"}
                                sendToTg={() => {
                                }}/>


        </div>
    )
}