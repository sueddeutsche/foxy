export interface ImageInfo {
    type: string;
    width: number;
    height: number;
    image: HTMLImageElement;
}
declare function loadImageInfo(url: string): Promise<ImageInfo>;
export interface VideoInfo {
    type: string;
    width: number;
    height: number;
    video: HTMLVideoElement;
    duration: number;
    poster: string;
}
declare function loadVideoInfo(url: string): Promise<VideoInfo>;
declare const _default: {
    loadImageInfo: typeof loadImageInfo;
    loadVideoInfo: typeof loadVideoInfo;
};
export default _default;
