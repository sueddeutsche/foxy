declare function loadImageInfo(url: string): Promise<{
    type: string;
    width: number;
    height: number;
    image: HTMLImageElement;
}>;
declare const _default: {
    loadImageInfo: typeof loadImageInfo;
};
export default _default;
