export default class Foxy {
    constructor(options = {}) {
        this.handlers = options.handlers || [];
    }
    addHandler(handler, index = 0) {
        if (this.handlers[index] == null) {
            this.handlers.push(handler);
        }
        this.handlers.splice(index, 0, handler);
    }
    removeHandler(handler) {
        this.handlers = this.handlers.filter(h => h !== handler);
    }
    getImageURL(request) {
        return this.get("getImageURL", request);
    }
    getImageInfo(request) {
        return this.get("getImageInfo", request);
    }
    getVideoURL(request) {
        return this.get("getVideoURL", request);
    }
    getVideoInfo(request) {
        return this.get("getVideoInfo", request);
    }
    getURL(request) {
        return this.get("getURL", request);
    }
    getJSON(request) {
        return this.get("getJSON", request);
    }
    get(methodName, request) {
        const handler = this.findHandler(methodName, request);
        if (handler == null) {
            return Promise
                .reject(new Error(`There is no handler for method '${methodName}(${JSON.stringify(request)})'`));
        }
        return handler[methodName](request);
    }
    isSupported(request) {
        return this.handlers.some(handler => handler.use(request));
    }
    findHandler(methodName, request) {
        return this.handlers
            .find(handler => typeof handler[methodName] === "function" && handler.use(request) === true);
    }
}
