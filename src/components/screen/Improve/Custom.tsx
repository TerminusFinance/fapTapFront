import React, { useState, useEffect } from 'react';
import { UserCustom } from '../../../core/RemoteWorks/ImproveRemote';
import SimpleHorizontalSelector from "../../otherViews/selectors/SimpleHorizontalSelector.tsx";
import IcStars from "../../../assets/icon/ic_premium_star_simpl.svg"

interface PropsCustom {
    item: UserCustom[];
    sendToSelected: (id: number) => void;
    openModalCustomItem: (item: UserCustom) => void
}

const CustomItem: React.FC<PropsCustom> = ({ item, openModalCustomItem }) => {
    const [selectedCard, setSelectedCard] = useState<number | null>(null);
    const [selectedType, setSelectedType] = useState<string>('model');

    useEffect(() => {
        const selectedItem = item.find(
            (user) => user.isSelected === 1 && user.type === selectedType
        );

        if (selectedItem) {
            setSelectedCard(selectedItem.customId);
        } else if (item.length > 0) {
            const firstItem = item.find(user => user.type === selectedType);
            if (firstItem) {
                setSelectedCard(firstItem.customId);
            }
        }
    }, [item, selectedType]);

    const filteredItems = item.filter((items) => items.type === selectedType);

    const handleCardClick = (customId: UserCustom) => {
        openModalCustomItem(customId);
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%', // Full height of parent component
            padding: '10px',
        }}>
            {/* Selector remains fixed at the top */}
            <SimpleHorizontalSelector
                options={['model', 'appartment']}
                selectedOption={selectedType}
                onSelect={setSelectedType}
            />

            {/* Scrollable container for card items */}
            <div
                style={{
                    flexGrow: 1, // Use available space
                    overflowY: 'auto', // Enable scrolling only when needed
                    marginTop: '10px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                    paddingBottom: '10px', // Extra bottom padding for smoother scroll
                }}
            >
                {filteredItems.map((items) => (
                    <div
                        key={items.customId}
                        onClick={() => handleCardClick(items)}
                        style={{
                            width: 'calc(33.333% - 10px)', // Fixed width for each card to ensure 3 per row
                            boxSizing: 'border-box',
                            height: '150px', // Fixed height for each card
                            border: items.customId === selectedCard ? '3px solid #fff' : '2px solid gray',
                            borderRadius: '16px',
                            padding: '8px',
                            textAlign: 'center',
                            color: '#fff',
                            marginBottom: '10px', // Vertical spacing between cards
                        }}
                    >
                        <img
                            src={items.imagePrew}
                            alt={items.name}
                            style={{
                                width: '100%',
                                height: '75px', // Fixed image height
                                borderRadius: '10px',
                                objectFit: 'cover',
                            }}
                        />
                        <h3
                            style={{
                                margin: '4px 0',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {items.name}
                        </h3>
                        <div style={{
                            background: '#252830',
                            borderRadius: '999px',
                            padding: '2px 10px',
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'row',
                            alignContent: 'center',
                            justifyContent:'center'
                        }}>
                            {items.price.type === 'stars' && (
                                <img src={IcStars} style={{
                                    width: '12px',
                                    height: '12px',
                                    marginRight: '4px'
                                }}/>
                            )}
                            <p style={{ color: '#ffffff' }}>
                                {items.price.type === 'free' ? 'free' : items.price.price}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomItem;
