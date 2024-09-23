import React from "react";

interface RoundButtonParams {
    size?: number | null;
    bgColor: string;
    image?: string | null;
    tx?: string | null;
    sizeItem?: number | null;
    clickHandler?: () => void
}

export const RoundButton: React.FC<RoundButtonParams> = ({size, bgColor, image, tx, sizeItem, clickHandler}) => {

    return (
        <div style={{
            width: size ? `${size}px` : '48px',
            height: size ? `${size}px` : '48px',
            paddingLeft: 8,
            paddingRight: 8,
            paddingTop: 8,
            paddingBottom: 8,
            background: bgColor,
            borderRadius: 999,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
            display: 'inline-flex',
            stroke: 'white',
            border: '1px solid #FFFFFF',
        }} onClick={clickHandler}>
            {image && (
                <img src={image} style={{width: sizeItem ? `${sizeItem}px` : '16px', height: sizeItem ? `${sizeItem}px` : '16px'}}/>
            )}
            {tx && (
                <div style={{
                    textAlign: 'right',
                    color: '#F0EFFB',
                    fontSize: 16,
                    fontFamily: 'UbuntuBold',
                }}>{tx}
                </div>
            )}

        </div>
    )

}