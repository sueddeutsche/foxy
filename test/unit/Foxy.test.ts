import "mocha";
import { strict as assert } from "assert";
import Foxy from "../../src/Foxy";


describe("Foxy", () => {

    describe("get", () => {

        it("should throw if no handler with 'methodName' is registered", () => {
            const foxy = new Foxy();
            assert.throws(() => foxy.get("url", { url: "1234" }));
        });

        it("should call 'methodName' of handler", async () => {
            const foxy = new Foxy({
                handlers: [{
                    use: () => true,
                    getImageURL: () => Promise.resolve("https://image")
                }]
            });

            const url = await foxy.get("getImageURL", { url: "1234" });
            assert.equal(url, "https://image");
        });

        it("should pass request-object in use", async () => {
            let url;
            const foxy = new Foxy({
                handlers: [{
                    use: (request) => {
                       url = request.url;
                       return true;
                    },
                    getImageURL: () => Promise.resolve("https://image")
                }]
            });

            await foxy.get("getImageURL", { url: "1234" });
            assert.equal(url, "1234");
        });

        it("should execute method on handler-context", async () => {
            const foxy = new Foxy({
                handlers: [{
                    config: {
                        domain: "https://"
                    },
                    use: () => true,
                    getImageURL() {
                        return Promise.resolve(`${this.config.domain}image`);
                    }
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

        it("should only select handler having requested method", async () => {
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
