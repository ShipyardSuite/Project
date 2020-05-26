"use strict";

const { exampleFunction } = require("./../server/utils/example");

const expect = require("chai").expect;

describe("Example", function () {
	describe("exampleFunction()", function () {
		it("output should equal 'testService'", function () {
			expect(exampleFunction()).to.equal("project");
		});
	});
});