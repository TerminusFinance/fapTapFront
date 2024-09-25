import React, {useEffect, useState} from "react";
import BgBadRoom from "../../../assets/background/room.svg";
import {HorizontalSelector} from "../../otherViews/selectors/HorizontalSelector.tsx";
import {ImproveList} from "./ImproveList.tsx";
import NavigationBar from "../../otherViews/navigationBar/NavigationBar.tsx";
import {useNavigate} from "react-router-dom";
import {useData} from "../../otherViews/DataContext.tsx";
import {ModalImproveItem} from "../../modal/modalImproveItem/ModalImproveItem.tsx";
import {
    getImproveResultUserItem,
    getPremiumItem,
    getUserCustom,
    setToSelected,
    SubscriptionOptions,
    upLevelToItem,
    UserCustom,
    UsersImproveItem
} from "../../../core/RemoteWorks/ImproveRemote.tsx";
import IcCoins from "../../../assets/icon/ic_coin.svg";
import IcEnergy from "../../../assets/icon/ic_battery.svg";
import ProgressBar from "../../otherViews/progresBar/ProgressBar.tsx";
import {useToast} from "../../otherViews/toast/ToastContext.tsx";
import CustomItem from "./Custom.tsx";
import {useTelegramBackButton} from "../../../core/Utils.ts";

import {getPremiumUsers, subscribeToPremium} from "../../../core/RemoteWorks/PayRemote.tsx";
import {initInvoice} from "@telegram-apps/sdk";
import {ButtonNext} from "../../otherViews/buttons/ButtonNext.tsx";
import {ModalBuyPrem} from "../../modal/modalBuyPrem/ModalBuyPrem.tsx";

