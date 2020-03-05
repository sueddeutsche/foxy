import Foxy, { Options } from "./Foxy";
import utils from "./utils";
import Handler from "./handler/Handler";
declare const handler: {
    unsplash: Handler;
    image: Handler;
    video: Handler;
};
export { Foxy, Options, Handler, handler, utils };
