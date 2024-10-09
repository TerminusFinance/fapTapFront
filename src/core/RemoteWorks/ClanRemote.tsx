import axios from "axios";
import {BASE_URL, initDataRaw} from "./RemoteConstant.ts";

interface ResultionClanCreate {
    message: string;
}

export const createClan = async (clanName: string, descriptions: string, urlChannel: string | null): Promise<string> => {
    try {
        const response = await axios.post<ResultionClanCreate>(`${BASE_URL}clan/createClan`,
            {clanName, descriptions, urlChannel},
            {headers: {Authorization: `tma ${initDataRaw}`}})
        console.log("createClan - ", response)
        if (typeof response.data == "object") {
            return response.data.message
        } else {
            return "Error request"
        }
    } catch (e) {
        console.log("createClan - ", e)
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

export interface SubscriptionOptionsClan {
    name: string;
    price: number;
}

export const getListSubscriptionOptionsClanUpgrateRunks = async (): Promise<SubscriptionOptionsClan[] | string> => {
    try {
        const response = await axios.get<SubscriptionOptionsClan[]>(`${BASE_URL}clan/getListSubscriptionOptions`,
            {headers: {Authorization: `tma ${initDataRaw}`}})
        console.log("getListSubscriptionOptionsResponse - ", response)
        if (typeof response.data == "object") {
            return response.data
        } else {
            return "Error request"
        }
    } catch (e) {
        console.log("getListSubscriptionOptionsResponseError - ", e)
        return `error ${e}`
    }
}

interface SubscribeResult {
    ok: boolean;
    result: string
}


export const boosClanLevels = async (subscriptionOptions: SubscriptionOptionsClan): Promise<SubscribeResult | string> => {
    try {
        const response = await axios.post<SubscribeResult>(`${BASE_URL}clan/boostRang`, {
                selectedSubscriptionOptions: subscriptionOptions
            },
            {headers: {Authorization: `tma ${initDataRaw}`}})
        console.log("getListSubscriptionOptionsResponse - ", response.data)
        if (typeof response.data == "object") {
            return response.data
        } else {
            return "Error request"
        }
    } catch (e) {
        console.log("getListSubscriptionOptionsResponseError - ", e)
        return `error ${e}`
    }
}
