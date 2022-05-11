import axios from "axios";
import getControllerPath from "../util/GetControllerPath.js";
import authHeader from "./auth-header";

const API_URL = getControllerPath("comment");

const getCommentByCommentId = (id) => {
    return axios.get(API_URL + `/getComment/${id}`, { headers: authHeader() });
};

const getCommentsByPostId = (id) => {
    return axios.get(API_URL + `/getCommentsByPost/${id}`, { headers: authHeader() });
};

const update = (obj) => {
    return axios.put(API_URL + `/updateComment`, obj,{ headers: authHeader() });
};

const deleteComment = (id) => {
    return axios.delete(API_URL + `/deleteComment/${id}`,{ headers: authHeader() });
};

const CommentService = {
    getCommentByCommentId,
    getCommentsByPostId,
    update,
    deleteComment
};

export default CommentService;