import Handler, { Request } from "./Handler";
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

export function parseURL(url: string): Parameters {
    const result = {} as Parameters;
    const params = new URLSearchParams(url.replace(/^.*\?/, ""));
    if (params.has("w")) result.width = parseInt(params.get("w"));
    if (params.has("h")) result.height = parseInt(params.get("h"));
    if (params.has("fit")) result.fit = params.get("fit");
    if (params.has("q")) result.quality = parseInt(params.get("q"));
    if (params.has("auto")) result.auto = params.get("auto");
    return result;
}

export function getURL(request: Request): string {
    const baseURL = request.source.replace(/\?.*$/, "");
    const params = new URLSearchParams(request.source.replace(/^.*\?/, ""));
    if (request.width) params.set("w", request.width);
    if (request.height) params.set("h", request.height);
    if (request.quality) params.set("q", request.quality);
    if (request.fit) params.set("fit", request.fit);
    if (request.auto) params.set("auto", request.auto);
    return `${baseURL}?${params.toString()}`;
}

export default {
    use: request => isUnsplashImage.test(request.source),
    getImageURL(request) {
        return Promise.resolve(getURL(request));
    },
    getImageInfo(request) {
        return utils.loadImageInfo(getURL(request));
    }

} as Handler;
