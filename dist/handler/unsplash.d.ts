import Handler, { Request } from "./Handler";
export interface Parameters {
    width?: number;
    height?: number;
    fit?: string;
    quality?: number;
    auto?: string;
}
export declare function parseURL(url: string): Parameters;
export declare function getURL(request: Request): string;
declare const _default: Handler;
export default _default;
