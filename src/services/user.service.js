import axios from "axios";
import getControllerPath from "../util/GetControllerPath.js";
import authHeader from "./auth-header";

const API_URL = getControllerPath("user");

const undeleteUser = (id) => {
  return axios.delete(API_URL + `/undeleteUser/${id}`,{ headers: authHeader() });
};

const deleteUser = (id) => {
  return axios.delete(API_URL + `/deleteUser/${id}`, { headers: authHeader() });
};

const unbanUser = (id) => {
  return axios.put(API_URL + `/unbanUser/${id}`,{},{ headers: authHeader() });
};

const banUser = (id) => {
  return axios.put(API_URL + `/banUser/${id}`, {},{ headers: authHeader() });
};

const UserService = {
  deleteUser,
  undeleteUser,
  banUser,
  unbanUser
};

export default UserService;
