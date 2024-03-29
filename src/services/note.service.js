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

const update = (obj) => {
    return axios.put(API_URL + `/updatePost`, obj,{ headers: authHeader() });
};

const deletePost = (id) => {
    return axios.delete(API_URL + `/deletePost/${id}`,{ headers: authHeader() });
};

const undeletePost = (id) => {
    return axios.delete(API_URL + `/undeletePost/${id}`,{ headers: authHeader() });
};

const create = (obj) => {
    return axios.post(API_URL + `/createPost`, obj,{ headers: authHeader() });
}

const NoteService = {
    getListBasedOnCurrentScope,
    getPostById,
    update,
    deletePost,
    undeletePost,
    create
};

export default NoteService;