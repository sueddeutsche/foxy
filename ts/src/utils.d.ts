declare function loadImage(url: string): Promise<{
    type: string;
    width: number;
    height: number;
    image: HTMLImageElement;
}>;
declare const _default: {
    loadImage: typeof loadImage;
};
export default _default;
