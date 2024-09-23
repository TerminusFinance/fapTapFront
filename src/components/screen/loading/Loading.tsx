import React, {useEffect, useState} from 'react';
import LogoModel from "../../../assets/logo/logo_model_start_4x.png";
import { useNavigate } from 'react-router-dom';
import {LineProgressBar} from "../../otherViews/progresBar/LineProgresBar.tsx";
import {getUserById} from "../../../core/RemoteWorks/UsersRemote.tsx";
import {useData} from "../../otherViews/DataContext.tsx";
import {useTranslation} from "react-i18next";

export const LoadingScreen: React.FC = () => {
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();
    const {setDataApp} = useData();

    const { t } = useTranslation();

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => (prev < 100 ? prev + 1 : 100));

        }, 30);

        return () => clearInterval(interval);
    }, []);



    useEffect(() => {
        const fetchData = async () => {
            const result = await getUserById();
            console.log("result get - result",result)
            if (typeof result ==="string") {
                    console.log('User not found');
                    navigate('/start');
            } else if (typeof result === 'object'){
                console.log("set up data - ", result.coins);
                setDataApp(result);
                navigate('/fap');
            }
        }
        fetchData()
    }, []);

    return (
        <div style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            background: '#131418',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px'
        }}>
            {/* Градиентный фон */}
            <div style={{
                width: 390,
                height: 345,
                paddingBottom: 173,
                paddingLeft: 34,
                paddingRight: 34,
                left: 0,
                top: 0,
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'inline-flex'
            }}>
                <div style={{
                    width: 322,
                    height: 172,
                    background: 'linear-gradient(180deg, #B3ACFC 0%, #584CF4 100%)',
                    boxShadow: '0px 0px 200px rgba(0, 0, 0, 0.25)',
                    borderRadius: '50%',
                    filter: 'blur(200px)',
                    zIndex: 0
                }}/>
            </div>

            {/* Иконка по центру */}
            <div/>

            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>

                <img src={LogoModel} alt='Coin' style={{width: 400, zIndex: 2}}/>

                <span style={{
                    fontSize: '48px',
                    color: '#FFFFFF',
                    zIndex: 2,
                    fontFamily: 'OiRegular',
                    letterSpacing: '5px',
                    textShadow: '0 0 5px #800080, 0 0 10px #800080, 0 0 15px #800080'
                }}>FapTap
                </span>

                <span style={{
                    fontSize: '24px',
                    color: '#FFFFFF',
                    zIndex: 2,
                    fontFamily: 'UltraRegular',
                    letterSpacing: '1.5px',
                    textAlign: 'center'
                }}>Run your webcam empire!
                </span>

            </div>

            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', alignContent: 'center', marginBottom: '24px'}}>
                <span style={{
                    fontSize: '24px',
                    color: '#FFFFFF',
                    zIndex: 2,
                    fontFamily: 'UbuntuLight',
                    letterSpacing: '1.5px',
                    textAlign: 'center',
                    marginBottom: "4px"
                }}>{t('loading.loading')}
                </span>

                <LineProgressBar progress={progress} height={8}/>
            </div>
        </div>
    );
};
