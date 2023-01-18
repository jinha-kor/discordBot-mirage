import axios from "axios";

const defaultUrl = `https://developer-lostark.game.onstove.com/armories/characters/`;
const LOST_TOKEN = process.env.LOST_TOKEN;
const axiosConfig = {
    headers: {
        Authorization: `${LOST_TOKEN}`,
        Accept: 'application/json'
    }
};

export const axiosGet = async (url, nick) => {
    const newUrl = defaultUrl + nick + url;
    return await axios.get(encodeURI(newUrl), axiosConfig)
        .then((response) => {
            const result = { status: '', data: '' }
            result.status = response.status;
            result.data = response.data;

            return result;
        })
        .catch((err) => {
            const result = { status: '', data: err.message };
            result.status = err.response.status;

            return result;
        });
};