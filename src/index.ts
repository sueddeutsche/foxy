import unsplash from "./handler/unsplash";
import image from "./handler/imageHandler";
import video from "./handler/videoHandler";

const handler = {
    unsplash,
    image,
    video
};

export { default as Foxy } from "./Foxy";
export { default as utils } from "./utils";
export { handler };
