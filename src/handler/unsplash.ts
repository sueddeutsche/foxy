import Handler from "./Handler";
import utils from "../utils";

// https://images.unsplash.com/photo-1583248369069-9d91f1640fe6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60
const isUnsplashImage = /^https:\/\/images\.unsplash\.com\/photo-\d{13}-[0-9a-f]{12}/;


export default {
    use: request => isUnsplashImage.test(request.url),
    getImageUrl(request) {
        return Promise.resolve(request.url);
    },
    getImageInfo(request) {
        return utils.loadImage(request.url);
    }
} as Handler;
