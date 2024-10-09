import React, {useEffect, useRef, useState} from "react";
import {ButtonClose} from "../../otherViews/buttons/ButtonClose.tsx";
import IcSettingsFrame from "../../../assets/icon/ic_gift.svg";
import IcCoins from "../../../assets/icon/ic_coin.svg";
import {claimReward, getUserRewards, Reward} from "../../../core/RemoteWorks/DailyRewardRemote.tsx";
import Progressbar from "../../otherViews/progresBar/ProgressBar.tsx";
import {useToast} from "../../otherViews/toast/ToastContext.tsx";
import {ButtonMain} from "../../otherViews/buttons/ButtonMain.tsx";
import {ButtonSecond} from "../../otherViews/buttons/ButtonSecond.tsx";
import {getUserById} from "../../../core/RemoteWorks/UsersRemote.tsx";
import {useData} from "../../otherViews/DataContext.tsx";
import {formatNumberToK} from "../../../core/Utils.ts";

interface ModalDailyRewardProps {
    isVisible: boolean;
    onClose: () => void;
}

export const ModalDailyReward: React.FC<ModalDailyRewardProps> = ({
                                                                      isVisible,
                                                                      onClose,
                                                                  }) => {

    const overlayRef = useRef<HTMLDivElement>(null);
    const sheetRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [rewardsItem, setRewardsItem] = useState<Reward[] | null>(null)
    const [claimTime, setClaimTime] = useState<string | null>(null)
    const [loading, setLoading] = useState(false);
    const {setDataApp} = useData();
    const getUserRewardsItem = async () => {
        setLoading(true)
        const result = await getUserRewards()
        if(typeof result == "object"){
            console.log("result.rewards  -", result.rewards[0].rewards[0].name)
            setRewardsItem(result.rewards)
            setClaimTime(result.timeUntilNextReward)
        }
        setLoading(false)
    }

    const {showToast} = useToast();

    const handleShowToast = (message: string, type: 'success' | 'error' | 'info') => {
        showToast(message, type);
    };

    const claimRewardItem = async () => {
        setLoading(true)
        const result = await claimReward()
        if(typeof result == "object") {
            if(result.success){
                const resultUser = await getUserById();
                if(typeof resultUser == "object") {
                    setDataApp(resultUser);
                }
                handleShowToast("successfully received", "success")
                onClose()
            } else{
                handleShowToast("an error has occurred", "error")
            }
        }
    }

    useEffect(() => {
        if(isVisible) {
            getUserRewardsItem()
        }
    }, [isVisible]);

    useEffect(() => {
        if (isVisible) {
            setIsAnimating(true);
            if (overlayRef.current && sheetRef.current) {
                // Устанавливаем начальные стили перед анимацией
                overlayRef.current.style.opacity = "0";
                overlayRef.current.style.visibility = "visible";
                sheetRef.current.style.transform = "translateY(100%)";

                // Используем requestAnimationFrame для отсрочки анимации
                requestAnimationFrame(() => {
                    overlayRef.current!.style.opacity = "1";
                    sheetRef.current!.style.transform = "translateY(0)";
                });
            }
        } else {
            if (overlayRef.current && sheetRef.current) {
                sheetRef.current.style.transform = "translateY(100%)";
                setTimeout(() => {
                    if (overlayRef.current) {
                        overlayRef.current.style.opacity = "0";
                        overlayRef.current.style.visibility = "hidden";
                    }
                    setIsAnimating(false);
                }, 300); // Длительность анимации
            }
        }
    }, [isVisible]);

    const handleOverlayClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).classList.contains("modal-overlay")) {
            onClose();
        }
    };

    if (!isVisible && !isAnimating) return null;

    return (
        <div
            className={"modal-overlay"}
            ref={overlayRef}
            onClick={handleOverlayClick}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                padding: "20px",
                opacity: 0,
                visibility: "hidden",
                transition: "opacity 0.3s ease-out, visibility 0.3s ease-out",
                zIndex: 150
            }}
        >
            <div
                ref={sheetRef}
                style={{
                    backgroundColor: "#161618",
                    width: "100%",
                    maxWidth: "500px",
                    borderRadius: "16px",
                    padding: "20px",
                    boxShadow: "0 0 0 2px #38383A",
                    boxSizing: "border-box",
                    transform: "translateY(100%)",
                    transition: "transform 0.3s ease-out",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingBottom: "10px",
                        width: "100%",
                        alignContent: "center",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    ></div>
                    <ButtonClose sizeImg={12} sizeBtn={32} onClick={onClose}/>

                </div>

                <div
                    style={{
                        marginTop: "20px",
                        color: "white",
                        maxHeight: "80vh",
                        overflowY: "auto",
                        alignContent: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <img
                        src={IcSettingsFrame}
                        style={{
                            width: "80px",
                            height: "80px",
                        }}
                    />

                    <span style={{
                        color: 'white',
                        fontSize: '24px',
                        fontFamily: 'UbuntuBold',
                        marginTop: '14px',
                        marginBottom: '14px'
                    }}>Daily Reward</span>

                    <span style={{
                        marginTop: '8px',
                        color: '#B5B7B9',
                        fontSize: '14px',
                        fontFamily: 'UbuntuRegular'
                    }}>
Visit daily to earn more rewards.
                    </span>
                </div>


                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)", // 3 items per row
                        gap: "16px", // space between items
                        maxHeight: "400px", // limit the height for scrolling
                        overflowY: "auto", // enable scrolling if content overflows
                        padding: "16px", // padding around the grid
                    }}
                >
                    {rewardsItem?.map((reward) => (
                        <DailyItem
                            key={reward.day_number}
                            complete={reward.is_claimed}
                            readinessToComplete={reward.is_available}
                            dayName={reward.day_number.toString()}
                            reward={formatNumberToK(reward.rewards[0].count)}
                        />
                    ))}
                </div>

                {claimTime ?
                    <ButtonSecond tx={claimTime} onClick={() => {}} />:
                    <ButtonMain tx={"ClaimReward"} onClick={() => {claimRewardItem()}} />
                }


            </div>
            {loading && <Progressbar/>}
        </div>
    )
}

interface DayliProps {
    complete: boolean, readinessToComplete: boolean, dayName: string, reward: string,
}

export const DailyItem: React.FC<DayliProps> = ({
                                                    complete ,
                                                    readinessToComplete ,
                                                    dayName ,
                                                    reward ,

                                                }) => {

    return (
        <div style={{
            width: '88px',
            height: '88px',
            background: complete ? "#584CF4" : "#191B20",
            borderRadius: '999px',
            padding: '24px',
            border: readinessToComplete ? '1px solid #584CF4' : "",
            display: "flex",
            flexDirection: 'column',
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center'
        }} >

            <span style={{
                color: 'white',
                fontSize: '16px',
                fontFamily: 'UbuntuBold',
            }}>{dayName}</span>

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
                alignItems: 'center',
                gap: "4px"
            }}>
                <img src={IcCoins} style={{
                    width: '14px',
                    height: '14px',

                }}/>

                <span style={{
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontFamily: 'UbuntuBold',
                }}>{reward}</span>
            </div>

        </div>
    )
}


