declare module foxy
{
	export default interface AnyObject {
	    [p: string]: any;
	}

	import Handler, { Request, Info } from "./handler/Handler";
	export interface Options {
	    handlers?: Array<Handler>;
	}
	export default class Foxy {
	    handlers: any;
	    constructor(options?: Options);
	    addHandler(handler: Handler, index?: number): void;
	    removeHandler(handler: Handler): void;
	    getImageURL(request: Request): Promise<string>;
	    getImageInfo(request: Request): Promise<Info>;
	    getVideoURL(request: Request): Promise<string>;
	    getVideoInfo(request: Request): Promise<Info>;
	    getURL(request: Request): Promise<string>;
	    get(methodName: string, request: Request): Promise<any>;
	    private findHandler;
	}

	const handler: {
	    unsplash: import("./handler/Handler").default;
	    image: import("./handler/Handler").default;
	    video: import("./handler/Handler").default;
	};
	export { default as Foxy } from "./Foxy";
	export { default as utils } from "./utils";
	export { handler };

	import AnyObject from "./AnyObject";
	import Handler from "./handler/Handler";
	export function isHandler(handler: any): handler is Handler;
	export interface ImageInfo {
	    type: string;
	    width: number;
	    height: number;
	    image: HTMLImageElement;
	}
	function loadImageInfo(url: string, fetchOptions?: AnyObject): Promise<ImageInfo>;
	export interface VideoInfo {
	    type: string;
	    width: number;
	    height: number;
	    video: HTMLVideoElement;
	    duration: number;
	    poster: string;
	}
	function loadVideoInfo(url: string, fetchOptions?: AnyObject): Promise<VideoInfo>;
	const _default: {
	    loadImageInfo: typeof loadImageInfo;
	    loadVideoInfo: typeof loadVideoInfo;
	};
	export default _default;

	import AnyObject from "../AnyObject";
	export interface Request {
	    url: string;
	    [p: string]: any;
	}
	export interface Info {
	    width: number;
	    height: number;
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

	import Handler from "./Handler";
	const _default: Handler;
	export default _default;

	import Handler, { Request } from "./Handler";
	export interface Parameters {
	    width?: number;
	    height?: number;
	    fit?: string;
	    quality?: number;
	    auto?: string;
	}
	export function parseURL(url: string): Parameters;
	export function getURL(request: Request): string;
	const _default: Handler;
	export default _default;

	import Handler from "./Handler";
	const _default: Handler;
	export default _default;

}