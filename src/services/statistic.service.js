import axios from "axios";
import getControllerPath from "../util/GetControllerPath.js";
import authHeader from "./auth-header";

const API_URL_USER = getControllerPath("user");
const API_URL_POST = getControllerPath("post");
const API_URL_STATISTIC= getControllerPath("statistic");

const getFilterPost = (search) => {
    return axios.get(API_URL_POST + "/getFilteredPosts" + search, { headers: authHeader() });
};

const getFilterUser = (search) => {
    return axios.get(API_URL_USER + "/getFilteredUsers" + search, { headers: authHeader() });
};

const getUserStatistic = (id) => {
    return axios.get(API_URL_STATISTIC + `/getUserStatistic/${id}`, { headers: authHeader() });
};

const StatisticService = {
    getFilterPost,
    getFilterUser,
    getUserStatistic
}

export default StatisticService;