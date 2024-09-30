import
    React from "react";
import {ButtonNext} from "../buttons/ButtonNext.tsx";
import IcCoins from "../../../assets/icon/ic_coin.svg";
import {Rewards} from "../../../core/RemoteWorks/ImproveRemote.tsx";
import IcLoading from "../../../assets/icon/ic_loading.svg"

interface ItemElementsImproveParam {
    title: string;
    img: string;
    level: number;
    price?: number;
    handleClick: () => void;
    itemUpgrate?: Rewards[] | null;
    onLoading?: boolean | null
}

export const ItemElementsImprove: React.FC<ItemElementsImproveParam> = ({
                                                                            title,
                                                                            img,
                                                                            price,
                                                                            handleClick,
                                                                            itemUpgrate,
                                                                            level,
                                                                            onLoading
                                                                        }) => {
    console.log("onLoading is = ",onLoading)
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '8px 8px',
                borderRadius: "16px",
                border: "2px solid #191B20",
                marginTop: '4px',
                marginBottom: '4px'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignContent: 'center',
                        alignItems: 'center',
                        gap: '10px'
                    }}
                >
                    <div style={{position: 'relative', display: 'inline-block'}}>
                        <img
                            src={img}
                            style={{
                                width: '56px',
                                height: '56px',
                                border: '1.5px solid white',
                                borderRadius: '999px',
                                filter: level > 1 ? 'blur(4px)' : 'none', // Размытие, если уровень больше 1
                                opacity: level > 1 ? 0.7 : 1, // Легкая прозрачность при размытии
                            }}
                        />
                        {level > 1 && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '16px',
                                    textShadow: '0px 0px 5px black', // Тень для улучшения читабельности текста
                                }}
                            >
                                {`${level}`}
                            </div>
                        )}
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            justifyItems: 'center'
                        }}
                    >
                        <span
                            style={{
                                color: '#F0EFFB',
                                fontSize: '16px',
                                fontFamily: 'UbuntuMedium'
                            }}
                        >
                            {title}
                        </span>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '10px' // Отступ между элементами
                            }}
                        >
                            {itemUpgrate?.slice(0, 2).map((item) => (
                                <ItemUpgrade name={item.name} img={item.img}/>
                            ))}
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignContent: 'center',
                        alignItems: 'center',
                        gap: '6px'
                    }}
                >

                    {price && (
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignContent: 'center',
                            alignItems: 'center'
                        }}>
                            <img src={IcCoins} style={{width: '16px', height: '16px'}}/>
                            <span
                                style={{color: '#F0EFFB', fontSize: '14px', fontFamily: 'UbuntuMedium'}}>{price}</span>
                        </div>
                    )}


                    {onLoading == true ? (
                        <img src={IcLoading} style={{width: '32px', height: '32px'}}/>
                    ) : (
                        <ButtonNext sizeBtn={32} onClick={handleClick} sizeImg={16}/>
                    )}
                </div>
            </div>
        </div>
    );
}

interface ItemUpgradeParam {
    img: string;
    name: string
}

export const ItemUpgrade: React.FC<ItemUpgradeParam> = ({img, name}) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
            background: '#191B20',
            gap: '4px',
            borderRadius: '999px',
        }}>

            <img src={img} style={{width: '14px', height: '14px'}}/>

            <span style={{
                color: '#B5B7B9',
                fontFamily: 'UbuntuRegular',
                fontSize: '12px',
                margin: '4px 8px'
            }}>
                {name}
            </span>
        </div>
    )
}