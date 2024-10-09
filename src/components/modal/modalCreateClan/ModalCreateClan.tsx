import React, {useEffect, useRef, useState} from "react";
import {ButtonClose} from "../../otherViews/buttons/ButtonClose.tsx";
import {useToast} from "../../otherViews/toast/ToastContext.tsx";
import {useData} from "../../otherViews/DataContext.tsx";
import {useTranslation} from "react-i18next";
import {getUserById} from "../../../core/RemoteWorks/UsersRemote.tsx";
import {createClan} from "../../../core/RemoteWorks/ClanRemote.tsx";
import ProgressBar from "../../otherViews/progresBar/ProgressBar.tsx";
import IcCoins from "../../../assets/icon/ic_coin.svg"

interface ModalCreateClanProps {
    isVisible: boolean;
    onClose: () => void;
    onBtnClick: () => void;
}

export const CreateClanModal: React.FC<ModalCreateClanProps> = ({
                                                                    isVisible,
                                                                    onClose,
                                                                    onBtnClick
                                                                }) => {


    const overlayRef = useRef<HTMLDivElement>(null);
    const sheetRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const nameInputRef = useRef<HTMLInputElement>(null);
    const chanelInputRef = useRef<HTMLInputElement>(null);
    const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
    const [loading, setLoading] = useState(false);
    const [clanName, setClanName] = useState("");
    const [clanDescription, setClanDescription] = useState("");
    const [clanChanel, setclanChanel] = useState("");
    const {showToast} = useToast();
    const {setDataApp} = useData();
    const {t} = useTranslation();

    const handleShowToast = (message: string, type: "success" | "error" | "info") => {
        showToast(message, type);
    };


    const handleClanChanelKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            descriptionInputRef.current?.focus();
        }
    };

    const handleNameKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            descriptionInputRef.current?.focus();
        }
    };

    const handleDescriptionKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            // Add functionality here if needed
        }
    };

    const setUpCreate = async () => {
        setLoading(true);

        if (clanName !== "" && clanDescription !== "") {
            const regex = /^(@[a-zA-Z0-9_]{1,20}|https:\/\/t\.me\/[a-zA-Z0-9_]{1,20})$/;

            if (clanChanel === "" || regex.test(clanChanel)) {
                const result = await createClan(clanName, clanDescription, clanChanel);

                if (result === "Clan created successfully") {
                    onBtnClick();
                    onClose();

                    const resultUserUpdate = await getUserById();
                    if (typeof resultUserUpdate === "object") {
                        setDataApp(resultUserUpdate);
                        handleShowToast(
                            "Successfully! Congratulations on the creation of your clan",
                            "success"
                        );
                    }
                } else {
                    handleShowToast(result, "error");
                }
            } else {
                handleShowToast(
                    "Invalid channel format. It must start with @ or https://t.me/ and be no more than 20 characters long.",
                    "error"
                );
            }
        } else {
            handleShowToast("All fields must be filled in", "error");
        }

        setLoading(false);
    };

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

    return <div
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

            <div className="bottom-sheet-content-task" style={{
                marginTop: "20px",
                color: "white",
                maxHeight: "80vh",
                overflowY: 'auto'
            }}>
                <input
                    type="text"
                    className="input-field"
                    placeholder={t('clans.create_clan_modal.name')}
                    ref={nameInputRef}
                    value={clanName}
                    onChange={(e) => setClanName(e.target.value)}
                    onKeyPress={handleNameKeyPress}
                    style={{
                        width: '100%',
                        padding: '8px 12px',
                        margin: '10px 0',
                        border: '1px solid #242427',
                        background: '#242427',
                        borderRadius: '8px',
                        boxSizing: 'border-box',
                        fontSize: '16px',
                        color: 'white',
                        outline: 'none',
                        transition: 'border-color 0.3s ease',
                    }}
                />
                <textarea
                    className="textarea-field"
                    placeholder={t('clans.create_clan_modal.description')}
                    ref={descriptionInputRef}
                    value={clanDescription}
                    onChange={(e) => setClanDescription(e.target.value)}
                    onKeyPress={handleDescriptionKeyPress}
                    style={{
                        width: '100%',
                        padding: '8px 12px',
                        margin: '10px 0',
                        border: '1px solid #242427',
                        background: '#242427',
                        borderRadius: '8px',
                        boxSizing: 'border-box',
                        fontSize: '16px',
                        color: 'white',
                        outline: 'none',
                        transition: 'border-color 0.3s ease',
                        height: '80px',
                        resize: 'none'
                    }}
                />
                <input
                    type="text"
                    className="input-field"
                    placeholder={t('clans.create_clan_modal.channel')}
                    ref={chanelInputRef}
                    value={clanChanel}
                    onChange={(e) => setclanChanel(e.target.value)}
                    onKeyPress={handleClanChanelKeyPress}
                    style={{
                        width: '100%',
                        padding: '8px 12px',
                        margin: '10px 0',
                        border: '1px solid #242427',
                        background: '#242427',
                        borderRadius: '8px',
                        boxSizing: 'border-box',
                        fontSize: '16px',
                        color: 'white',
                        outline: 'none',
                        transition: 'border-color 0.3s ease',
                        height: '40px',
                        marginTop: '10px'
                    }}
                />
            </div>
            <div className="reward-container-task-modal-boost" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                alignContent: 'center',
                marginBottom: '24px'
            }}>
                <div className="coins-boost-t-container"
                     style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <img src={IcCoins} className="ic-reward-container-coins" style={{width: '32px', height: '32px'}}/>
                    <p className="tx-reward-container-coins"
                       style={{color: 'white', fontSize: '16px', marginLeft: '8px'}}>-50K</p>
                </div>
                <p className="lvl-item-boost"
                   style={{color: 'white', fontSize: '14px'}}>{t('clans.create_clan_modal.creating_clan')}</p>
            </div>

            <div className="main-btn-action-to-upgrade" onClick={setUpCreate} style={{
                width: '100%',
                borderRadius: '16px',
                padding: '24px 8px',
                background: 'linear-gradient(60deg, #F527DD, #2B7FF2)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '16px',
            }}>
    <span className="main-tx-to-btn-action-to-upgrade" style={{
        color: 'white',
        fontSize: '16px',
        textAlign: 'center',
        userSelect: 'none'
    }}>
        {t('clans.create_clan_modal.btn_create_clan')}
    </span>
            </div>


        </div>
        {loading && <ProgressBar/>}
    </div>
}