import axios, {} from 'axios';
import {BASE_URL, initDataRaw} from "./RemoteConstant.ts";
import {Rewards, UserCustom} from "./ImproveRemote.tsx";
import {TaskType} from "../../components/screen/quests/typeQuests.ts";
import { getUserStatisticsResponse } from './UserLigsremote.tsx';

export interface BoostItem {
    boostName: string,
    level: number,
    price: number
}

export interface UserTask {
    taskId: number;
    text: string;
    coins: number;
    checkIcon: string;
    taskType: TaskType;
    type: string;
    completed: boolean;
    lastCompletedDate?: string | null;
    actionBtnTx?: string | null;
    txDescription?: string | null;
    etaps?: number | null;
    dataSendCheck?: string | null;
    rewards? : Rewards[] | null;
}


// interface listUserInvitedItem {
//     userId: string,
//     userName: string,
//     coinsReferral: number
// }


export interface UserBasic {
    userId: string,
    userName: string,
    coins: number,
    codeToInvite: string,
    address?: string,
    boosts: BoostItem[]
    completedTasks: number[] | null;
    tasks: UserTask[];
    imageAvatar?: string | null;
    currentEnergy: number,
    maxEnergy: number,
    perTap: number;
    selectedModel?: UserCustom | null;
    ligsUser?: getUserStatisticsResponse | null
}

export const addCoinsToClickData = async (coins: number): Promise<UserBasic> => {
    try {
        const response = await axios.post<UserBasic>(`${BASE_URL}users/addCoins`,
            {coins}, {headers: {Authorization: `tma ${initDataRaw}`}}
        );
        console.log("addCoinsToClickData response - ",addCoinsToClickData)
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};


export const createUser = async (coins: number): Promise<UserBasic> => {
    try {
        const response = await axios.post<UserBasic>(
            `${BASE_URL}users/createNewUsers`,
            {coins}, {headers: {Authorization: `tma ${initDataRaw}`}}
        );

        console.log("response create - ", response.data)
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        if (axios.isAxiosError(error) && error.response) {
            console.log('Axios error response data:', error.response.data);
        }
        throw error;
    }
};


export const getUserById = async (): Promise<UserBasic | string> => {

    try {
        const response = await axios.get<UserBasic>(
            `${BASE_URL}users/getUser`, {headers: {Authorization: `tma ${initDataRaw}`}}
        );

        console.log('Response data:', typeof response.data);
        // if ('message' in response.data) {
        //     return `${response.data.message}`; // Возвращаем сообщение об ошибке
        // }
        return response.data; // Вернем результат из объекта response.data
    } catch (error) {
        console.error('Error getting user:', error);
        if (axios.isAxiosError(error) && error.response) {
            console.log('Axios error response data:', error.response.data);
            return "User not found"
        }
        throw error;
    }
};

export const checkSuccessTask = async (taskId: number): Promise<UserBasic | string> => {
    try {
        const response = await axios.post<UserBasic>(`${BASE_URL}task/checkSuccessTask`, {
            taskId
        }, {headers: {Authorization: `tma ${initDataRaw}`}});
        console.log("response.data checkSuccessTask - ", response.data);
        if ('message' in response.data) {
            return `${response.data.message}`; // Возвращаем сообщение об ошибке
        }
        return response.data;
    } catch (e) {
        return `error ${e}`
    }
}