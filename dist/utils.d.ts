import AnyObject from "./AnyObject";
import Handler from "./handler/Handler";
export declare function isHandler(handler: any): handler is Handler;
export interface ImageInfo {
    type: string;
    width: number;
    height: number;
    image: HTMLImageElement;
}
declare function loadImageInfo(url: string, fetchOptions?: AnyObject): Promise<ImageInfo>;
export interface VideoInfo {
    type: string;
    width: number;
    height: number;
    video: HTMLVideoElement;
    duration: number;
    poster: string;
}
declare function loadVideoInfo(url: string, fetchOptions?: AnyObject): Promise<VideoInfo>;
declare const _default: {
    loadImageInfo: typeof loadImageInfo;
    loadVideoInfo: typeof loadVideoInfo;
};
export default _default;
