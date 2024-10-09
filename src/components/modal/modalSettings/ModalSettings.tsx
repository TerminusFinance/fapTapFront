import React, {useEffect, useRef, useState} from "react";
import {ButtonClose} from "../../otherViews/buttons/ButtonClose.tsx";
import IcSettingsFrame from "../../../assets/icon/ic_settings_frame.svg";
import {useData} from "../../otherViews/DataContext.tsx";
import {useTonConnectUI, useTonWallet} from "@tonconnect/ui-react";
import {updateUser} from "../../../core/RemoteWorks/AirDropRemote.tsx";
import {getUserById} from "../../../core/RemoteWorks/UsersRemote.tsx";
import {Address} from "ton-core";
import ArrowDown from "../../../assets/icon/ic_arrow_right.svg";
import {changeLanguage} from "i18next";

interface ModalSettingsProps {
    isVisible: boolean;
    onClose: () => void;
}

export const ModalSettings: React.FC<ModalSettingsProps> = ({
                                                                isVisible,
                                                                onClose,
                                                            }) => {

    const overlayRef = useRef<HTMLDivElement>(null);
    const sheetRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);


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
                    }}>Settings</span>
                </div>

                <ConnectWalletSettingsItem/>
                <div style={{
                    height: '16px'
                }}/>

                <ChangeLanguage/>

            </div>
        </div>
    )
}


export const ConnectWalletSettingsItem: React.FC = () => {

    const {dataApp, setDataApp} = useData()
    const [tonConnectUI] = useTonConnectUI();
    const wallet = useTonWallet();
    const [setUpAddress, setSetUpAddress] = useState(false)


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
            if (wallet) {
                await tonConnectUI.disconnect()
            }
            tonConnectUI.modal.open()
        }
    }

    return (
        <div style={{
            background: '#191B20',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
            alignItems: 'center',
            paddingTop: '12px',
            paddingBottom: '12px',
            paddingLeft: '8px',
            paddingRight: '8px'
        }}>

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
                alignItems: 'center'
            }}>
                <img/>
                <span style={{
                    color: 'white',
                    fontSize: '16px',
                    fontFamily: 'UbuntuRegular'
                }}>
                    Wallet
                </span>
            </div>

            <div style={{
                background: '#039855',
                borderRadius: '999px',
                paddingRight: '8px',
                paddingLeft: '8px',
                paddingBottom: '4px',
                paddingTop: '4px'
            }} onClick={callAddressMenu}>

                <span style={{
                    color: 'white',
                    fontSize: '14px',
                    fontFamily: 'UbuntuRegular'
                }}>{dataApp.address ? "Connected" : "Connect"}</span>
            </div>

        </div>
    )
}

export const ChangeLanguage: React.FC = () => {
    const listLanguage = [
        {
            name: "Русский",
            code: "ru"
        },
        {
            name: "English",
            code: "en"
        }
    ];

    const [selectedLanguage, setSelectedLanguage] = useState(listLanguage[1]); // По умолчанию English
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Управление выпадающим списком
    const [dropdownDirection, setDropdownDirection] = useState<'top' | 'bottom'>('bottom'); // Направление окна

    const dropdownRef = useRef<HTMLDivElement>(null); // Ref для dropdown

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const setLanguage = (newLanguage: typeof listLanguage[0]) => {
        setSelectedLanguage(newLanguage);
        setIsDropdownOpen(false);
        console.log(`Language changed to ${newLanguage.name}`);
        changeLanguage(newLanguage.code)
    };

    // Проверяем место на экране для позиционирования окна
    useEffect(() => {
        if (isDropdownOpen && dropdownRef.current) {
            const dropdownRect = dropdownRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - dropdownRect.bottom;
            const spaceAbove = dropdownRect.top;

            // Меняем направление окна в зависимости от доступного пространства
            if (spaceBelow < dropdownRect.height && spaceAbove > spaceBelow) {
                setDropdownDirection('top');
            } else {
                setDropdownDirection('bottom');
            }
        }
    }, [isDropdownOpen]);

    return (
        <div style={{
            background: '#191B20',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 8px'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <img />
                <span style={{
                    color: 'white',
                    fontSize: '16px',
                    fontFamily: 'UbuntuRegular'
                }}>
                    Language
                </span>
            </div>

            <div style={{
                background: '#252830',
                borderRadius: '999px',
                padding: '4px 8px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                position: 'relative'
            }} onClick={toggleDropdown} ref={dropdownRef}>
                <span style={{
                    color: 'white',
                    fontSize: '14px',
                    fontFamily: 'UbuntuRegular'
                }}>
                    {selectedLanguage.name}
                </span>

                <img src={ArrowDown} style={{ width: '24px', height: '24px', transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(90deg)' }} />

                {/* Dropdown list */}
                {isDropdownOpen && (
                    <div style={{
                        position: 'absolute',
                        [dropdownDirection]: '100%',
                        right: 0,
                        backgroundColor: '#252830',
                        borderRadius: '8px',
                        marginTop: dropdownDirection === 'bottom' ? '8px' : 'auto',
                        marginBottom: dropdownDirection === 'top' ? '8px' : 'auto',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                        zIndex: 1,
                    }}>
                        {listLanguage.map((language) => (
                            <div key={language.code} style={{
                                padding: '8px 16px',
                                cursor: 'pointer',
                                color: 'white',
                                fontFamily: 'UbuntuRegular',
                                backgroundColor: selectedLanguage.code === language.code ? '#3A3F47' : 'transparent',
                                borderRadius: '8px',
                            }} onClick={() => setLanguage(language)}>
                                {language.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
};