import React, { useEffect, useState } from "react";

// interface VerticalSelectorProps {
//     tabs: string[];
//     onTabSelect: (selectedTab: string) => void;
//     firstSelectTab?: string;
// }

interface Price {
    name: string;
    price: number;
}

interface PriceSelectorProps {
    tabs: Price[];
    onTabSelect: (selectedTab: Price) => void;
    icoCoin?: string | null
}

export const VerticalSelectorPrice: React.FC<PriceSelectorProps> = ({
                                                                      tabs,
                                                                      onTabSelect,
                                                                  }) => {
    const [selectedTab, setSelectedTab] = useState<Price>(  tabs[0]
    );
    // const [isFirstSelectTabSet, setIsFirstSelectTabSet] = useState<boolean>(
    //
    // );
    const [isPressed, setIsPressed] = useState<Price | null>(null);

    useEffect(() => {
        onTabSelect(selectedTab);
    }, [selectedTab, onTabSelect]);



    const handleTabClick = (tab: Price) => {
        setSelectedTab(tab);
        onTabSelect(tab);
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column", // Changed to column for vertical layout
                marginBottom: "16px",
                background: "#191B20",
                borderRadius: "16px",
                padding: "8px",
                justifyContent: 'flex-start', // Align to the top
            }}
        >
            {tabs.map((tab) => (
                <button
                    key={tab.name}
                    style={{
                        padding: "12px 24px",
                        margin: "4px 0", // Adjusted margin for vertical space
                        borderRadius: "14px",
                        border: "2px solid transparent",
                        cursor: "pointer",
                        backgroundColor: tab === selectedTab ? "#F0EFFB" : "transparent",
                        color: tab === selectedTab ? "#000" : "#FFF",
                        fontFamily: "MyCustomFont, sans-serif",
                        fontSize: "14px",
                        fontWeight: tab === selectedTab ? "bold" : "normal",
                        transition: "background-color 0.3s, border-color 0.3s",
                        boxShadow: tab === selectedTab ? "0px 4px 8px rgba(0, 0, 0, 0.2)" : "none",
                        transform: isPressed === tab ? "scale(0.95)" : "scale(1)",
                        outline: "none",
                        userSelect: "none",
                        WebkitTapHighlightColor: "transparent",
                    }}
                    onClick={() => handleTabClick(tab)}
                    onMouseDown={() => setIsPressed(tab)}
                    onMouseUp={() => setIsPressed(null)}
                    onMouseLeave={() => setIsPressed(null)}
                    onTouchStart={() => setIsPressed(tab)}
                    onTouchEnd={() => setIsPressed(null)}
                >
                    {tab.name}
                </button>
            ))}
        </div>
    );
};
