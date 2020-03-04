import "mocha";
import { strict as assert } from "assert";
import unsplashHandler from "../../src/handler/unsplash";


describe("Handler.unsplash", () => {
    const UNSPLASH_URL = "https://images.unsplash.com/photo-1583253684016-54b500ca4842?auto=format&fit=crop&w=800&q=60"

    it("should register on unplash photo url", () => {
        const use = unsplashHandler.use({ url: UNSPLASH_URL });
        assert.ok(use);
    });

    it("should not register on non-unplash url", () => {
        const use = unsplashHandler.use({ url: "https://media.istockphoto.com/photos/apples-isolated-on-white-background-picture-id902183704" });
        assert.ok(use === false);
    });


    describe("getImageURL", () => {

        it("should return input url", async () => {
            const url = await unsplashHandler.getImageURL({ url: UNSPLASH_URL });
            assert.equal(url, UNSPLASH_URL);
        });

        it("should return add additional property", async () => {
            const url = await unsplashHandler.getImageURL({ url: UNSPLASH_URL, height: 400 });
            const params = new URLSearchParams(url);
            assert.equal(params.get("h"), "400");
        });

        it("should return update existing property", async () => {
            const url = await unsplashHandler.getImageURL({ url: UNSPLASH_URL, width: 360 });
            const params = new URLSearchParams(url);
            assert.equal(params.get("w"), "360");
        });
    });


    describe("getImageInfo", () => {

        it("should return image dimensions", async () => {
            const info = await unsplashHandler.getImageInfo({ url: UNSPLASH_URL });
            assert.equal(info.width, 800);
            assert.equal(info.type, "jpg");
        });

        it("should return modified image", async () => {
            const info = await unsplashHandler.getImageInfo({ url: UNSPLASH_URL, width: 1200 });
            assert.equal(info.width, 1200);
            assert.equal(info.type, "jpg");
        });
    });
});
