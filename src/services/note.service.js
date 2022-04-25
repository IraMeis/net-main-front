import axios from "axios";
import getControllerPath from "../util/GetControllerPath.js";
import authHeader from "./auth-header";

const API_URL = getControllerPath("post");

const getListBasedOnCurrentScope = () => {
    return axios.get(API_URL + "/getContent", { headers: authHeader() });
};

const getPostById = (id) => {
    return axios.get(API_URL + `/getPost/${id}`, { headers: authHeader() });
};

const NoteService = {
    getListBasedOnCurrentScope,
    getPostById
};

export default NoteService;