export const ImproveScreen: React.FC = () => {
    const {dataApp, setDataApp} = useData();
    const [tabSelected, setTabSelected] = useState<string>("Improve");
    const [selectedImprove, setSelectedImprove] = useState<UsersImproveItem | null>(null);
    const [itemImprove, setItemImprove] = useState<UsersImproveItem[]>([]);
    const [customItem, setCustomItem] = useState<UserCustom[]>([]);
    const [isModalImproveItemVisible, setIsModalImproveItemVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const {showToast} = useToast();
    const invoice = initInvoice();

    const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

    const [prem, setPrem] = useState<SubscriptionOptions[]>([])
    const [selectedOptions, setSelectedOptions] = useState<SubscriptionOptions | null>(null)
    try {
        useTelegramBackButton(true)
    } catch (e) {
        console.log("error in postEvent - ", e)
    }

    const handleShowToast = (message: string, type: 'success' | 'error' | 'info') => {
        showToast(message, type);
    };

    const onCloseModal = () => {
        setIsModalImproveItemVisible(false);
    };

    const openModalImproveItem = (item: UsersImproveItem) => {
        setSelectedImprove(item);
        setIsModalImproveItemVisible(true);
    };

    const handleTabSelect = (selectedTab: string) => {
        setTabSelected(selectedTab);
    };

    const navigate = useNavigate();
    const handleNav = (marsh: string) => {
        navigate(`/${marsh}`);
    };

    const sendToSelected = async (id: number) => {
        setLoading(true);
        const response = await setToSelected(id);
        if (Array.isArray(response)) {
            setCustomItem(response);
            const selectedItem = response.find(item => item.isSelected === 1);
            if (selectedItem) {
                setDataApp(prevDataApp => ({
                    ...prevDataApp,
                    selectedModel: selectedItem
                }));

                    const result = await getImproveResultUserItem(id);
                    if (typeof result == "object") {
                        setItemImprove(result);
                    }

            }
        } else {
            handleShowToast(response.toString(), 'error');
        }
        setLoading(false);
    };

    const getImproveItem = async () => {
            setLoading(true);
            if (dataApp.selectedModel?.customId != null) {

                const result = await getImproveResultUserItem(dataApp.selectedModel.customId);
                const customResult = await getUserCustom();
                if (typeof result == "object") {
                    setItemImprove(result);
                    if (typeof customResult == "object") {
                        setCustomItem(customResult);
                    }
                }
                setLoading(false);
            } else {
                showToast("id is null", "error")
            }
        }
    ;

    const getPrem = async () => {
        const result = await getPremiumItem()
        if (typeof result == "object") {
            setPrem(result)
        }
    }

    const upLevelImprove = async () => {
        setLoading(true);
        if (selectedImprove && dataApp.selectedModel != null) {
            const result = await upLevelToItem(dataApp.selectedModel?.customId, selectedImprove.improveId);
            if (typeof result == "object") {
                setDataApp(prevDataApp => ({
                    ...prevDataApp,
                    coins: result.coins
                }));
                setItemImprove(result.itemResults);
                handleShowToast('Success up level', "success");
                onCloseModal();
            } else {
                handleShowToast(result, "error");
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        getImproveItem();
        getPrem()
    }, []);

    const buyPrem = async () => {
        const subscriptionOptions = selectedOptions
        if (subscriptionOptions) {
            const result = await subscribeToPremium(subscriptionOptions)
            console.log("resultToBuyPremka - ", result)
            if (typeof result == 'object') {
                if (result.ok) {
                    invoice
                        .open(result.result, 'url')
                        .then((status) => {

                            if (status == "paid") {
                                ProcessingPaidResult()

                            }
                            return console.log(status);
                        });
                }
            }
        }
    }

    const ProcessingPaidResult = async () => {
        setLoading(true);
        const checkAndUpdate = async () => {
            const paidResult = await getPremiumUsers();

            if (typeof paidResult === "object" && paidResult !== null) {
                const {endDateOfWork} = paidResult;

                if (endDateOfWork !== null) {
                    setDataApp(prevDataApp => ({
                        ...prevDataApp,
                        premium: paidResult
                    }));
                    closeBottomSheet();
                    setLoading(false);
                    showToast("successfully ", "success")
                } else {
                    setTimeout(checkAndUpdate, 2000); // Повторный запрос через 2 секунды
                }
            } else {
                setTimeout(checkAndUpdate, 2000); // Повторный запрос через 2 секунды
            }
        };

        checkAndUpdate();
    };


    const closeBottomSheet = () => {
        setBottomSheetVisible(false);
    };

    const openModalBuy = (subscriptionOptions: SubscriptionOptions) => {
        setSelectedOptions(subscriptionOptions)
        setBottomSheetVisible(true);
    }

    return (
        <div style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            background: '#131418',
        }}>

            {/* Блок с изображением и деталями */}
            <div style={{
                width: '100%',
                height: '250px',
                backgroundImage: `url(${BgBadRoom})`,
                display: 'flex',
                flexDirection: 'row',
            }}>
                <img src={dataApp.selectedModel?.image} style={{height: '250px'}}/>
                <div style={{
                    width: '100%',
                    height: '50%',
                    padding: '12px',
                    margin: '48px',
                    borderRadius: '16px',
                    background: 'rgba(19, 20, 24, 0.72)',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <span style={{fontSize: '14px', fontFamily: 'UbuntuMedium', color: 'white'}}>Details</span>
                    <ItemImproveUp name="Balance" img={IcCoins} valueUp={dataApp.coins.toString()}/>
                    <ItemImproveUp name="Per Tap" img={IcCoins} valueUp={dataApp.perTap.toString()}/>
                    <ItemImproveUp name="Energy" img={IcEnergy} valueUp={dataApp.maxEnergy.toString()}/>
                </div>
            </div>

            {/* Селектор табов */}
            <div style={{
                width: '100%',
                padding: '0 16px',
                marginTop: '4px',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <HorizontalSelector tabs={["Improve", "Custom", "Premium"]} onTabSelect={handleTabSelect}/>
            </div>

            {/* Основной контент с карточками */}
            <div style={{
                flexGrow: 1,
                width: '100%',
                padding: '0 16px',
                overflow: 'auto',
                paddingBottom: '80px',
            }}>
                {tabSelected === "Improve" && (
                    <ImproveList improveResultUserItem={itemImprove} onItemClick={openModalImproveItem}/>
                )}
                {tabSelected === "Custom" && (
                    <CustomItem item={customItem} sendToSelected={sendToSelected}/>
                )}

                {tabSelected === "Premium" && (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)', // Two items per row
                        gap: '16px', // Space between items
                        padding: '10px',
                    }}>
                        {prem.map((premItem => (
                            <PremiumItem subscriptionOptions={premItem} onClick={() => openModalBuy(premItem)}/>
                        )))}
                    </div>
                )}
            </div>

            {/* Фиксированная навигационная панель */}
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
                <NavigationBar
                    initialSelected={"Improve"}
                    onFriendsClick={() => handleNav("friends")}
                    onFapClick={() => handleNav('fap')}
                    onQuestClick={() => handleNav('quests')}
                    onTopClick={() => handleNav('top')}
                    onImproveClick={() => {
                    }}
                />
            </div>

            {/* Модальное окно и прогрессбар */}
            {selectedImprove && (
                <ModalImproveItem
                    isVisible={isModalImproveItemVisible}
                    onClose={onCloseModal}
                    img={selectedImprove?.image}
                    title={selectedImprove?.name}
                    description={selectedImprove.name}
                    rewards={selectedImprove?.rewards}
                    onClick={upLevelImprove}
                />
            )}


            <ModalBuyPrem isVisible={isBottomSheetVisible} onClose={closeBottomSheet} onBuy={buyPrem}/>

            {loading && <ProgressBar/>}
        </div>
    );
};

interface ItemImproveUpParam {
    img: string;
    name: string;
    valueUp: string;
}

const ItemImproveUp: React.FC<ItemImproveUpParam> = ({img, name, valueUp}) => (
    <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
    }}>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <img src={img} style={{width: '16px', height: '16px'}}/>
            <span style={{color: '#B5B7B9', fontSize: '12px', fontFamily: 'UbuntuRegular'}}>{name}</span>
        </div>
        <span style={{color: 'white', fontSize: '12px', fontFamily: 'UbuntuMedium'}}>{valueUp}</span>
    </div>
);

interface premItemParam {
    subscriptionOptions: SubscriptionOptions,
    onClick: () => void;
}

export const PremiumItem: React.FC<premItemParam> = ({subscriptionOptions, onClick}) => {

    return (
        <div style={{
            borderRadius: '16px',
            border: "2px solid #191B20",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            alignContent: 'center',
            padding: '12px'
        }}>

            <img src={subscriptionOptions.image} style={{
                width: '64px',
                height: '64px'
            }}/>

            <span style={{
                fontSize: '14px',
                color: 'white',
                fontFamily: 'UbuntuBold'
            }}>{subscriptionOptions.name}</span>

            <span style={{
                color: '#B5B7B9',
                fontSize: '12px',
                fontFamily: 'UbuntuRegular'
            }}>
                {subscriptionOptions.description}
            </span>

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '16px',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>

                <div style={{
                    background: '#584CF4',
                    borderRadius: '999px',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: '36px',
                    paddingRight: '36px',
                    height: '32px',
                    flexGrow: 1,
                }}>
        <span style={{
            color: 'white',
            fontSize: '14px',
            fontFamily: 'UbuntuMedium'
        }}>
            {subscriptionOptions.price}
        </span>
                </div>

                <div style={{flexShrink: 0}}>
                    <ButtonNext sizeBtn={32} onClick={onClick} sizeImg={16}/>
                </div>
            </div>
        </div>
    )
}
