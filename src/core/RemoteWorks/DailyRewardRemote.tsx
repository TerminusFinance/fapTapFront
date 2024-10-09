import axios from "axios";
import {BASE_URL, initDataRaw} from "./RemoteConstant.ts";
import {Rewards} from "./ImproveRemote.tsx";


export interface Reward {
    id: number;
    day_number: number;
    name: string;
    description: string;
    image_url: string;
    is_claimed: boolean;
    claimed_at: Date | null;
    is_available: boolean;
    rewards: Rewards[];
}

export const getUserRewards = async (): Promise<{ rewards: Reward[], timeUntilNextReward: string | null }> => {
    try {
        const response = await axios.post<{ rewards: Reward[], timeUntilNextReward: string | null }>(
            `${BASE_URL}daysRewards/getUserRewards`,
            {},
            { headers: { Authorization: `tma ${initDataRaw}` } }
        );
        // Возвращаем данные, если запрос успешен
        return response.data;
    } catch (error) {
        console.error('Error fetching user rewards:', error);

        // Возвращаем дефолтные значения при ошибке
        return {
            rewards: [],
            timeUntilNextReward: null
        };
    }
};


export interface ClaimRewardResponse {
    success: boolean;
    message: string;
}

export const claimReward =async () => {
    try {
        const response = await axios.post<ClaimRewardResponse>(`${BASE_URL}daysRewards/claimReward`,
            {}, {headers: {Authorization: `tma ${initDataRaw}`}}
        );
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        return `Erorr is ${error}`
        throw error;
    }
}