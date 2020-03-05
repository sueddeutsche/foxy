import AnyObject from "./AnyObject";
import Handler from "./handler/Handler";


export function isHandler(handler): handler is Handler {
    return Object.prototype.toString.call(handler) === "[object Object]" && typeof handler.use === "function";
}


export interface ImageInfo {
    src: string;
    type: string;
    width: number;
    height: number;
    image: HTMLImageElement;
}

function loadImageInfo(url: string, fetchOptions: AnyObject = {}): Promise<ImageInfo> {
    const result = {
        src: url,
        image: new Image(),
        type: "",
        width: 0,
        height: 0
    } as ImageInfo;

    return fetch(url, fetchOptions)
        .then(response => response.blob())
        .then(imageBlob => {
            result.type = imageBlob.type.replace(/^[^/]+\//, "");
            return URL.createObjectURL(imageBlob);
        })
        .then(imageSrc => {
            return new Promise((resolve, reject) => {
                result.image.addEventListener("load", () => resolve());
                result.image.addEventListener("error", reject);
                result.image.src = imageSrc;
            })
        })
        .then(() => {
            result.width = result.image.naturalWidth;
            result.height = result.image.naturalHeight;
            return result;
        });
}

export interface VideoInfo {
    src: string;
    type?: string;
    width: number;
    height: number;
    video: HTMLVideoElement;
    duration: number;
    poster: string;
}


function loadVideoInfo(url: string, fetchOptions: AnyObject = {}): Promise<VideoInfo> {
    const result = {
        src: url,
        width: 0,
        height: 0,
        video: document.createElement("video"),
        duration: 0,
        poster: ""
    } as VideoInfo;

    return fetch(url, fetchOptions)
        .then(response => response.blob())
        .then(imageBlob => {
            result.type = imageBlob.type.replace(/^[^/]+\//, "");
            return URL.createObjectURL(imageBlob);
        })
        .then(imageSrc => {
            const onVideoLoaded: Promise<VideoInfo> = new Promise((resolve, reject) => {
                result.video.addEventListener("error", reject);
                result.video.addEventListener("loadedmetadata", () => {
                    const { video } = result;
                    result.width = video.videoWidth;
                    result.height = video.videoHeight;
                    result.duration = video.duration;
                    result.poster = video.poster;
                    resolve(result);
                });

                const source = document.createElement("source");
                source.setAttribute("src", imageSrc);
                result.video.appendChild(source)
            });
            return onVideoLoaded;
        });
}

export default {
    loadImageInfo,
    loadVideoInfo
}
