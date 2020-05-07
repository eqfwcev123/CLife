const { getRepository, createConnection } = require('typeorm');
const User = require('../build/entity/User');
const expect = require('chai').expect;
const assert = require('chai').assert;

describe("this is for nesting", function () {
    it("foo does not equal to bar", function () {
        assert("foo" !== "bar", "foo does not equal to bar")
    })
})


describe("test fail case", function () {
    it("This test should fail", function () {
        assert.fail(1, 2, "wrong expected value")
    })
})



describe(".isOk(): truthy checker", function () {
    it("testing isOk()", function () {
        assert.isOk("ill", "everything is ok")
    })
})

describe(".isNotOk(): truthy checker", function () {
    it("testing isNotOk()", function () {
        assert.isNotOk(undefined, "everything is ok")
    })
})

it("testing isNotTrue()", function () {
    assert.isNotTrue("tasty chai", 'great, time for tea!');
})