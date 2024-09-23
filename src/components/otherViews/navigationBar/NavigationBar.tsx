import React, { useState, useEffect } from 'react';
import './NavigationBar.css';
import coinIc from "../../../assets/icon/ic_coin.svg";
import fireIc from "../../../assets/icon/ic_fire.svg";
import premStarSimplIc from "../../../assets/icon/ic_premium_star_simpl.svg";
import calendarIc from "../../../assets/icon/ic_calendar.svg";
import telepaperIc from "../../../assets/icon/ic_telepaper.svg";

type NavigationBarProps = {
    initialSelected: string;
    onFapClick: () => void;
    onImproveClick: () => void;
    onTopClick: () => void;
    onQuestClick: () => void;
    onFriendsClick: () => void;
};

const NavigationBar: React.FC<NavigationBarProps> = ({
                                                         initialSelected,
                                                         onFapClick,
                                                         onImproveClick,
                                                         onTopClick,
                                                         onQuestClick,
                                                         onFriendsClick
                                                     }) => {
    const [selected, setSelected] = useState<string | null>(
        initialSelected.trim() !== "" ? initialSelected : null
    );

    useEffect(() => {
        setSelected(initialSelected.trim() !== "" ? initialSelected : null);
    }, [initialSelected]);

    const getStyleForTx = (isSelected: boolean) => ({
        fontSize: '14px',
        color: isSelected ? 'white' : '#B5B7B9', // Цвет текста зависит от выбора
        fontFamily: isSelected ? 'UbuntuBold' : 'UbuntuRegular' // Шрифт зависит от выбора
    });

    return (
        <div className="nav-bar">
            <div
                className={`nav-item ${selected === 'Fap' ? 'selected' : ''}`}
                onClick={() => {
                    setSelected('Fap');
                    onFapClick();
                }}
            >
                <div className="icon-text-wrapper">
                    <img
                        src={coinIc}
                        alt="Fap"
                    />
                    <span style={getStyleForTx(selected === 'Fap')}>Fap</span>
                </div>
            </div>
            <div
                className={`nav-item ${selected === 'Improve' ? 'selected' : ''}`}
                onClick={() => {
                    setSelected('Improve');
                    onImproveClick();
                }}
            >
                <div className="icon-text-wrapper">
                    <img
                        src={fireIc}
                        alt="Improve"
                    />
                    <span style={getStyleForTx(selected === 'Improve')}>Improve</span>
                </div>
            </div>


            <div
                className={`nav-item ${selected === 'Top' ? 'selected' : ''}`}
                onClick={() => {
                    setSelected('Top');
                    onTopClick();
                }}
            >
                <div className="icon-text-wrapper">
                    <img
                        src={telepaperIc}
                        alt="Top"
                    />
                    <span style={getStyleForTx(selected === 'Top')}>Top</span>
                </div>
            </div>

            <div
                className={`nav-item ${selected === 'Quest' ? 'selected' : ''}`}
                onClick={() => {
                    setSelected('Quest');
                    onQuestClick();
                }}
            >
                <div className="icon-text-wrapper">
                    <img
                        src={premStarSimplIc}
                        alt="Quest"
                    />
                    <span style={getStyleForTx(selected === 'Quest')}>Quest</span>
                </div>
            </div>
            <div
                className={`nav-item ${selected === 'Friends' ? 'selected' : ''}`}
                onClick={() => {
                    setSelected('Friends');
                    onFriendsClick();
                }}
            >
                <div className="icon-text-wrapper">
                    <img
                        src={ calendarIc}
                        alt="Friends"
                    />
                    <span style={getStyleForTx(selected === 'Friends')}>Friends</span>
                </div>
            </div>

        </div>
    );
};

export default NavigationBar;
