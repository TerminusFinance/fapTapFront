import React from "react";
import IcArrowRight from "../../../assets/icon/ic_arrow_right.svg";

interface MiddleDieParam {
    txTitle: string;
    ic: string;
    txItem: string;
    dopBtnVisible?: boolean;
}

export const MiddleDie: React.FC<MiddleDieParam> = ({
                                                        txTitle,
                                                        ic,
                                                        txItem,
                                                        dopBtnVisible,
                                                    }) => {
    return (
        <div
            style={{
                flex: 1, // Это позволит элементам занимать равное пространство
                display: "flex",
                flexDirection: "column",
                // backgroundColor: "rgba(18, 25, 24, 100%)",
                border: "1px solid #191B20",
                borderRadius: "16px",
                padding: "8px 6px",
                boxSizing: 'border-box' // Убедитесь, что padding и border учитываются в ширине
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: '8px'
                }}
            >
             <span
                 style={{
                     color: "#B5B7B9",
                     fontSize: "14px",
                     fontFamily: "UbuntuRegular",
                 }}
             >
                {txTitle}
                     </span>

                {dopBtnVisible && (
                    <div style={{
                        width: '16px', height: '16px',
                        borderRadius: '999px',
                        background: '#252830',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <img src={IcArrowRight} style={{width: '12px', height: '12px'}}/>
                    </div>
                )}

            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "8px",
                }}
            >
                <img
                    src={ic}
                    style={{
                        width: "24px",
                        height: "24px",
                    }}
                />

                <span
                    style={{
                        color: "#F0EFFB",
                        fontSize: "16px",
                        fontFamily: "UbuntuMedium",
                    }}
                >
          {txItem}
        </span>
            </div>
        </div>
    );
};
