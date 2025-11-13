function classDecorator(someBooleanFlag){
    return function(target, key= null){
        console.log('classDecorator here ');
        target.prototype.getName = function(a){
            return a;
        }
    }
  }
function methodDecorator(someBooleanFlag){
    return function(target, key){
        console.log('methodDecorator here  ');
        return function (...args) {
            console.log('before method call ', args);
            let result = target.apply(this, args);
            console.log('after method call ', args);
            return result + "ku";
        };
        // target(29);
    }
  }
function propDecorator(someBooleanFlag){
    function memberProp(target, key ){
        console.log('propDecorator here  ');
          return function (initialValue) {
            console.log('before property call ', initialValue);
            return someBooleanFlag + initialValue
          }
        
    }
    return memberProp;
};

function paramDecorator(someBooleanFlag){
  function memberProp(target, key, descriptor){
      console.log('paramDecorator here  ');
        return function (initialValue) {
          console.log('before parameter call ', initialValue);
          return someBooleanFlag + initialValue
        }
      
  }
  return memberProp;
};


var Peon = (function (controller) {
    function Peon(name) {
        this.PeonName = name;
        
    }
    Peon.prototype.getPersonData = function (fname) {
        console.log("getPersonData here ");
        return fname;
    };
    Peon.prototype.getPersonData =  methodDecorator(true)(Peon.prototype.getPersonData);
    
    controller(Peon);
    return Peon;
}(classDecorator("Jobs")));
var peon = new Peon('chotu');
// console.log('before propert set ', peon.PeonName.PeonName);
// peon.PeonName = "test";
// console.log('after propert set ', peon.PeonName);
console.log("result here ", peon.getPersonData("donhai"));
console.log("getName here ", peon.getName("vdda"));
