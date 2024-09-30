import React, {useEffect, useState} from 'react';
import LogoModel from "../../../assets/logo/logo_model_start_4x.png";
import {useLocation, useNavigate} from 'react-router-dom';
import {LineProgressBar} from "../../otherViews/progresBar/LineProgresBar.tsx";
import {getUserById} from "../../../core/RemoteWorks/UsersRemote.tsx";
import {useData} from "../../otherViews/DataContext.tsx";
import {useTranslation} from "react-i18next";
import {retrieveLaunchParams} from "@telegram-apps/sdk";
import {useTelegramBackButton} from "../../../core/Utils.ts";

export const LoadingScreen: React.FC = () => {
    const { search } = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(search);
    const inviteCode = params.get('inviteCode');

    // const [data, setData] = useState<UserData | null>(null);
    const { setDataApp } = useData();


    const [progress, setProgress] = useState(0);
    try {
        useTelegramBackButton(false);
    } catch (e) {
        console.log("error in postEvent - ", e);
    }

    const { t } = useTranslation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setProgress(20)

                try {
                    const { initData } = retrieveLaunchParams();
                    const InitDataStaertParam = initData?.startParam
                    if(params != undefined) {
                        if(InitDataStaertParam != undefined) {
                            setProgress(50)
                            const InviteCodeParams = inviteCode != null ? inviteCode : InitDataStaertParam
                            const result = await getUserById();
                            setProgress(70)
                            if (typeof result ==="string") {
                                console.log("передал в  InitDataStaertParam параметр - ", InitDataStaertParam)
                                setProgress(100)
                                navigate('/start', {state: {inviteCode: InviteCodeParams}});
                            } else if (typeof result === 'object'){
                                setProgress(50)
                                const isClanInvite = InviteCodeParams.startsWith('CL');
                                console.log("isClanInvite - ", isClanInvite, "InviteCodeParams -", InviteCodeParams)
                                setDataApp(result);
                                setProgress(100)
                                if(isClanInvite) {
                                    const inviteCode = InviteCodeParams
                                    setProgress(100)
                                    navigate('/fap', { state: { inviteCode } });
                                } else  {
                                    navigate('/fap');
                                }
                            }
                        } else  {
                            setProgress(50)
                            const result = await getUserById();
                            if (typeof result ==="string") {
                                if(!inviteCode) {
                                    setProgress(100)
                                    console.log('User not found');
                                    navigate('/start', {state: {inviteCode: null}})
                                } else  {
                                    console.log('User not found');
                                    navigate('/start', {state: {inviteCode}});
                                }
                            } else if (typeof result === 'object'){
                                console.log("set up data - ", result.coins);
                                setDataApp(result);
                                navigate('/fap');
                            }
                        }

                    } else {
                        if(InitDataStaertParam != undefined) {
                            setProgress(50)
                            const InviteCodeParams = inviteCode != null ? inviteCode : InitDataStaertParam
                            const result = await getUserById();

                            setProgress(100)
                            if (typeof result ==="string") {
                                console.log('User not found');
                                navigate('/start', {state: {InviteCodeParams}});

                            } else if (typeof result === 'object'){
                                console.log("set up data - ", result.coins);

                                setDataApp(result);
                                navigate('/fap');
                            }
                        }
                    }
                } catch (e) {
                    console.log(e)
                    navigate('/not-found', {});
                }

            } catch (error) {
                console.error('Error:', error);
            }
        };
        //
        fetchData();
        // navigate('/check');

    }, [navigate])

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

                <LineProgressBar progress={progress} height={8} maxValue={100}/>
            </div>
        </div>
    );
};
