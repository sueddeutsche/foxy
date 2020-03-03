import "mocha";
import { strict as assert } from "assert";
import Foxy from "../../src/Foxy";


describe("Foxy", () => {

    describe("get", () => {

        it("should throw if no handler with 'requestId' is registered", () => {
            const foxy = new Foxy();
            assert.throws(() => foxy.get("url", { url: "1234" }));
        });

        it("should call requestId of handlerId", async () => {
            const foxy = new Foxy({
                handlers: [{
                    use: () => true,
                    getImageURL: () => Promise.resolve("https://image")
                }]
            });

            const url = await foxy.get("getImageURL", { url: "1234" });
            assert.equal(url, "https://image");
        });

        it("should only select handler returning 'true' on use", async () => {
            const foxy = new Foxy({
                handlers: [
                    {
                        use: () => false,
                        getImageURL: () => Promise.resolve("not-selected")
                    },
                    {
                        use: () => true,
                        getImageURL: () => Promise.resolve("https://image")
                    }
                ]
            });

            const url = await foxy.get("getImageURL", { url: "1234" });
            assert.equal(url, "https://image");
        });

        it("should only select handler having 'requestId' as method", async () => {
            const foxy = new Foxy({
                handlers: [
                    {
                        use: () => true
                    },
                    {
                        use: () => true,
                        getImageURL: () => Promise.resolve("https://image")
                    }
                ]
            });

            const url = await foxy.get("getImageURL", { url: "1234" });
            assert.equal(url, "https://image");
        });
    });
});
