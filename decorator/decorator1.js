"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = exports.paramDecorator = exports.paramLogger = exports.propDec = exports.propDecorator = exports.methodDecorator = exports.classDecorator = void 0;
function classDecorator(someBooleanFlag) {
    return function (target, key) {
        if (key === void 0) { key = null; }
        console.log('classDecorator here ');
        console.log('key data here  ', key);
        target.prototype.getName = function (a) {
            return a;
        };
        // return function(...args){
        //   console.log('before constructor here ');
        //   let res = target.apply(target, args);
        //   console.log('after constructor here ');
        //   return target.prototype;
        // }
    };
}
exports.classDecorator = classDecorator;
function methodDecorator(someBooleanFlag) {
    return function (target, key) {
        console.log('methodDecorator here  ');
        console.log('key data here  ', key);
        // return function (...args: any[]) {
        //     console.log('before method call ', args);
        //     let result = target.apply(this, args);
        //     console.log('after method call ', args);
        //     return result + "ku";
        // };
        // target(29);
    };
}
exports.methodDecorator = methodDecorator;
function propDecorator(configValue) {
    function memberProp(target, key) {
        console.log('propDecorator here  ');
        return function (initialValue) {
            console.log('before property call ', initialValue);
            return configValue + initialValue;
        };
    }
    return memberProp;
}
exports.propDecorator = propDecorator;
;
//Not working
function propDec(someBooleanFlag) {
    function memberProp(target, key) {
        var modifiedMessage = "bye from!";
        // Return modifiedMessage whenever the message is asked 
        var getter = function () {
            console.log('getter here  ');
            return modifiedMessage;
        };
        // Set the modifiedMessage value 
        var setter = function (sender) {
            console.log('setter here  ');
            modifiedMessage = "Hello from ".concat(sender, "!");
        };
        // Overwrite the original message with
        // modifiedMessage we just created
        var Person = Object.defineProperty({}, key, {
            get: getter,
            set: setter
        });
    }
    return memberProp;
}
exports.propDec = propDec;
;
function paramLogger(target, methodName, parameterIndex) {
    // console.log(`Parameter ${parameterIndex + 1} of ${methodName} method`);
    console.log('target here 123', target);
    console.log('methodName here ', methodName);
    console.log('parameterIndex here1 ', parameterIndex);
    // return "DDdlj";
    return function () {
        console.log('before paramLogger here ');
        // console.log('argumm here ', args[parameterIndex]);
        // let result = target.apply(this, args);
        // return result;
    };
}
exports.paramLogger = paramLogger;
function paramDecorator(someBooleanFlag) {
    function memberProp(target, key, descriptor) {
        console.log('paramDecorator here  ');
        console.log('target here 123', target);
        console.log('key here ', key);
        console.log('descriptor here1 ', descriptor);
        // return function(){
        //   console.log('before paramLogger here ');
        return "Abc";
        // console.log('argumm here ', args[parameterIndex]);
        // let result = target.apply(this, args);
        // return result;
        // } 
        // return function (initialValue: string) {
        //   console.log('before parameter call ', initialValue);
        //   return someBooleanFlag + initialValue
        // }
    }
    return memberProp;
}
exports.paramDecorator = paramDecorator;
;
// export function paramDecorator(someBooleanFlag: boolean){
//   function memberProp(target: any, key: any){
//       console.log('paramDecorator here  ');
//   }
//   return memberProp;
// };
// @classDecorator(true)
var Person = /** @class */ (function () {
    function Person() {
        // console.log('constructon ', sName);
        this.personName = "umar";
    }
    // @methodDecorator(true)
    //ddeeddf
    // getAge(@paramDecorator("Hello")fname: string, @paramDecorator("Bye")lname:string){
    Person.prototype.getAge = function (fname, lname) {
        console.log('propDec personName her ', this.personName);
        console.log('fname her ', fname);
        console.log('lname her ', lname);
        return fname + lname;
    };
    __decorate([
        propDecorator("vikash"),
        __metadata("design:type", String)
    ], Person.prototype, "personName", void 0);
    return Person;
}());
exports.Person = Person;
var person = new Person();
var a = person.getAge("ddvik", "kum");
console.log("method return ", a);
// console.log("prop before set ", person.personName);
// person.personName = "test";
// console.log("prop after set ", person.personName);
