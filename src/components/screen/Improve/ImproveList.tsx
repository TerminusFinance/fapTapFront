import React from "react";
import {UsersImproveItem} from "../../../core/RemoteWorks/ImproveRemote.tsx";
import { BeginningCategory } from "../../otherViews/BeginningCategory.tsx";
import {ItemElementsImprove} from "../../otherViews/itemElements/ItemElementsImprove.tsx";

interface ImproveListParam {
    improveResultUserItem: UsersImproveItem[];
    onItemClick: (item: UsersImproveItem) => void;
}

export const ImproveList: React.FC<ImproveListParam> = ({ improveResultUserItem, onItemClick }) => {
    // Группировка элементов по категориям
    let categories: Record<string, UsersImproveItem[]> = {};

    if (Array.isArray(improveResultUserItem)) {
        categories = improveResultUserItem.reduce((acc, item) => {
            // Получаем категорию элемента
            const category = item.category; // предполагаем, что у item есть поле category
            // Если категории еще нет в аккумуляторе, добавляем ее
            if (!acc[category]) {
                acc[category] = [];
            }
            // Добавляем элемент в соответствующую категорию
            acc[category].push(item);
            return acc;
        }, {} as Record<string, UsersImproveItem[]>);
    } else {
        console.error('improveResultUserItem is not an array:', improveResultUserItem);
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%', // Full height of parent component
                padding: '10px',
            }}
        >

            {/* Отображение категорий и элементов */}
            <div
                style={{
                    flexGrow: 1, // Use available space
                    overflowY: 'auto', // Enable scrolling only when needed
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                    paddingBottom: '10px', // Extra bottom padding for smoother scroll
                }}
            >
                {Object.entries(categories).map(([category, items]) => (
                    <div
                        key={category}
                        style={{
                            flexGrow: 1, // Use available space
                            width: "100%",
                            paddingTop: '8px',
                        }}
                    >
                        <BeginningCategory tx={category} />
                        {items.map((item) => (
                            <ItemElementsImprove
                                key={item.improveId}
                                title={item.name}
                                level={item.level}
                                price={item.price * item.level}
                                handleClick={() => {onItemClick(item)}}
                                itemUpgrate={item.rewards}
                                img={item.image}/>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
