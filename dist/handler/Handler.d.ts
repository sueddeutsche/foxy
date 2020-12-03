import AnyObject from "../AnyObject";
export interface Request extends AnyObject {
    source: string;
}
export interface Info {
    [p: string]: any;
}
export interface Data {
    [p: string]: any;
}
export declare type URLRequest = (request: Request) => Promise<string>;
export declare type InfoRequest = (request: Request) => Promise<Info>;
export declare type DataRequest = (request: Request) => Promise<Data>;
export default interface Handler extends AnyObject {
    /** returns true, if this handler should be used for the current input-request  */
    use(request: Request): boolean;
    /** returns the image-URL to be used on html `img.src` */
    getImageURL?: URLRequest;
    /** returns metadata of image passed as URL */
    getImageInfo?: InfoRequest;
    /** returns the video-URL to be used on html `img.src` */
    getVideoURL?: URLRequest;
    /** returns metadata of video passed as URL */
    getVideoInfo?: InfoRequest;
    /** returns a generic json-URL */
    getURL?: URLRequest;
    /** returns json-response of the request url */
    getJSON?: DataRequest;
}
