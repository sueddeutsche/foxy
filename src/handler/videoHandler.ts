import Handler, { Request } from "./Handler";
import utils from "../utils";


export default {
    use: (request: Request) => /^https?:\/\//.test(request.source),
    getVideoURL: (request: Request) => Promise.resolve(request.source),
    getVideoInfo: (request: Request) => utils.loadVideoInfo(request.source)

} as Handler;
