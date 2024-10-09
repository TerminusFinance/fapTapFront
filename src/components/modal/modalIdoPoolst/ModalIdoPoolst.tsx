import React, {useEffect, useRef, useState} from "react";
import {ButtonClose} from "../../otherViews/buttons/ButtonClose.tsx";

import {ButtonMain} from "../../otherViews/buttons/ButtonMain.tsx";
import {Address, beginCell, toNano} from "ton-core";
import {useData} from "../../otherViews/DataContext.tsx";
import {useTonConnectUI, useTonWallet} from "@tonconnect/ui-react";
import {increaseSendedTone} from "../../../core/RemoteWorks/poolsRemote.tsx";

interface ModalIdoPoolstProps {
    isVisible: boolean;
    onClose: () => void;
    successHandler: () => void;
}

export const ModalIdoPoolst: React.FC<ModalIdoPoolstProps> = ({
                                                                  isVisible,
                                                                  onClose,
                                                                  successHandler
                                                              }) => {

    const overlayRef = useRef<HTMLDivElement>(null);
    const sheetRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const {dataApp} = useData();
    const wallet = useTonWallet();
    const [tonConnectUI] = useTonConnectUI();

    const chanelInputRef = useRef<HTMLInputElement>(null);
    const handleClanChanelKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            chanelInputRef.current?.focus();
        }
    };
    const [clanChanel, setclanChanel] = useState(1);

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


    const sendTransactions = async () => {
        const amount = clanChanel;
        const address = "EQD18dhkAGmKGJiWYPlIz0ltokUrE6ysXPzEKgxszxvqsy6R";
        const body = beginCell()
            .storeUint(0, 32)
            .storeStringTail(dataApp.userId)
            .endCell();
        const transaction = {
            validUntil: Date.now() + 1000000,
            messages: [
                {
                    address: address,
                    amount: toNano(amount).toString(),
                    payload: body.toBoc().toString("base64")
                },
            ]
        };

        try {
            const addressWallet = wallet?.account?.address ? Address.parse(wallet.account.address as string) : undefined;
            if (!addressWallet) {
                tonConnectUI.modal.open();
            } else {
                // setStateBtn("checkoutPayment");
                const result = await tonConnectUI.sendTransaction(transaction);
                console.log("result simpel", result.boc)
                console.log("result tostring", result.boc.toString())
                await increaseSendedTone(clanChanel, result.boc)
                successHandler()
                // console.log("result isWellFormed",result.boc.isWellFormed().toString())
            }
        } catch (e) {
            console.error(e);
        }
    };

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
                    {/*<img*/}
                    {/*    src={IcSettingsFrame}*/}
                    {/*    style={{*/}
                    {/*        width: "80px",*/}
                    {/*        height: "80px",*/}
                    {/*    }}*/}
                    {/*/>*/}

                    <span style={{
                        color: 'white',
                        fontSize: '24px',
                        fontFamily: 'UbuntuBold',
                        marginTop: '14px',
                        marginBottom: '14px'
                    }}>Pools</span>

                    <span style={{
                        color: '#B5B7B9',
                        fontSize: '16px',
                        fontFamily: 'UbuntuBold',
                        marginTop: '4px',
                        marginBottom: '8px',
                        textAlign: 'center'
                    }}>Участвуйте в развитии DCL и зарабатывайте вместе с командой проекта!</span>

                    <span style={{
                        color: '#B5B7B9',
                        fontSize: '14px',
                        fontFamily: 'UbuntuMedium',
                        marginBottom: '14px',
                        textAlign: 'center'
                    }}>Введите сумму (1 TON и больше)</span>
                </div>

                <input
                    type="text"
                    className="input-field"
                    placeholder={"0"}
                    ref={chanelInputRef}
                    value={clanChanel}
                    onChange={(e) => {
                        const value = e.target.value;
                        // Convert the value to a number if it only contains digits
                        if (/^\d*$/.test(value)) {
                            setclanChanel(Number(value));
                        }
                    }}
                    onKeyPress={handleClanChanelKeyPress}
                    inputMode="numeric"
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


                <ButtonMain tx={"Внести"} onRed={false} onClick={() => {
                    sendTransactions()
                }}/>

            </div>
        </div>
    )
}

