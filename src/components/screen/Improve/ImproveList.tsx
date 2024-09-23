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
                width: "100%",
                height: "100%",
                position: "relative",
                background: "#131418",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >

            {/* Отображение категорий и элементов */}
            {Object.entries(categories).map(([category, items]) => (
                <div
                    key={category}
                    style={{
                        width: "100%",
                        padding: "16px"
                    }}
                >
                    <BeginningCategory tx={category} />
                    {items.map((item) => (
                        <ItemElementsImprove
                            key={item.improveId}
                            title={item.name}
                            price={item.price * item.level}
                            handleClick={() => {onItemClick(item)}}
                            itemUpgrate={item.rewards}
                         img={""}/>
                    ))}
                </div>
            ))}
        </div>
    );
};
