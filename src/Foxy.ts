import Handler, { Request, Info } from "./handler/Handler";


export interface Options {
    handlers?: Array<Handler>;
}


export default class Foxy {
    handlers;

    constructor(options: Options = {}) {
        this.handlers = options.handlers || [];
    }

    addHandler(handler: Handler, index = 0): void {
        if (this.handlers[index] == null) {
            this.handlers.push(handler);
        }
        this.handlers.splice(index, 0, handler);
    }

    removeHandler(handler: Handler): void {
        this.handlers = this.handlers.filter(h => h !== handler);
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

    getURL(request: Request): Promise<string> {
        return this.get("getURL", request);
    }

    get(methodName: string, request: Request): Promise<any> {
        const handler = this.findHandler(methodName, request);
        if (handler == null) {
            return Promise
                .reject(new Error(`There is no handler for method '${methodName}(${JSON.stringify(request)})'`));
        }
        return handler[methodName](request);
    }

    isSupported(request: Request): boolean {
        return this.handlers.some(handler => handler.use(request));
    }

    findHandler(methodName: string, request: Request): Handler {
        return this.handlers
            .find(handler => typeof handler[methodName] === "function" && handler.use(request) === true);
    }
}
