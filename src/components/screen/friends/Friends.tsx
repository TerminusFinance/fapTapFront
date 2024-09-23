import React, {useEffect, useRef, useState} from "react";
import IcHeaderFrines from "../../../assets/icon/ic_header_icon_friends.svg";
import IcFriendsCofee from "../../../assets/icon/ic_header_icon_friends_cofee.svg";
import {HorizontalSelector} from "../../otherViews/selectors/HorizontalSelector";
import NavigationBar from "../../otherViews/navigationBar/NavigationBar";
import {useNavigate} from "react-router-dom";
import IcHeaderFriendsShare from "../../../assets/icon/ic_header_icon_friends_share.svg";
import {ButtonMulti} from "../../otherViews/buttons/ButtonMulti";
import IcCopy from "../../../assets/icon/ic_copy.svg"
import {ButtonRound} from "../../otherViews/buttons/ButtonRound.tsx";
import IcCoin from "../../../assets/icon/ic_coin.svg";
import IcInfo from "../../../assets/icon/ic_info_circle.svg";
import IcGift from "../../../assets/icon/ic_gift.svg";
import IcStarts from "../../../assets/icon/ic_premium_star_simpl.svg";
import IcTrophy from "../../../assets/icon/ic_trophy.svg";
import {handleCopy, sendToTgChose, useTelegramBackButton} from "../../../core/Utils.ts";
import {useData} from "../../otherViews/DataContext.tsx";
import {useToast} from "../../otherViews/toast/ToastContext.tsx";
import IcSmile from "../../../assets/icon/ic_sad_smile.svg";
import {getUserInvited, listUserInvitedItem} from "../../../core/RemoteWorks/FriendsRemote.tsx";
import {ItemElementsImprove} from "../../otherViews/itemElements/ItemElementsImprove.tsx";
import Progressbar from "../../otherViews/progresBar/ProgressBar.tsx";

