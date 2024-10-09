import React, { useEffect, useRef, useState } from "react";
import { ButtonClose } from "../../otherViews/buttons/ButtonClose.tsx";
import { ButtonMain } from "../../otherViews/buttons/ButtonMain.tsx";
import {buyOneTimePremium} from "../../../core/RemoteWorks/PayRemote.tsx";
import {initInvoice} from "@telegram-apps/sdk";
import IcStarts from "../../../assets/icon/ic_premium_star_simpl.svg";

interface ModalNotificationPremiumProps {
    isVisible: boolean;
    onClose: () => void;
}

export const ModalNotificationPremium: React.FC<ModalNotificationPremiumProps> = ({
                                                                                      isVisible,
                                                                                      onClose,
                                                                                  }) => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const sheetRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const invoice = initInvoice();

    useEffect(() => {
        if (isVisible) {
            setIsAnimating(true);
            if (overlayRef.current && sheetRef.current) {
                overlayRef.current.style.opacity = "0";
                overlayRef.current.style.visibility = "visible";
                sheetRef.current.style.transform = "translateY(100%)";
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
                }, 300);
            }
        }
    }, [isVisible]);

    const buyPrem = async () => {
            const result = await buyOneTimePremium()
            console.log("resultToBuyPremka - ", result)
            if (typeof result == 'object') {
                if (result.ok) {
                    invoice
                        .open(result.result, 'url')
                        .then((status) => {
                            if (status == "paid") {
                                onClose()
                            }
                            return console.log(status);
                        });
                }
            }
    }

    const handleOverlayClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).classList.contains("modal-overlay")) {
            onClose();
        }
    };




    if (!isVisible && !isAnimating) return null;

    return (
        <div
            className="modal-overlay"
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
                zIndex: 150,
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
                    <ButtonClose sizeImg={12} sizeBtn={32} onClick={onClose} />
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
                    <span style={{
                        color: 'white',
                        fontSize: '24px',
                        fontFamily: 'UbuntuBold',
                        marginTop: '14px',
                        marginBottom: '14px',
                        textAlign: 'center',
                    }}>Получите доступ к fapTap Premium</span>

                    <span style={{
                        color: '#B5B7B9',
                        fontSize: '16px',
                        fontFamily: 'UbuntuBold',
                        marginTop: '4px',
                        marginBottom: '8px',
                        textAlign: 'center'
                    }}>Участвуйте в развитии DCL и зарабатывайте вместе с командой проекта!</span>

                    {/* New list section before the buttons */}
                    <ul style={{
                        listStyle: "none",
                        padding: 0,
                        margin: "10px 0 20px 0",
                        color: "#B5B7B9",
                        textAlign: "left"
                    }}>
                        <li>🎟 Пожизненное право на участие в розыгрышах Гран-при</li>
                        <li>🔒 Гарантируйте приоритет вашей транзакции при клейме аирдропа</li>
                        <li>💰 Получите единовременный бонус в размере 100 000 000 монет и 1000 спинов</li>
                        <li>⭐ Выделяйтесь на фоне других — ваш профиль получит уникальный дизайн</li>
                    </ul>
                </div>

                {/*<ButtonSecond tx={"купить за TON"}  onClick={sendTransactions} />*/}
                <ButtonMain tx={"купить за 500"} onRed={false} onClick={buyPrem} imgInTx={IcStarts} />
            </div>
        </div>
    );
};
