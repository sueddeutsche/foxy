function isHandler(handler) {
    return Object.prototype.toString.call(handler) === "[object Object]" && typeof handler.use === "function";
}
function loadImageInfo(url, fetchOptions = {}) {
    const result = {
        src: url,
        image: new Image(),
        type: "",
        width: 0,
        height: 0
    };
    return fetch(url, fetchOptions)
        .then(response => response.blob())
        .then(imageBlob => {
        result.type = imageBlob.type.replace(/^[^/]+\//, "");
        return URL.createObjectURL(imageBlob);
    })
        .then(imageSrc => {
        return new Promise((resolve, reject) => {
            result.image.addEventListener("load", () => resolve());
            result.image.addEventListener("error", reject);
            result.image.src = imageSrc;
        });
    })
        .then(() => {
        result.width = result.image.naturalWidth;
        result.height = result.image.naturalHeight;
        return result;
    });
}
function loadVideoInfo(url, fetchOptions = {}) {
    const result = {
        src: url,
        width: 0,
        height: 0,
        video: document.createElement("video"),
        duration: 0,
        poster: ""
    };
    return fetch(url, fetchOptions)
        .then(response => response.blob())
        .then(imageBlob => {
        result.type = imageBlob.type.replace(/^[^/]+\//, "");
        return URL.createObjectURL(imageBlob);
    })
        .then(imageSrc => {
        const onVideoLoaded = new Promise((resolve, reject) => {
            result.video.addEventListener("error", reject);
            result.video.addEventListener("loadedmetadata", () => {
                const { video } = result;
                result.width = video.videoWidth;
                result.height = video.videoHeight;
                result.duration = video.duration;
                result.poster = video.poster;
                resolve(result);
            });
            const source = document.createElement("source");
            source.setAttribute("src", imageSrc);
            result.video.appendChild(source);
        });
        return onVideoLoaded;
    });
}
export default {
    loadImageInfo,
    loadVideoInfo,
    isHandler
};
