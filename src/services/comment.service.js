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

const CommentService = {
    getCommentByCommentId,
    getCommentsByPostId
};

export default CommentService;