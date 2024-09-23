import axios from "axios";
import {BASE_URL, initDataRaw} from "./RemoteConstant.ts";


export interface UserLeague {
    leagueId: number;
    userId: string;
    userName: string;
    imageAvatar: string;
    score: number;
    buyscore: number;
    freescore: number;
    reward: number;
}

export const getAllUsersLeague = async (): Promise<UserLeague[] | string> => {
    try {
        const response = await axios.get<UserLeague[]>(`${BASE_URL}userTop/getAllUsers`,
            { headers: { Authorization: `tma ${initDataRaw}` } }
        );

        console.log("getClanWitchClanId - ", response);

        if (typeof response.data == "object" ) {
            return response.data
        } else {
            return "Error: Unexpected response format";
        }
    } catch (e) {
        console.log("getClanWitchClanId - ", e);

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
export interface UserLeagueResponse {
    userLeague: UserLeague;
    rank: number;
}
export const getUsersLeague = async (): Promise<UserLeagueResponse | string> => {
    try {
        const response = await axios.get<UserLeagueResponse>(`${BASE_URL}userTop/getUserLeagueById`,
            { headers: { Authorization: `tma ${initDataRaw}` } }
        );

        console.log("getClanWitchClanId - ", response);

        if (typeof response.data == "object" ) {
            return response.data
        } else {
            return "Error: Unexpected response format";
        }
    } catch (e) {
        console.log("getClanWitchClanId - ", e);

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


export interface Clan {
    clanId: string;
    clanName: string;
    description: string;
    rating: number;
    // createAt: string;
}

export interface ResultionGetClanById {
    clan: Clan;
    role: string;
    contributedRating: number;
}

export const getClanByUserId = async () => {
    try {
        const response = await axios.get<ResultionGetClanById>(`${BASE_URL}clan/getUserClan`,
            {headers: {Authorization: `tma ${initDataRaw}`}})
        console.log("getListSubscriptionOptionsResponse - ", response.data)
        if (typeof response.data == "object") {
            if(typeof response.data.clan != "object") {
                return "Error request"
            }
            return response.data
        } else {
            return "Error request"
        }
    } catch (e) {
        console.log("getRatingUsersByLvl - ", e)
        return `error ${e}`
    }
}

export interface responseAllLegueTop {
    allUserLeagues: UserLeague[],
    topUsersLastMonth: UserLeague[],
    topUsersLastWeek: UserLeague[]
}


export const getLeagueAndTopUsersData = async () : Promise<responseAllLegueTop | string> => {
    try {
        const response = await axios.get<responseAllLegueTop>(`${BASE_URL}userTop/getLeagueAndTopUsersData`,
            { headers: { Authorization: `tma ${initDataRaw}` } }
        );

        console.log("getLeagueAndTopUsersData - ", response);

        if (typeof response.data == "object" ) {
            return response.data
        } else {
            return "Error: Unexpected response format";
        }
    } catch (e) {
        console.log("getLeagueAndTopUsersData - ", e);

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


export interface responseAllCalns {
    allUserLeagues: Clan[],
    topUsersLastMonth: Clan[],
    topUsersLastWeek: Clan[]
}

export const getAllClansType = async (): Promise<responseAllCalns | string> => {
    try {
        const response = await axios.get<responseAllCalns>(`${BASE_URL}clan/getLeagueAndTopUsersData`,
            { headers: { Authorization: `tma ${initDataRaw}` } }
        );

        console.log("getLeagueAndTopUsersData - ", response);

        if (typeof response.data == "object" ) {
            return response.data
        } else {
            return "Error: Unexpected response format";
        }
    } catch (e) {
        console.log("getLeagueAndTopUsersData - ", e);

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



