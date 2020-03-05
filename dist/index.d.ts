import Foxy, { Options } from "./Foxy";
import utils from "./utils";
import Handler, { Request, URLRequest, InfoRequest } from "./handler/Handler";
declare const handler: {
    unsplash: Handler;
    image: Handler;
    video: Handler;
};
export { Foxy, Options, Handler, Request, URLRequest, InfoRequest, handler, utils };
