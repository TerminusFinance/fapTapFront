import {SubscriptionOptions} from "./ImproveRemote.tsx";
import axios from "axios";
import {BASE_URL, initDataRaw} from "./RemoteConstant.ts";
interface SubscribeResult {
    ok: boolean;
    result: string
}
export const subscribeToPremium = async (subscriptionOptions: SubscriptionOptions): Promise<SubscribeResult | string> => {
    try {
        const response = await axios.post<SubscribeResult>(`${BASE_URL}prem/buyPremium`, {
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

export const buyOneTimePremium = async (): Promise<SubscribeResult | string> => {
    try {
        const response = await axios.post<SubscribeResult>(`${BASE_URL}prem/buyOneTimePremium`, {

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


export const buyCustomItem = async(customId: number) => {
    try {
        const response = await axios.post<SubscribeResult>(
            `${BASE_URL}custom/buyCustom`,
            {customId: customId},
            {headers: {Authorization: `tma ${initDataRaw}`}});
        console.log("buyCustomItem response - ", response.data);

        if (typeof response.data == "object") {
            return response.data
        } else {
            return "Error request"
        }

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


export interface PremiumItem {
    amountSpent: number;
    endDateOfWork?: string | null;
}
export const getPremiumUsers = async (): Promise<PremiumItem | string> => {
    try {
        const response = await axios.get<PremiumItem>(`${BASE_URL}prem/getPremiumUsers`,
            {headers: {Authorization: `tma ${initDataRaw}`}})
        console.log("getPremiumUsers - ", response.data)
        if (typeof response.data == "object") {
            return response.data
        } else {
            return "Error request"
        }
    } catch (e) {
        console.log("getPremiumUsers - ", e)
        return `error ${e}`
    }
}