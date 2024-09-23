import React, { useEffect, useRef, useState } from "react";
import { ButtonMain } from "../../otherViews/buttons/ButtonMain.tsx";
import {ButtonSecond} from "../../otherViews/buttons/ButtonSecond.tsx";
import {ButtonClose} from "../../otherViews/buttons/ButtonClose.tsx";
import IcPremiumFrame from '../../../assets/icon/ic_premium_frame.svg';

interface ModalBuyPremParam {
    isVisible: boolean;
    onClose: () => void;
    onBuy: () => void;
}

export const ModalBuyPrem: React.FC<ModalBuyPremParam> = ({
                                                                   isVisible,
                                                                   onClose,
                                                              onBuy
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
                        src={IcPremiumFrame}
                        style={{
                            width: "80px",
                            height: "80px",
                        }}
                    />

                    <p
                        style={{
                            textAlign: "start",
                            color: "white",
                            fontSize: "24px",
                            fontFamily: "UbuntuBold",
                            marginTop: '8px'
                        }}
                    >
                        Purchase Confirmation
                    </p>

                    <p
                        style={{
                            textAlign: "center",
                            color: "#B5B7B9",
                            fontSize: "14px",
                            fontFamily: "UbuntuRegular",
                            marginTop: '8px'
                        }}
                    >
                        By clicking "Buy," you confirm that you have read the user agreement and wish to purchase
                        the "6-Hour Offline Boost."
                    </p>

                    <div
                        style={{
                            marginTop: "32px",
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%',
                            gap: '8px'
                        }}
                    >
                        <ButtonSecond tx={"Close"} onClick={onClose} />
                        <ButtonMain tx={"Buy Now"} onClick={onBuy} onRed={false} />
                    </div>
                </div>
            </div>
        </div>
    );
};
