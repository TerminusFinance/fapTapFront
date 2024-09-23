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