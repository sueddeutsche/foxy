import AnyObject from "../AnyObject";


export interface Request extends AnyObject {
    source: string;
}

export interface Info {
    [p: string]: any;
}

export type URLRequest = (request: Request) => Promise<string>;

export type InfoRequest = (request: Request) => Promise<Info>;

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
}
