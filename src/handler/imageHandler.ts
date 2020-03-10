import Handler, { Request } from "./Handler";
import utils from "../utils";


export default {
    use: (request: Request) => /^https?:\/\//.test(request.source),
    getImageURL: (request: Request) => Promise.resolve(request.source),
    getImageInfo: (request: Request) => utils.loadImageInfo(request.source)

} as Handler;
