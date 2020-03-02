import "mocha";
import { strict as assert } from "assert";
import test from "../../src/lib";


describe("test", () => {
    it("should return 'hey'", () => {
        assert.equal("hey", test.test());
    });
});
