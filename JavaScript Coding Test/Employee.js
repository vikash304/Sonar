var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Vikash = /** @class */ (function () {
    function Vikash() {
        this.mul = function () { return 2; };
        this.age = 23;
    }
    return Vikash;
}());
var Vik = /** @class */ (function (_super) {
    __extends(Vik, _super);
    function Vik() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.add = function () { return "hey"; };
        return _this;
    }
    return Vik;
}(Vikash));
// Vikash.prototype.mul = function (){ return "hey";}
var c = new Vikash();
var d = new Vik();
console.log('first ', c);
console.log('second ', d);
console.log('parent Prototype ', Vikash.prototype);
console.log('child Prototype ', Vik.prototype);
