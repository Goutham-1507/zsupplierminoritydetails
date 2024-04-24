/*global QUnit*/

sap.ui.define([
	"zsupplierminoritydetails/controller/MinorityList.controller"
], function (Controller) {
	"use strict";

	QUnit.module("MinorityList Controller");

	QUnit.test("I should test the MinorityList controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
