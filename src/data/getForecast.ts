import { ForeCast, List } from "@/model/forecast";
import axios, { AxiosError } from "axios";

export const getForeCast = async (zipCode: number): Promise<ForeCast> => {
    if (typeof zipCode !== 'number') {
        throw new Error('Invalid zipcode');
    }
    try {
        const { data } = await axios.get<ForeCast>(`https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_ID}&units=metric`);
        if (data.cod === "200") {
            return data;
        } else {
            throw new Error(data.message);
        }
    } catch (err) {
        if (err instanceof AxiosError) {
            throw new Error(err.response?.data?.message);
        }
        throw new Error("Some error occured");
    }
}