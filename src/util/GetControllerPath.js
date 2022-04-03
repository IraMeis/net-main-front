import server from "./back.json"
import urls from "./apiList.json"

const get = (obj, str) => typeof obj[str] === "undefined" ? "" : obj[str]

const getPath = string => get(urls, string)

const getServer = string => get(server, string)


export default function getControllerPath(request){
    return getServer("server") + getPath(request)
}