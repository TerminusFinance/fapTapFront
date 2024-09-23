import React, {} from 'react';
import LogoModel from "../../../assets/logo/logo_model_start_4x.png";
import {ButtonMain} from "../../otherViews/buttons/ButtonMain.tsx";
import {useNavigate} from "react-router-dom";
import {createUser} from "../../../core/RemoteWorks/UsersRemote.tsx";
import {useData} from "../../otherViews/DataContext.tsx";

export const FirstStartScreen: React.FC = () => {
    const navigate = useNavigate();
    const {setDataApp} = useData();
    // const handleNav = (marsh: string) => {
    //
    //     navigate(`/${marsh}`);
    //
    // };

    const createUserForStart = async () => {
        const result = await createUser(0);
        console.log("result", result);
        setDataApp(result)
        navigate('/fap');
    }

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

            <div style={{
                paddingLeft: '16px',
                paddingRight: '16px',
                marginBottom: '16px',
                width: '100%',
                boxSizing: 'border-box' // Учитываем padding в ширине
            }}>
                <ButtonMain tx={"Get Started"} onClick={() =>createUserForStart()}/>
            </div>

        </div>
    );
};
