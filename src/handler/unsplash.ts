import Handler from "./Handler";
import utils from "../utils";

// https://images.unsplash.com/photo-1583248369069-9d91f1640fe6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60
const isUnsplashImage = /^https:\/\/images\.unsplash\.com\/photo-\d{13}-[0-9a-f]{12}/;


export interface Parameters {
    width?: number;
    height?: number;
    fit?: string;
    quality?: number;
    auto?: string;
}

function parseURL(url: string): Parameters {
    const result = {} as Parameters;
    const params = new URLSearchParams(url);
    if (params.has("w")) result.width = parseInt(params.get("w"));
    if (params.has("h")) result.height = parseInt(params.get("h"));
    if (params.has("fit")) result.fit = params.get("fit");
    if (params.has("q")) result.quality = parseInt(params.get("q"));
    if (params.has("auto")) result.auto = params.get("auto");
    return result;
}


export default {
    use: request => isUnsplashImage.test(request.url),
    parseURL,
    getImageURL(request) {
        return Promise.resolve(request.url);
    },
    getImageInfo(request) {
        return utils.loadImageInfo(request.url);
    }
} as Handler;
