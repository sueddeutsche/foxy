import Handler, { Request, URLRequest, Info } from "./Handler";
import AnyObject from "./AnyObject";


export interface Options {
    handlers?: Array<Handler>;
}


export default class Foxy {
    handlers;

    constructor(options: Options = {}) {
        this.handlers = options.handlers || [];
    }

    getImageURL(request: Request): Promise<string> {
        return this.get("getImageURL", request);
    }

    getImageInfo(request: Request): Promise<Info> {
        return this.get("getImageInfo", request);
    }

    getVideoURL(request: Request): Promise<string> {
        return this.get("getVideoURL", request);
    }

    getVideoInfo(request: Request): Promise<Info> {
        return this.get("getVideoInfo", request);
    }

    get(requestId: string, request: Request) {
        const handler = this.findHandler(requestId, request);
        if (handler == null) {
            throw new Error(`There is no handler for request '${requestId}(${JSON.stringify(request)})'`);
        }
        return handler[requestId](request);
    }

    private findHandler(requestId: string, request: Request) {
        for (let handler of this.handlers) {
            if (typeof handler[requestId] === "function" && handler.use(request) === true) {
                return handler;
            }
        }
    }
}
