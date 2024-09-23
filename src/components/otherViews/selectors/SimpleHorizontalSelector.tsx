import React, { useEffect, useState } from 'react';

interface SelectorProps {
  options: string[]; // Массив опций (например, ['Model', 'Appartment'])
  selectedOption: string;
  onSelect: (option: string) => void;
}

const SimpleHorizontalSelector: React.FC<SelectorProps> = ({ options, selectedOption, onSelect }) => {
  const [indicatorStyle, setIndicatorStyle] = useState<{ width: string; left: string }>({
    width: '0px',
    left: '0px',
  });
  const [isPressed, setIsPressed] = useState<string | null>(null);
  useEffect(() => {
    const selectedElement = document.getElementById(selectedOption);
    if (selectedElement) {
      const { offsetWidth, offsetLeft } = selectedElement;
      setIndicatorStyle({
        width: `${offsetWidth}px`,
        left: `${offsetLeft}px`,
      });
    }
  }, [selectedOption]); // Обновляем при изменении выбранного элемента

  return (
    <div
      style={{
        position: 'relative',
        padding: '10px 0',
        backgroundColor: 'transparent', // Прозрачный фон
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center', // Центрируем элементы
          gap: '40px', // Расстояние между элементами
        }}
      >
        {options.map((option) => (
          <div
            key={option}
            id={option} // Для позиционирования анимации
//            onClick={() => handleTabClick(tab)}
            onMouseDown={() => setIsPressed(selectedOption)}
            onMouseUp={() => setIsPressed(null)}
            onMouseLeave={() => setIsPressed(null)}
            onTouchStart={() => setIsPressed(selectedOption)}
            onTouchEnd={() => setIsPressed(null)}
            onClick={() => onSelect(option)}
            style={{
              cursor: 'pointer',
              color: selectedOption === option ? '#fff' : '#777', // Цвет выделенного текста
              fontWeight: selectedOption === option ? 'bold' : 'normal',
              padding: '5px 0',
              transform: isPressed === selectedOption ? "scale(0.95)" : "scale(1)",
              outline: "none",
              userSelect: "none",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <span style={{ whiteSpace: 'nowrap' }}>{option}</span>
          </div>
        ))}
      </div>

      {/* Подчеркивающая полоска с анимацией */}
      <div
        style={{
          position: 'absolute',
          bottom: '0', // Полоска находится снизу
          height: '3px',
          backgroundColor: '#fff',
          borderRadius: '2px',
          transition: 'width 0.4s ease, left 0.4s ease', // Анимация плавного перехода
          width: indicatorStyle.width, // Ширина полоски
          left: indicatorStyle.left, // Позиция полоски
        }}
      />
    </div>
  );
};

export default SimpleHorizontalSelector;
