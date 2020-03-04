function loadImageInfo(url: string): Promise<{ type: string; width: number; height: number; image: HTMLImageElement }> {
    const result = {
        image: new Image(),
        type: "",
        width: 0,
        height: 0
    };

    return fetch(url)
        .then(response => response.blob())
        .then(imageBlob => {
            result.type = imageBlob.type.replace(/^[/]+\//, "");
            return URL.createObjectURL(imageBlob);
        })
        .then(imageSrc => {
            return new Promise((resolve, reject) => {
                result.image.addEventListener("load", () => resolve());
                result.image.addEventListener("error", reject);
                result.image.src = imageSrc;
            })
        })
        .then(() => {
            result.width = result.image.naturalWidth;
            result.height = result.image.naturalHeight;
            return result;
        });
}


export default {
    loadImageInfo
}
