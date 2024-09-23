import React from "react";
import IcClose from "../../../assets/icon/ic_close.svg";
import IcAlert from "../../../assets/icon/ic_alert_circle.svg";

interface InformationBoardParams {
    tx: string;
    onClickClose?: () => void | null;
}

export const InformationBoard: React.FC<InformationBoardParams> = ({tx, onClickClose}) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            background: 'linear-gradient(180deg, #E2E5FF 0%, #DED3FF 100%)',
            borderRadius: '16px',
            padding: '8px 8px', // Отступы внутри контейнера
        }}>
            {/* Верхняя строка с кнопкой закрытия */}
            <div style={{
                display: 'flex',
                justifyContent: 'flex-end', // Размещаем кнопку закрытия справа
                marginBottom: '2px' // Отступ снизу для отступа от основного контента
            }}>
                <div style={{
                    width: '16px', height: '16px',
                    borderRadius: '999px',
                    background: '#252830',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer'
                }} onClick={onClickClose}>
                    <img src={IcClose}
                         style={{width: '8px', height: '8px'}}/>
                </div>
            </div>

            {/* Основной контент */}
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '8px' // Промежуток между иконкой и текстом
            }}>
                <img src={IcAlert} style={{
                    width: '24px', height: '24px'
                }}/>
                <span style={{
                    color: '#131418',
                    fontSize: '12px',
                    fontFamily: 'UbuntuRegular'
                }}>
                    {tx}
                </span>
            </div>
        </div>
    );
};
