import axios from "axios";
import getControllerPath from "../util/GetControllerPath.js";
import authHeader from "./auth-header";

const API_URL = getControllerPath("test");

const getPublicContent = () => {
  return axios.get(API_URL + "/all");
};

const getListBasedOnCurrentScope = () => {
  return axios.get(API_URL + "/user", { headers: authHeader() });
};

// const getModeratorBoard = () => {
//   return axios.get(API_URL + "/mod", { headers: authHeader() });
// };
//
// const getAdminBoard = () => {
//   return axios.get(API_URL + "/admin", { headers: authHeader() });
// };

const UserService = {
  getPublicContent,
  // getUserBoard,
  // getModeratorBoard,
  // getAdminBoard,
};

export default UserService;
