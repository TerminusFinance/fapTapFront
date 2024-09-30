import React, {useEffect, useRef, useState} from "react";
import {TopHap} from "./TopHap/TopHap.tsx";
import BgBadRoom from '../../../assets/background/room.svg';
import NavigationBar from "../../otherViews/navigationBar/NavigationBar.tsx";
import PunkModel from "../../../assets/model/punk_model.svg";
import {InformationBarTwoIc} from "../../otherViews/informationBar/InformationBarTwoIc.tsx";
import IcBattery from "../../../assets/icon/ic_battery.svg"
import {useNavigate} from "react-router-dom";
import {useData} from "../../otherViews/DataContext.tsx";
import {addCoinsToClickData} from "../../../core/RemoteWorks/UsersRemote.tsx";
import {useTelegramBackButton} from "../../../core/Utils.ts";

// const backgroundAnimation = `
// @keyframes backgroundScaleUp {
//   0% {
//     background-size: cover;
//   }
//   100% {
//     background-size: 120%;
//   }
// }
//
// @keyframes backgroundScaleDown {
//   0% {
//     background-size: 120%;
//   }
//   100% {
//     background-size: cover;
//   }
// }
// `;

const moveUp = `


@keyframes moveUp {
    0% {
        transform: translateY(-170%) translateX(-50%);
        opacity: 1;
    }
    100% {
        transform: translateY(-180px);
        opacity: 0;
    }
}`

export const FapScreen: React.FC = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [animations, setAnimations] = useState<{ x: number, y: number, id: number }[]>([]);
    const [coinsAddedCount, setCoinsAddedCount] = useState<number>(1);
    const touchStartTimeRef = useRef<{ [key: number]: number }>({});
    const {dataApp, setDataApp} = useData();
    const { energy, setEnergy } = useData();
    const [clicks, setClicks] = useState<number>(dataApp.coins !== undefined && dataApp.coins !== null ? dataApp.coins : 0);
    const [accumulatedClicks, setAccumulatedClicks] = useState<number>(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);



    try {
        useTelegramBackButton(false)
    } catch (e) {
        console.log("error in postEvent - ", e)
    }
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            if (accumulatedClicks > 0) {
                sendClickData(accumulatedClicks);
                setAccumulatedClicks(0);
            }
        }, 700);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [accumulatedClicks]);

    const sendClickData = async (clickCount: number) => {
        if (dataApp.userId !== undefined) {
            const result = await addCoinsToClickData(clickCount);
            console.log("update result - addCoinsToClickData", result);
            setDataApp(prevDataApp => ({
                ...prevDataApp,
                ...result,
                coins: prevDataApp.coins + clickCount,
            }));
        }
    };

    const handleGirlClick = (touch: React.PointerEvent<HTMLImageElement>) => {
        if (energy < 1) {
            console.log("Недостаточно энергии для клика!");
            return;
        }

        setIsClicked(true);
        setTimeout(() => {
            setIsClicked(false);
        }, 200); // Время анимации (200мс)
        const {clientX, clientY} = touch;

        setEnergy(prevEnergy => prevEnergy - 1);

        const id = Date.now();
        setAnimations(prevAnimations => [...prevAnimations, {x: clientX, y: clientY, id}]);
        setTimeout(() => {
            setAnimations(prevAnimations => prevAnimations.filter(animation => animation.id !== id));
        }, 1000);

        setCoinsAddedCount(1);
        const newClicks = clicks + 1;
        setClicks(newClicks);
        const newAccumulatedClicks = accumulatedClicks + 1;
        setAccumulatedClicks(newAccumulatedClicks);
    };

    const handlePointerDown = (event: React.PointerEvent<HTMLImageElement>) => {
        touchStartTimeRef.current[event.pointerId] = Date.now();
    };

    const handlePointerUp = (event: React.PointerEvent<HTMLImageElement>) => {
        const touchDuration = Date.now() - touchStartTimeRef.current[event.pointerId];
        if (touchDuration < 500) {
            handleGirlClick(event);
        }
        delete touchStartTimeRef.current[event.pointerId];
    };

    const navigate = useNavigate();

    const handleNav = (marsh: string) => {

        navigate(`/${marsh}`);

    };

    return (
        <div style={{
            width: '100%',
            height: '100vh',
            position: 'relative',
            overflow: 'hidden',
            backgroundImage: dataApp.selectedModel?.appartment.image ? `url(${dataApp.selectedModel?.appartment.image})`: `url(${BgBadRoom})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            animation: isClicked ? 'backgroundScaleUp 0.2s forwards' : 'backgroundScaleDown 0.2s forwards',
            WebkitAnimation: isClicked ? 'backgroundScaleUp 0.2s forwards' : 'backgroundScaleDown 0.2s forwards', // Для WebKit браузеров
            transition: 'background-size 0.2s ease-in-out', // Плавный переход фона
        }}>
            {/* Добавляем CSS-анимации */}
            {/*<style>*/}
            {/*    {backgroundAnimation}*/}
            {/*</style>*/}

            {/* Затемнение сверху */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '20%', // Высота затемнения, можно настроить
                background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))',
                zIndex: 1, // Позволяет поместить затемнение под TopHap
            }}/>

            <div>

                <img
                    src={dataApp.selectedModel?.model?.image ? dataApp.selectedModel.model?.image :PunkModel }
                    alt="Girl"
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: "50%",
                        transform: `translateX(-50%) ${isClicked ? "scale(0.95) translateY(2.5%)" : "scale(1)"}`,
                        width: "100%",
                        height: "auto",
                        zIndex: 2,
                        cursor: "pointer",
                        objectFit: "cover",
                        transition: "transform 0.2s ease-in-out",
                        userSelect: "none",
                        outline: "none",
                        WebkitTapHighlightColor: "transparent",
                    }}
                    // onClick={handleGirlClick}
                    onPointerDown={handlePointerDown}
                    onPointerUp={handlePointerUp}
                />
                {animations.map((animation) => (
                    <div
                        key={animation.id}
                        className='increment'
                        style={{
                            left: animation.x,
                            top: animation.y,
                            position: 'absolute',
                            opacity: 1,
                            animation: 'moveUp 1s ease-out forwards',
                            zIndex: 4,
                            fontFamily: 'UbuntuBold',
                            fontSize: '16px',
                            color: 'white'
                        }}
                    >
                        <style>
                            {moveUp}
                        </style>
                        +{coinsAddedCount}
                    </div>
                ))}
            </div>

            <div style={{
                position: 'relative',
                zIndex: 2,
                width: '100%',
                boxSizing: 'border-box',
                marginTop: '8px',
                paddingLeft: '8px',
                paddingRight: '8px'
            }}>
                <TopHap onClickProfile={() => handleNav('profile')} coins={clicks}/>
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
                <InformationBarTwoIc icLeft={IcBattery} tx={`${energy}/${dataApp.maxEnergy}`}/>

                <div style={{height: '16px'}}/>
                <NavigationBar
                    initialSelected={"Fap"}
                    onFriendsClick={() => handleNav("friends")}
                    onFapClick={() => {}}
                    onQuestClick={() => handleNav('quests')}
                    onTopClick={() => handleNav('top')}
                    onImproveClick={() => handleNav('improve')}
                />
            </div>
        </div>
    );
}
