import { BASE_URL, initDataRaw } from "./RemoteConstant";
import axios from "axios";

interface LevelInfo {
    name: string;
    level: number;
    minCoins: number;
    avatar: string;
}

interface User {
    userId: number;
    userName: string;
    points: number;
}

export interface ResponseGetTopUsersByLevel {
    levelInfo: LevelInfo;
    users: User[];
}

export const getTopUsersByLevel = async (): Promise<ResponseGetTopUsersByLevel[] | string> => {
    try {
        const response = await axios.get<ResponseGetTopUsersByLevel[]>(
            `${BASE_URL}userLigs/getTopUsersByLevel`,
            {headers: {Authorization: `tma ${initDataRaw}`}}
        );


        console.log("getTopUsersByLevel response - ", response.data);

        return response.data;
    } catch (e) {
        console.error('Error updating user:', e);
        return `${e}`;
    }
};

export interface getUserStatisticsResponse {
    userId: string;
    userName: string;
    points: number;
    level: number;
    levelName: string;
    position: number;
    avatar: string;
    maxPoints: number;
}

export const getUserStatistics = async (): Promise<getUserStatisticsResponse | string> => {
    try {
        const response = await axios.get<getUserStatisticsResponse>(
            `${BASE_URL}userLigs/getUserInfo`,
            {headers: {Authorization: `tma ${initDataRaw}`}}
        );


        console.log("getTopUsersByLevel response - ", response.data);

        return response.data;
    } catch (e) {
        console.error('Error updating user:', e);
        return `${e}`;
    }
}