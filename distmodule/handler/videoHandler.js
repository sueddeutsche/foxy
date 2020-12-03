import utils from "../utils";
export default {
    use: (request) => /^https?:\/\//.test(request.source),
    getVideoURL: (request) => Promise.resolve(request.source),
    getVideoInfo: (request) => utils.loadVideoInfo(request.source)
};
