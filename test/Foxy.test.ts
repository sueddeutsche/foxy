import "mocha";
import { strict as assert } from "assert";
import Foxy from "../src/Foxy";


describe("Foxy", () => {

    describe("get", () => {

        it("should return error if no handler with 'methodName' is registered", async () => {
            const foxy = new Foxy();
            await foxy.get("url", { url: "1234" })
                .then(() => assert.fail("promise should have aborted"))
                .catch(e => assert.ok(e instanceof Error))
        });

        it("should call 'methodName' of handler", async () => {
            const foxy = new Foxy({
                handlers: [{
                    use: () => true,
                    getImageURL: (request) => Promise.resolve(`https://image/${request.url}`)
                }]
            });

            const url = await foxy.get("getImageURL", { url: "1234" });
            assert.equal(url, "https://image/1234");
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
                    getImageURL(request) {
                        return Promise.resolve(`${this.config.domain}image/${request.url}`);
                    }
                }]
            });

            const url = await foxy.get("getImageURL", { url: "1234" });
            assert.equal(url, "https://image/1234");
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
                        getImageURL: (request) => Promise.resolve(`https://image/${request.url}`)
                    }
                ]
            });

            const url = await foxy.get("getImageURL", { url: "1234" });
            assert.equal(url, "https://image/1234");
        });

        it("should only select handler having requested method", async () => {
            const foxy = new Foxy({
                handlers: [
                    {
                        use: () => true
                    },
                    {
                        use: () => true,
                        getImageURL: (request) => Promise.resolve(`https://image/${request.url}`)
                    }
                ]
            });

            const url = await foxy.get("getImageURL", { url: "1234" });
            assert.equal(url, "https://image/1234");
        });
    });
});
