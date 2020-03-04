import utils from "../src/utils";
import fetch from "node-fetch";
import sizeOf from "image-size";


function loadImageInfoNodeJS(url: string): Promise<{ width: number; height: number; type: string }> {
    return fetch(url)
        .then(res => res.buffer())
        // @ts-ignore
        .then(response => sizeOf(response));
}

// @ts-ignore
utils.loadImageInfo = loadImageInfoNodeJS