export const FriendsScreen: React.FC = () => {

    const {dataApp} = useData()

    try {

        useTelegramBackButton(true)
    } catch (e) {
        console.log("error in postEvent - ", e)
    }


    const [userInvitedItem, setuserInvitedItem] = useState<listUserInvitedItem[]>([])
    const [totalCountUsers, settotalCountUsers] = useState(0)
    const [loading, setLoading] = useState(false);
    const hasFetchedData = useRef(false);

    const {showToast} = useToast();

    const handleShowToast = (message: string, type: 'success' | 'error' | 'info') => {
        showToast(message, type);
    };

    const [tabSelected, setTabSelected] = useState<string>("Invite Info");
    const handleTabSelect = (selectedTab: string) => {
        console.log(`Selected tab: ${selectedTab}`);
        setTabSelected(selectedTab)
    };

    const navigate = useNavigate();

    const handleNav = (marsh: string) => {
        navigate(`/${marsh}`);
    };


    const requestToServ = async () => {
        const result = await getUserInvited()
        if (typeof result == "object") {
            setuserInvitedItem(result.invitees)
            settotalCountUsers(result.totalCount)
        }
    }

    useEffect(() => {
        if (!hasFetchedData.current) {
            setLoading(true)
            requestToServ().finally(() => {
                hasFetchedData.current = true
                setLoading(false)
            })
        }
    }, []);

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


            <img src={
                tabSelected === "Invite Info" ? IcHeaderFrines :
                    tabSelected === "Friends" ? IcFriendsCofee :
                        tabSelected === "Community" ? IcHeaderFriendsShare :
                            ""
            } style={{
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
                     {tabSelected}
                 </span>


            <span style={{
                fontSize: '16px',
                fontFamily: 'UbuntuRegular',
                color: '#B5B7B9'
            }}>
                {tabSelected === "Invite Info" && "And your friends will receive bonuses"}
                {tabSelected === "Friends" && "Check out your friends' progress!"}
                {tabSelected === "Community" && "Join our community and share!"}
            </span>

            <div style={{
                width: '100%',
                boxSizing: 'border-box',
                paddingRight: '16px',
                paddingLeft: '16px',
                marginTop: '24px'
            }}>
                <HorizontalSelector tabs={["Invite Info", "Friends", "Community"]} onTabSelect={handleTabSelect}/>


                {tabSelected === "Invite Info" &&
                    <div>
                        <InviteInfoItem img={IcGift} coin={"+5000"} text={"For you and your friend"}
                                        onClickAbout={() => {
                                        }}/>
                        <InviteInfoItem img={IcStarts} coin={"+15000"} text={"For you and your Premium friends"}
                                        onClickAbout={() => {
                                        }}/>
                        <InviteInfoItem img={IcTrophy} coin={"+45T"} text={"When your friend levels up"}
                                        onClickAbout={() => {
                                        }}/>
                    </div>
                }

                {tabSelected == "Friends" &&
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        alignContent: 'center'
                    }}>
                        {totalCountUsers == 0 ?
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                alignContent: 'center'
                            }}>

                                <img src={IcSmile} style={{width: '56px', height: '56px'}}/>

                                <span style={{
                                    color: '#B5B7B9',
                                    fontSize: '14px',
                                    fontFamily: 'UbuntuRegular'
                                }}>You haven't invited any friends yet.</span>

                            </div> :
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                alignContent: 'center'
                            }}>

                                {userInvitedItem ? (
                                    <div>
                                        {userInvitedItem.map((invite, pos) => (
                                            <ItemElementsImprove
                                                key={pos}
                                                title={invite.userName}
                                                handleClick={() => {}}
                                                itemUpgrate={null}
                                                img={""}
                                                // onLoading={item.etaps === 1 || item.etaps === 3}
                                            />
                                            // <ItemFriends userName={invite.userName}
                                            //              coinsReferral={`+${formatNumberToK(invite.coinsReferral)}`} position={pos + 1}selected={false} />
                                        ))}
                                    </div>
                                ) : (
                                    <div/>
                                )}

                            </div>
                        }

                    </div>
                }

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
                            sendToTgChose(dataApp.codeToInvite)
                        }} onLoading={false} bgClr={"#584CF4"}/>
                    </div>

                    <ButtonRound img={IcCopy} onClick={() => {
                        handleCopy(`t.me/TerminusCoinbot/Farm?startapp=${dataApp.codeToInvite}`)
                        handleShowToast("Success copy", "info")
                    }}/>
                    <div style={{width: '16px'}}/>
                </div>


                <div style={{height: '16px'}}/>
                <NavigationBar
                    initialSelected={"friends"}
                    onFriendsClick={() => {}}
                    onFapClick={() => handleNav('fap')}
                    onQuestClick={() => handleNav('quests')}
                    onTopClick={() => handleNav('top')}
                    onImproveClick={() => handleNav("improve")}
                />
            </div>

            {loading && <Progressbar/>}
        </div>
    )
}

interface InviteInfoItemParam {
    img: string;
    coin: string;
    text: string;
    onClickAbout: () => void;
}

const InviteInfoItem: React.FC<InviteInfoItemParam> = ({img, coin, text, onClickAbout}) => {

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: '16px',
            paddingLeft: '16px',
            paddingRight: '16px',
            marginTop: '8px',
            alignItems: 'center',
            alignContent: 'center'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '16px',
                alignItems: 'center',
                alignContent: 'center'
            }}>

                <img src={img} style={{width: '56px', height: '56px'}}/>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignContent: 'center',
                        gap: '4px'
                    }}>
                        <img src={IcCoin} style={{width: '16px', height: '16px'}}/>
                        <span style={{
                            fontSize: '16px',
                            fontFamily: 'UbuntuMedium',
                            color: 'white'
                        }}>{coin}</span>
                    </div>
                    <span style={{
                        color: "#B5B7B9",
                        fontSize: '12px',
                        fontFamily: "UbuntuRegular"
                    }}>{text}</span>
                </div>
            </div>

            <img src={IcInfo} style={{width: '32px', height: '32px'}} onClick={onClickAbout}/>

        </div>
    )
}