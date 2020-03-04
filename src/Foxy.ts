import Handler, { Request, Info } from "./Handler";


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

    get(methodName: string, request: Request): Promise<any> {
        const handler = this.findHandler(methodName, request);
        if (handler == null) {
            throw new Error(`There is no handler for method '${methodName}(${JSON.stringify(request)})'`);
        }
        return handler[methodName](request);
    }

    private findHandler(methodName: string, request: Request): Handler {
        for (const handler of this.handlers) {
            if (typeof handler[methodName] === "function" && handler.use(request) === true) {
                return handler;
            }
        }
    }
}
