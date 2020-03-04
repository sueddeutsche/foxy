import Handler, { Request } from "./Handler";
import utils from "../utils";


export default {
    use: (request: Request) => /^https?:\/\//.test(request.url),
    getImageURL: (request: Request) => Promise.resolve(request.url),
    getImageInfo: (request: Request) => utils.loadImageInfo(request.url)

} as Handler;
