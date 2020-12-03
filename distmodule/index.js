import Foxy from "./Foxy";
import utils from "./utils";
import unsplash from "./handler/unsplash";
import image from "./handler/imageHandler";
import video from "./handler/videoHandler";
const handler = {
    unsplash,
    image,
    video
};
export { Foxy, handler, utils };
export default Foxy;
