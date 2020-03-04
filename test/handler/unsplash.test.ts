import "mocha";
import { strict as assert } from "assert";
import unsplashHandler from "../../src/handler/unsplash";


describe("Handler.unsplash", () => {
    const UNSPLASH_URL = "https://images.unsplash.com/photo-1583253684016-54b500ca4842?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"

    it("should register on unplash photo url", () => {
        const use = unsplashHandler.use({ url: UNSPLASH_URL });
        assert.ok(use);
    });

    it("should not register on non-unplash url", () => {
        const use = unsplashHandler.use({ url: "https://media.istockphoto.com/photos/apples-isolated-on-white-background-picture-id902183704" });
        assert.ok(use === false);
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
