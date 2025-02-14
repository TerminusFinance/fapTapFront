import React, {createContext, useContext, useState, ReactNode, useEffect, useRef} from 'react';
import {UserBasic} from "../../core/RemoteWorks/UsersRemote.tsx";

// Определение интерфейсов
interface DataContextType {
    dataApp: UserBasic;
    setDataApp: React.Dispatch<React.SetStateAction<UserBasic>>;
    energy: number;
    setEnergy: React.Dispatch<React.SetStateAction<number>>;
    turboBoost: string;
    setTurboBoost: React.Dispatch<React.SetStateAction<string>>;
}

// Создание контекста
const DataContext = createContext<DataContextType | undefined>(undefined);

// Создание провайдера
interface DataProviderProps {
    children: ReactNode;
}

const initialUserBasic: UserBasic = {
    userId: "",
    userName: "",
    coins: 0,
    codeToInvite: "",
    address: "",
    currentEnergy: 0,
    maxEnergy: 1000,
    boosts: [],
    completedTasks: [],
    perTap: 1,
    enabledAirDrop: 0,
    antiBotChecker: 0,
    oneTimePremium: 0,
};

const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
    const [dataApp, setDataApp] = useState<UserBasic>(() => {
        const storedData = localStorage.getItem('dataApp');
        return storedData ? JSON.parse(storedData) : initialUserBasic;
    });

    const [energy, setEnergy] = useState<number>(dataApp.currentEnergy ?? dataApp.maxEnergy);
    const [turboBoost, setTurboBoost] = useState<string>("");
    const lastEnergyChangeTime = useRef<number | null>(null);


    useEffect(() => {
        // Функция обновления энергии
        const updateEnergy = () => {
            setEnergy(prevEnergy => {
                if (prevEnergy < dataApp.maxEnergy) {
                    const timeElapsed = lastEnergyChangeTime.current ? Date.now() - lastEnergyChangeTime.current : 0;
                    const increments = Math.floor(timeElapsed / 1000);
                    if (increments > 0) {
                        const newEnergy = Math.min(prevEnergy + increments * 1, dataApp.maxEnergy);
                        lastEnergyChangeTime.current = Date.now();
                        return newEnergy;
                    }
                }
                return prevEnergy;
            });
        };

        // Интервал для постоянного обновления энергии
        const energyRegenInterval = setInterval(updateEnergy, 1000);

        return () => clearInterval(energyRegenInterval);
    }, [dataApp.maxEnergy,  turboBoost]);

    useEffect(() => {
        if (dataApp.currentEnergy !== undefined) {
            setEnergy(dataApp.currentEnergy);
        }
    }, [dataApp.currentEnergy]);

    useEffect(() => {
        localStorage.setItem('dataApp', JSON.stringify(dataApp));
    }, [dataApp]);

    useEffect(() => {
        lastEnergyChangeTime.current = Date.now();
    }, [energy]);

    return (
        <DataContext.Provider value={{ dataApp, setDataApp,energy, setEnergy, turboBoost, setTurboBoost }}>
            {children}
        </DataContext.Provider>
    );
};

// Кастомный хук для использования контекста
const useData = (): DataContextType => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};

export { DataProvider, useData };
