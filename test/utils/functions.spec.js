var chai = require('chai');  
var assert = chai.assert;    // Using Assert style
var expect = chai.expect;    // Using Expect style
var should = chai.should();  // Using Should style
const functions = require("../../utils/functions.js");

describe('Utils functions', function(){

    describe('GetPage Tests', function(){
        it('page should return 1 when empty', function(){
            var page = functions.GetPage();
            expect(page).to.be.equal(1);
        })

        it('page should return 1 when null', function(){
            assert.equal(1,functions.GetPage(null));
        })

        it('page should return 1 when 0', function(){
            assert.equal(1,functions.GetPage(0));
        })

        it('page should return 1 when negative', function(){
            assert.equal(1,functions.GetPage(-1));
            assert.equal(1,functions.GetPage(-1000));
        })

        it('page should return value if value > 0', function(){
            assert.equal(1,functions.GetPage(1));
            assert.equal(2,functions.GetPage(2));
            assert.equal(3456,functions.GetPage(3456));
        })
    });

    describe('GetSearchParam Tests', function(){
        it('page should return "" when empty', function(){
            assert.equal("",functions.GetSearchParam());
        })

        it('page should return "" when null', function(){
            assert.equal("",functions.GetSearchParam(null));
        })

        it('page should return value when not empty or null', function(){
            assert.equal("value",functions.GetSearchParam("value"));
            assert.equal("long value string as param",functions.GetSearchParam("long value string as param"));
            assert.equal("a",functions.GetSearchParam("a"));
        })
    })
})