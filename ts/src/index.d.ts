declare const handler: {
    unsplash: import("./handler/Handler").default;
    image: import("./handler/Handler").default;
};
export { default as Foxy } from "./Foxy";
export { default as utils } from "./utils";
export { handler };
