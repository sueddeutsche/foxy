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
    isSupported(request: Request): boolean;
    findHandler(methodName: string, request: Request): Handler;
}
