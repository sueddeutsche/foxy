import unsplash from "./handler/unsplash";
import image from "./handler/imageHandler";

const handler = {
    unsplash,
    image
};

export { default as Foxy } from "./Foxy";
export { default as utils } from "./utils";
export { handler };
