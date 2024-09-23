import React, { useEffect, useState } from "react";
import BgBadRoom from "../../../assets/background/room.svg";
import NavigationBar from "../../otherViews/navigationBar/NavigationBar";
import { useNavigate } from "react-router-dom";
import IcArrowRight from "../../../assets/icon/ic_arrow_right.svg";
import IcArrowLeft from "../../../assets/icon/ic_arrow_left.svg";
import { LineProgressBarLevel } from "../../otherViews/progresBar/LineProgresBarLevel";
import {
    getTopUsersByLevel,
    getUserStatistics,
    ResponseGetTopUsersByLevel
} from "../../../core/RemoteWorks/UserLigsremote";
import { ItemElementsMain } from "../../otherViews/itemElements/ItemElementsMain.tsx";
import { BeginningCategory } from "../../otherViews/BeginningCategory.tsx";
import {useTelegramBackButton} from "../../../core/Utils.ts";

interface User {
    userId: string;
    userName: string;
    points: number;
    level: number;
    levelName: string;
}

interface SliderProps {
    levels: ResponseGetTopUsersByLevel[];
    user: User;
}

const LevelSlider: React.FC<SliderProps> = ({ levels, user }) => {
    const [currentLevel, setCurrentLevel] = useState<number>(user.level -1);

    // Function to move to the previous slide
    const handlePrevious = () => {
        if (currentLevel > 0) {
            setCurrentLevel(currentLevel - 1);
        }
    };

    // Function to move to the next slide
    const handleNext = () => {
        if (currentLevel < levels.length - 1) {
            setCurrentLevel(currentLevel + 1);
        }
    };

    // Determine the progress based on user points
    const calculateProgress = (level: number, points: number) => {
        if (level > user.level) {
            return 0; // No progress for levels beyond user's current level
        }
        const current = levels.find(l => l.levelInfo.level === level);
        if (current) {
            const progressPercentage = (points / current.levelInfo.minCoins) * 100;
            return progressPercentage > 100 ? 100 : progressPercentage;
        }
        return 0;
    };

    const progress = calculateProgress(levels[currentLevel].levelInfo.level, user.points);

    return (
        <div>
            <div
                style={{
                    width: '100%',
                    height: '250px',
                    backgroundImage: `url(${BgBadRoom})`,
                    display: 'flex',
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <img
                    src={IcArrowLeft}
                    style={{ width: '24px', height: '24px', cursor: 'pointer' }}
                    onClick={handlePrevious}
                />

                <img src={levels[currentLevel].levelInfo.avatar} style={{
                           height: '250px',
                           paddingTop: '10px'
                         }}/>

                <img
                    src={IcArrowRight}
                    style={{ width: '24px', height: '24px', cursor: 'pointer' }}
                    onClick={handleNext}
                />
            </div>

            {/* Display list of users for the selected level */}
            <div>
                <div style={{
                    width: '100%',
                    marginTop: '8px',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                }}>
                    <LineProgressBarLevel height={40} progress={progress} name={levels[currentLevel].levelInfo.name} secondName={user.points.toString()} />
                    <div style={{height: '16px'}}/>
                    <BeginningCategory tx={`Top ${levels[currentLevel].levelInfo.name}`} />
                </div>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {levels[currentLevel].users.map((user) => (
                        <ItemElementsMain
                            key={user.userId}
                            title={user.userName}
                            txSecond={"Rank: #32"}
                            btnInformTx={user.points.toString()}
                            img={""}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default LevelSlider;

export const UserLigsScreen: React.FC = () => {
    const [levels, setLevels] = useState<ResponseGetTopUsersByLevel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);

    try {
        useTelegramBackButton(true)
    } catch (e) {
        console.log("error in postEvent - ", e)
    }


    const navigate = useNavigate();

    const handleNav = (marsh: string) => {
        navigate(`/${marsh}`);
    };

    const getLevels = async () => {
        const response = await getTopUsersByLevel();
        if (typeof response === "object") {
            setLevels(response);
            setLoading(false); // Set loading to false once data is fetched
        }
    };

    useEffect(() => {
        // Example of fetching user data
        const fetchUserData = async () => {
            // Replace this with actual user data fetching logic
            const result = await getUserStatistics()
            if(typeof result == "object") {

            setUser(result);
            }
//            const userData = {
//                userId: "755050714",
//                userName: "Roma",
//                points: 3501,
//                level: 1,
//                levelName: "Beginner",
//            };
        };



        fetchUserData();
        getLevels();
    }, []);

    return (
        <div style={{
            width: '100%',
            height: '100vh',
            position: 'relative',
            background: '#131418',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            {loading || !user ? (
                <div>Loading...</div>
            ) : (
                <>
                    <div style={{ width: '100%' }}>
                        <LevelSlider levels={levels} user={user} />
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
                        <div style={{ height: '16px' }} />
                        <NavigationBar
                            initialSelected={""}
                            onFriendsClick={() => handleNav("friends")}
                            onFapClick={() => handleNav('fap')}
                            onQuestClick={() => handleNav('quests')}
                            onTopClick={() => handleNav('top')}
                            onImproveClick={() => handleNav("improve")}
                        />
                    </div>
                </>
            )}
        </div>
    );
};
