import React, {useEffect, useState} from "react";
import {Address, beginCell, toNano} from "ton-core";
import {useTonConnectUI, useTonWallet} from "@tonconnect/ui-react";
import {useNavigate} from "react-router-dom";
import ICAirDrop from "../../../assets/icon/ic_air-drop.png";
import {useTranslation} from "react-i18next";
import {useData} from "../../otherViews/DataContext.tsx";
import {useToast} from "../../otherViews/toast/ToastContext.tsx";
import {useTelegramBackButton} from "../../../core/Utils.ts";
import {getUserById} from "../../../core/RemoteWorks/UsersRemote.tsx";
import {checkTonTransfer, updateUser} from "../../../core/RemoteWorks/AirDropRemote.tsx";

const AirDrop: React.FC = () => {
    const {dataApp, setDataApp} = useData();
    const [stateBtn, setStateBtn] = useState("sendTone");
    const wallet = useTonWallet();
    const [tonConnectUI] = useTonConnectUI();
    const {showToast} = useToast();
    const [setUpAddress, setSetUpAddress] = useState(false);
    const navigate = useNavigate();
    const {t} = useTranslation();

    useTelegramBackButton(true);

    useEffect(() => {
        if (dataApp.address == undefined || dataApp.address === "") {
            setStateBtn("connectedWallet");
        } else {
            setStateBtn("sendTone");
        }
    }, [dataApp.address]);

    const checkoutPayment = async () => {
        console.log("in checkoutPayment")
        try {
            const result = await checkTonTransfer();
            if (result == true) {
                showToast("Congratulations! You are participating in the air drop", "success");
                setDataApp((prevDataApp) => ({
                    ...prevDataApp,
                    enabledAirDrop: 1,
                }));
                navigate(-1);
            } else {
                showToast(`Try to check after a ${result}`, "error");
            }
        } catch (e) {
            showToast("Try to check after a while", "error");
            console.error(e);
        }
    };

    const sendTransactions = async () => {
        const amount = 1;
        const address = "UQCm2B9MJCuJzxWaMCvvGCtszwdZQuqyrKIjOA5Po70T7lpp";
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
                setStateBtn("checkoutPayment");
                await tonConnectUI.sendTransaction(transaction);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const connectedWallet = async () => {
        console.log("Connecting wallet...");
        if (dataApp.address == undefined || dataApp.address === "") {
            setSetUpAddress(true);
            if (wallet) {
                await tonConnectUI.disconnect();
            }
            tonConnectUI.modal.open();
        }
    };

    const updateAddressUsers = async (address: string) => {
        await updateUser({address: address});
        const dataApsResultino = await getUserById();
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
        mestConst();
    }, [wallet]);


    return (
        <div className="profile-container">
            <div/>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
                overflowY: 'auto'
            }}>
                <div style={{
                    background: '#39456B',
                    borderRadius: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '16px',
                    width: '300px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                }}>
                    <span style={{
                        textAlign: 'center',
                        fontSize: '16px',
                        color: 'white',
                        fontWeight: 'bold',
                        marginBottom: '8px'
                    }}>{t('air_drop.up_container.title')}</span>

                    <div>
                        <div
                            style={{
                                background: stateBtn === "connectedWallet" ? '#0056b3' : 'transparent',
                                color: stateBtn === "connectedWallet" ? 'white' : 'white',
                                fontSize: '14px',
                                padding: '10px 16px',
                                borderRadius: '8px',
                                marginBottom: '8px',
                                cursor: 'pointer',
                                boxShadow: stateBtn === "connectedWallet" ? '0px 4px 8px rgba(0, 0, 0, 0.3)' : 'none',
                                transition: 'all 0.3s ease',
                                border: stateBtn === "connectedWallet" ? 'none' : '1px solid #fff', fontFamily: 'UbuntuMedium'
                            }}
                            onClick={() => stateBtn === "connectedWallet" && connectedWallet()}
                        >
                            1: {t('air_drop.up_container.btn_connect_wallet')}
                        </div>

                        <div
                            style={{
                                background: stateBtn === "sendTone" ? '#0056b3' : 'transparent',
                                color: stateBtn === "sendTone" ? 'white' : 'white',
                                fontSize: '14px',
                                padding: '10px 16px',
                                borderRadius: '8px',
                                marginBottom: '8px',
                                cursor: 'pointer',
                                boxShadow: stateBtn === "sendTone" ? '0px 4px 8px rgba(0, 0, 0, 0.3)' : 'none',
                                transition: 'all 0.3s ease',
                                border: stateBtn === "sendTone" ? 'none' : '1px solid #fff',
                                fontFamily: 'UbuntuMedium'
                            }}
                            onClick={() => stateBtn === "sendTone" && sendTransactions()}
                        >
                            2: {t('air_drop.up_container.btn_send_transaction')}
                        </div>

                        <div
                            style={{
                                background: stateBtn === "checkoutPayment" ? '#0056b3' : 'transparent',
                                color: stateBtn === "checkoutPayment" ? 'white' : 'white',
                                fontSize: '14px',
                                padding: '10px 16px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                boxShadow: stateBtn === "checkoutPayment" ? '0px 4px 8px rgba(0, 0, 0, 0.3)' : 'none',
                                transition: 'all 0.3s ease',
                                border: stateBtn === "checkoutPayment" ? 'none' : '1px solid #fff',
                                fontFamily: 'UbuntuMedium'
                            }}
                            onClick={() => stateBtn === "checkoutPayment" && checkoutPayment()}
                        >
                            3: {t('air_drop.up_container.btn_verify_the_transaction')}
                        </div>
                    </div>
                </div>

                <img style={{width: '128px', height: '128px'}} src={ICAirDrop} alt="AirDrop Icon"/>

                <span style={{
                    fontSize: '24px',
                    color: 'white',
                    textAlign: 'center',
                    fontFamily: 'UbuntuMedium'
                }}>{t('air_drop.title')}</span>

                <div style={{
                    fontSize: '16px',
                    color: 'white',
                    textAlign: 'center',
                    fontFamily: 'UbuntuMedium',
                    paddingLeft: '8px',
                    paddingRight: '8px'
                }}>
                    <p style={{marginBottom: '8px', color: 'white',}}>
                        {t('air_drop.description_1')}
                    </p>

                    <p style={{marginBottom: '8px', color: 'white',}}>
                        {t('air_drop.description_2')}
                    </p>

                    <p style={{color: 'white',}}>
                        {t('air_drop.description_3')}
                    </p>
                </div>

            </div>
            <div/>
        </div>
    );
}

export default AirDrop;
