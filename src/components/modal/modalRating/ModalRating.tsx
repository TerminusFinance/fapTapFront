import React, {useEffect, useRef, useState} from "react";
import {ButtonClose} from "../../otherViews/buttons/ButtonClose.tsx";
import ProgressBar from "../../otherViews/progresBar/ProgressBar.tsx";
import {initInvoice} from "@telegram-apps/sdk";
import {
    boosClanLevels,
    getListSubscriptionOptionsClanUpgrateRunks,
    SubscriptionOptionsClan
} from "../../../core/RemoteWorks/ClanRemote.tsx";
// import IcoStars from "../../../assets/icon/ic_premium_star_simpl.svg";
import {VerticalSelectorPrice} from "../../otherViews/selectors/VertecalSelector.tsx";
import {ButtonMain} from "../../otherViews/buttons/ButtonMain.tsx";
import {useTranslation} from "react-i18next";

interface ModalRatingProps {
    isVisible: boolean;
    onClose: () => void;
    onBtnClick: () => void
}


// interface Price {
//     name: string;
//     price: number;
// }


export const ModalRating: React.FC<ModalRatingProps> = ({
                                                                    isVisible,
                                                                    onClose,
                                                                    onBtnClick
                                                                }) => {


    const overlayRef = useRef<HTMLDivElement>(null);
    const sheetRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [loading, setLoading] = useState(false);
    const [prices, setPrices] = useState<SubscriptionOptionsClan[]>()
    const [selectedItem, setSelectedItem] = useState<SubscriptionOptionsClan>()
    const invoice = initInvoice();
    const {t} = useTranslation();

    const handleTabSelect = (selectedTab: { name: string; price: number }) => {
        const item: SubscriptionOptionsClan = {
            name: selectedTab.name,
            price: selectedTab.price
        };
        setSelectedItem(item);
        console.log('Selected tab:', selectedTab);
    };

    const onClickToBuy = async () => {
        if (selectedItem != undefined) {
            const result = await boosClanLevels(selectedItem)
            console.log("resultToBuyPremka - ", result)
            if (typeof result == 'object') {
                if (result.ok) {
                    invoice
                        .open(result.result, 'url')
                        .then((status) => {
                            // Output: 'paid'
                            if (status == "paid") {
                                setLoading(true)
                                //Обработка успешной покупки подписки
                                onBtnClick()
                                setLoading(false)
                                onClose()
                            }
                            return console.log(status);
                        });
                }
            }

        }
    }
    useEffect(() => {
        const beber = async () => {

            const result = await getListSubscriptionOptionsClanUpgrateRunks()
            if (typeof result == "object") {
                setPrices(result)
                setSelectedItem(result[0])
            }
        }
        beber()
    }, []);

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

            {prices != undefined ? (
                <VerticalSelectorPrice tabs={prices} onTabSelect={handleTabSelect}/>
            ) : (
                <div>
                    <span>Not found</span>
                </div>
            )}


            <ButtonMain tx={t('clans.modal.action_btn')} onRed={false} onClick={onClickToBuy}/>


        </div>
        {loading && <ProgressBar/>}
    </div>
}