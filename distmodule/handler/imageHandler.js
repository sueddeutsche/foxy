import utils from "../utils";
export default {
    use: (request) => /^https?:\/\//.test(request.source),
    getImageURL: (request) => Promise.resolve(request.source),
    getImageInfo: (request) => utils.loadImageInfo(request.source)
};
