import axios from "axios";
import {BASE_URL, initDataRaw} from "./RemoteConstant.ts";

export const getSendedTone = async () => {
    try {
        const response = await axios.get<number>(`${BASE_URL}pools/getPoolsUsers`,
            {headers: {Authorization: `tma ${initDataRaw}`}})
        console.log("getListSubscriptionOptionsResponse - ", response.data)
        if (typeof response.data == "number") {
            return response.data
        } else {
            return "Error request"
        }
    } catch (e) {
        console.log("getListSubscriptionOptionsResponseError - ", e)
        return `error ${e}`
    }
}


export const increaseSendedTone = async (sendedTone: number, sendedresult: string) => {
    try {
        const response = await axios.post(`${BASE_URL}pools/increaseSendedTone`, {
                amount: sendedTone,
                boc: sendedresult
            },
            {headers: {Authorization: `tma ${initDataRaw}`}})
        console.log("increaseSendedTone - ", response.data)
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