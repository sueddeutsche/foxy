import Handler, { Request } from "./Handler";
import utils from "../utils";


export default {
    use: (request: Request) => /^https?:\/\//.test(request.url),
    getVideoURL: (request: Request) => Promise.resolve(request.url),
    getVideoInfo: (request: Request) => utils.loadVideoInfo(request.url)

} as Handler;
