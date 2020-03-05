import Foxy, { Options } from "./Foxy";
import utils from "./utils";
import Handler, { Request, URLRequest, InfoRequest } from "./handler/Handler";
import unsplash from "./handler/unsplash";
import image from "./handler/imageHandler";
import video from "./handler/videoHandler";

const handler = {
    unsplash,
    image,
    video
};

export {
    Foxy,
    Options,
    Handler,
    Request,
    URLRequest,
    InfoRequest,
    handler,
    utils
};

