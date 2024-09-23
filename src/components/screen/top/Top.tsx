import React, {useEffect, useRef, useState} from "react";
import IcHeaderTop from "../../../assets/icon/ic_header_top.svg";
import {HorizontalSelector} from "../../otherViews/selectors/HorizontalSelector.tsx";
import {useNavigate} from "react-router-dom";
import {formatNumberToK, useTelegramBackButton} from "../../../core/Utils.ts";

import NavigationBar from "../../otherViews/navigationBar/NavigationBar.tsx";
import {
    getAllClansType,
    getClanByUserId,
    getLeagueAndTopUsersData,
    getUsersLeague,
    responseAllCalns,
    responseAllLegueTop,
    ResultionGetClanById,
    UserLeague,
    UserLeagueResponse
} from "../../../core/RemoteWorks/TopRemote.tsx";
import ProgressBar from "../../otherViews/progresBar/ProgressBar.tsx";
import {ItemElementsMain} from "../../otherViews/itemElements/ItemElementsMain.tsx";
import SimpleHorizontalSelector from "../../otherViews/selectors/SimpleHorizontalSelector.tsx";


export const TopScreen: React.FC = () => {
    const [tabSelected, setTabSelected] = useState<string>("Users");
    const [secondPlace, setSecondPlace] = useState<UserLeague>();
    const [firstPlace, setFirstPlace] = useState<UserLeague>();
    const [thirdPlace, setThirdPlace] = useState<UserLeague>();
    const [usersList, setUsersList] = useState<responseAllLegueTop>({
        allUserLeagues: [],
        topUsersLastMonth: [],
        topUsersLastWeek: []
    });
    const [clanList, setClanList] = useState<responseAllCalns>({
        allUserLeagues: [],
        topUsersLastMonth: [],
        topUsersLastWeek: []
    })
    const hasFetchedData = useRef(false);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<UserLeagueResponse>();
    const [userClan, setUserClan] = useState<ResultionGetClanById | null>(null);
    const [selectedType, setSelectedType] = useState<string>('Weekly');
    try {
        useTelegramBackButton(true)
    } catch (e) {
        console.log("error in postEvent - ", e)
    }


    const handleTabSelect = (selectedTab: string) => {
        console.log(`Selected tab: ${selectedTab}`);
        setTabSelected(selectedTab)
    };


    const navigate = useNavigate();

    const handleNav = (marsh: string) => {
        navigate(`/${marsh}`);
    };

    const RequestToServerToGetUsersLeagueList = async () => {
        setLoading(true);


        try {
            const userClanResult = await getClanByUserId();
            const clanAllResult = await getAllClansType()
            if (typeof userClanResult === "object") {
                setUserClan(userClanResult);
            } else {
                console.log("resultuserClanResult - ", userClanResult);
            }

            if (typeof clanAllResult == "object") {
                setClanList(clanAllResult)
            }

        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const requestToServ = async () => {
        const result = await getLeagueAndTopUsersData()
        const userLegResult = await getUsersLeague()
        if (typeof userLegResult == "object") {
            setUsers(userLegResult)
        }
        if (typeof result == "object") {

            setUsersList(result)
        }
    }


    useEffect(() => {
        // Устанавливаем первые три места
        switch (selectedType) {
            case "Weekly" :
                setFirstPlace(usersList.topUsersLastWeek[0]);
                setSecondPlace(usersList.topUsersLastWeek[1]);
                setThirdPlace(usersList.topUsersLastWeek[2]);
                break;
            case "Monthly":
                setFirstPlace(usersList.topUsersLastMonth[0]);
                setSecondPlace(usersList.topUsersLastMonth[1]);
                setThirdPlace(usersList.topUsersLastMonth[2]);
                break;
            case "All Time" :
                setFirstPlace(usersList.allUserLeagues[0]);
                setSecondPlace(usersList.allUserLeagues[1]);
                setThirdPlace(usersList.allUserLeagues[2]);
        }

    }, [usersList, selectedType]);

    useEffect(() => {
        if (!hasFetchedData.current) {
            setLoading(true);

            Promise.all([requestToServ(), RequestToServerToGetUsersLeagueList()])
                .finally(() => {
                    hasFetchedData.current = true;
                    setLoading(false);
                });
        }
    }, []);


    const renderPlace = (user: UserLeague, rank: number) => (
        <div style={{
            textAlign: "center",
            backgroundColor: "#333",
            color: "#fff",
            padding: "8px",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "80px",
            margin: "6px",
            transform: "scale(1.1)",
            order: 1,
            background: "linear-gradient(180deg, rgba(162, 255, 159, 0) 0%, rgba(162, 255, 159, 24%) 100%)"
        }}>
            <div style={{
                backgroundColor: "#282B30",
                borderRadius: "16px",
                margin: "6px 0",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                {user.imageAvatar ? (
                    <img src={user.imageAvatar} style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%"
                    }}/>
                ) : (
                    <p style={{fontSize: "16px", color: "black"}}>{user.userName[0]}</p>
                )}
            </div>
            <p style={{
                width: "16px",
                height: "16px",
                marginBottom: "10px",
                borderRadius: "50%",
                backgroundColor: "#8F9FAE",
                color: "#351E22",
                fontFamily: "MyCustomFont-bold, sans-serif",
                fontSize: "12px"
            }}>{rank}</p>
            <h3 style={{
                margin: "5px 0",
                fontFamily: "MyCustomFont-bold, sans-serif",
                fontSize: "14px"
            }}>
                {user.userName.length > 5 ? user.userName.slice(0, 5) + '...' : user.userName}
            </h3>
            <p style={{
                background: "linear-gradient(to right, #FFD700, #FFC107, #FFB300)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "bold",
                fontSize: "14px"
            }}>{formatNumberToK(user.score)}</p>
        </div>
    );


    const renderUsers = () => {
        const userList =
            selectedType === "Weekly" ? usersList.topUsersLastWeek :
                selectedType === "Monthly" ? usersList.topUsersLastMonth :
                    selectedType === "All Time" ? usersList.allUserLeagues :
                        [];

        return userList.map((user, pos) => (
            <div style={{
                width: '100%',
                boxSizing: 'border-box',
            }} key={user.userId}>
                <ItemElementsMain
                    title={user.userName}
                    txSecond={`Rank: #${pos + 1}`} // +1 для корректного ранга
                    btnInformTx={formatNumberToK(user.score)}
                    img={""}
                />
            </div>
        ));
    };

    const renderClans = () => {
        const clanListItem =
            selectedType === "Weekly" ? clanList.topUsersLastWeek :
                selectedType === "Monthly" ? clanList.topUsersLastMonth :
                    selectedType === "All Time" ? clanList.allUserLeagues :
                        [];

        return clanListItem.map((clan, pos) => (
            <div style={{
                width: '100%',
                boxSizing: 'border-box',
            }} key={clan.clanId}>
                <ItemElementsMain
                    title={clan.clanName}
                    txSecond={`Rank: #${pos + 1}`} // +1 для корректного ранга
                    btnInformTx={formatNumberToK(clan.rating)}
                    img={""}
                />
            </div>
        ));
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
                {tabSelected}
            </span>

                <span style={{
                    fontSize: '16px',
                    fontFamily: 'UbuntuRegular',
                    color: '#B5B7B9'
                }}>
                About Top
            </span>

                <div style={{
                    width: '100%',
                    flex: 1,
                    // overflowY: 'auto',
                    padding: '0 16px',
                    marginTop: '24px',
                }}>
                    <HorizontalSelector tabs={["Users", "Squad"]} onTabSelect={handleTabSelect}/>

                    <SimpleHorizontalSelector
                        options={['Weekly', 'Monthly', "All Time"]}
                        selectedOption={selectedType}
                        onSelect={setSelectedType}
                    />

                    {tabSelected === 'Users' && (
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                            alignItems: 'center',
                        }}>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-end",
                                gap: "10px",
                                marginTop: "30px",
                                width: "100%",
                            }}>
                                {firstPlace && renderPlace(firstPlace, 1)}
                                {secondPlace && renderPlace(secondPlace, 2)}
                                {thirdPlace && renderPlace(thirdPlace, 3)}
                            </div>

                            {renderUsers()}
                        </div>
                    )}

                    {tabSelected === "Squad" && (
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                            alignItems: 'center',
                        }}>

                            {renderClans()}
                        </div>
                    )}
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

                {tabSelected === "Users" ? (
                    <div style={{width: '100%'}}>
                        {users && (
                            <div style={{
                                width: '100%',
                                boxSizing: 'border-box',
                                paddingRight: '16px',
                                paddingLeft: '16px'
                            }}>
                                <ItemElementsMain
                                    key={users.userLeague.userId}
                                    title={users.userLeague.userName}
                                    txSecond={`Rank: #${users.rank}`}
                                    btnInformTx={formatNumberToK(users.userLeague.score)}
                                    img={""}
                                />
                            </div>
                        )}
                    </div>
                ) : (
                    <div style={{width: '100%'}}>{userClan && (
                        <div style={{
                            width: '100%',
                            boxSizing: 'border-box',
                            paddingRight: '16px',
                            paddingLeft: '16px'
                        }}>
                            <ItemElementsMain
                                key={userClan.clan.clanId}
                                title={userClan.clan.clanName}
                                txSecond={`Rank: #${userClan.contributedRating}`}
                                btnInformTx={formatNumberToK(userClan.clan.rating)}
                                img={""}
                            />
                        </div>
                    )}</div>
                )}

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

            {loading && <ProgressBar/>}
        </div>
    )
}

