import
    React from "react";
import IcCoins from "../../../assets/icon/ic_coin.svg";

interface ItemElementsFriendsParam {
    title: string;
    img: string;
    level: number;
    coins?: number;
}

export const ItemElementsIFriends: React.FC<ItemElementsFriendsParam> = ({
                                                                            title,
                                                                            img,
                                                                            level,
                                                                             coins
                                                                        }) => {
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

                    <div style={{
                        background: '#252830',
                        borderRadius: '999px',
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '6px',
                        alignItems: 'center',
                        alignContent: 'center',
                        paddingLeft: '6px',
                        paddingRight: '6px',
                        paddingBottom: '4px',
                        paddingTop: '4px'
                    }}>

                        <img src={IcCoins} style={{
                            width: '16px', height: '16px'
                        }}/>
                        <span style={{
                            color: 'white',
                            fontFamily: 'UbuntuBold',
                            fontSize: '14px'
                        }}>
                            {coins}
                        </span>

                    </div>


                </div>
            </div>
        </div>
    );
}

