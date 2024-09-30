import axios from "axios";
import {BASE_URL, initDataRaw} from "./RemoteConstant.ts";

export interface ImproveResultUserItem {
    tag: string;
    name: string;
    description: string;
    possibleRewards: Rewards[];
    image: string;
    improvementId: number,
    price: number;
}

export interface Rewards {
    name: string;
    img: string;
}



export interface UsersImproveItem {
    improveId: number;
    name: string;
    category: string;
    price: number;
    image: string;
    imagePrew: string;
    rewards: Rewards[];
    level: number;
}


export const getImproveResultUserItem = async (userCustomId: number): Promise<UsersImproveItem[] | string> => {2
    try {
    console.log("userCustomId - ", userCustomId)
        const response = await axios.post<UsersImproveItem[]>(
            `${BASE_URL}improve/getUserImproves`, {userCustomId: userCustomId},
            {headers: {Authorization: `tma ${initDataRaw}`}}
        );

        // Проверяем, если в ответе есть поле "message"

        console.log("getImproveResultUserItem response - ", response.data);
//        if ('message' in response.data) {
//            return response.data.message;
//        }
        return response.data;
    } catch (e) {
        console.error('Error updating user:', e);
        return `${e}`;
    }
};


interface ResponseUpLevelToItem {
    itemResults: UsersImproveItem[],
    coins: number;
}

export const upLevelToItem = async (userCustomId: number, improveId: number) => {
    try {
        const response = await axios.post<ResponseUpLevelToItem>(
            `${BASE_URL}improve/upUserImproveLevel`,
            {userCustomId: userCustomId, improveId: improveId},
            {headers: {Authorization: `tma ${initDataRaw}`}}
        );
        console.log('upLevelToItem is -', response.data)
        return response.data;
    } catch (e) {
        if (axios.isAxiosError(e)) {
            if (e.response) {
                // Сервер ответил с кодом статуса, который выходит за пределы 2xx
                return `Error: ${e.response.data.message || e.response.statusText}`;
            } else if (e.request) {
                // Запрос был сделан, но ответа не было получено
                return "Error: No response received from server";
            } else {
                // Произошла ошибка при настройке запроса
                return `Error: ${e.message}`;
            }
        } else {
            // Что-то еще произошло
            return `Error: ${e}`;
        }
        return `${e}`;
    }
}


export interface UserCustom {
    customId: number;
    name: string;
    description: string;
    price: PriceCustom;
    image: string;
    imagePrew: string;
    isPurchased: number;
    isSelected: number;
    type: string
}

export interface PriceCustom {
    type: string;
    price?: number | null;
}


export interface getSelectedModelsForUser {
    model: UserCustom,
    appartment: UserCustom,
}

export const getUserCustom = async (): Promise<UserCustom[] | string> => {
    try {
        const response = await axios.get<UserCustom[]>(
            `${BASE_URL}custom/getCustomForUser`,

            {headers: {Authorization: `tma ${initDataRaw}`}}
        );


        console.log("getUserCustom response - ", response.data);
//        if ('message' in response.data) {
//            return response.data.message;
//        }
        return response.data;
    } catch (e) {
        console.error('Error updating user:', e);
        return `${e}`;
    }
}


interface ResponseWithMessage {
    message: string;
}

//interface ResponseWithItemResults {
//    itemResults: UserCustom[];
//}

type Response = ResponseWithMessage | UserCustom[];

export const setToSelected = async (customId: number) => {
    try {
        const response = await axios.post<Response>(
            `${BASE_URL}custom/setToSelected`,
            {customId: customId},
            {headers: {Authorization: `tma ${initDataRaw}`}});
        console.log("getUserCustom response - ", response.data);

        return response.data;

    } catch (e) {
        if (axios.isAxiosError(e)) {
            if (e.response) {
                // Сервер ответил с кодом статуса, который выходит за пределы 2xx
                return `Error: ${e.response.data.message || e.response.statusText}`;
            } else if (e.request) {
                // Запрос был сделан, но ответа не было получено
                return "Error: No response received from server";
            } else {
                // Произошла ошибка при настройке запроса
                return `Error: ${e.message}`;
            }
        } else {
            // Что-то еще произошло
            return `Error: ${e}`;
        }
        return `${e}`;
    }
}


export interface SubscriptionOptions {
    name: string;
    description: string;
    price: number;
    image: string
}

export const getPremiumItem = async () => {
    try {
        const response = await axios.get<SubscriptionOptions[]>(`${BASE_URL}prem/getListSubscriptionOptions`,
            {headers: {Authorization: `tma ${initDataRaw}`}}
        );

        console.log("getPremiumItem - ", response);

        if (typeof response.data == "object") {
            return response.data
        } else {
            return "Error: Unexpected response format";
        }
    } catch (e) {
        console.log("getPremiumItem - ", e);

        if (axios.isAxiosError(e)) {
            if (e.response) {
                // Сервер ответил с кодом статуса, который выходит за пределы 2xx
                return `Error: ${e.response.data.message || e.response.statusText}`;
            } else if (e.request) {
                // Запрос был сделан, но ответа не было получено
                return "Error: No response received from server";
            } else {
                // Произошла ошибка при настройке запроса
                return `Error: ${e.message}`;
            }
        } else {
            // Что-то еще произошло
            return `Error: ${e}`;
        }
    }
}



