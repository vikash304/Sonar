function classDecorator(path){
    return function(target){
        console.log('classDecorator here ');
        console.log("path here ", path);
        target.prototype.getName = function(a){
            // custom logic
            // app.
            return a;

        }
    }
  }

function getMethodDecorator(someBooleanFlag){
    return function(target){
        console.log('getMethodDecorator here  ');
        // app.get('/', target);
        //// target(29);
    }
  }
  
const propDecorator = (someBooleanFlag) => {
    function memberProp(target, memberName){
        console.log('propDecorator here  ');
    }
    return memberProp;
};


function contr(path){
    debugger;
    return function(target){
        debugger;
        console.log("path here ", path);
    }
}

var Manager =  (function (cont) {
    debugger;
    function Manager(age) {
        const propDec = propDecorator(true);
        propDec(this.Age, "");
        this.Age = age;
    }
    const methodDec = getMethodDecorator(true);
    Manager.prototype.getPersonData = function () {
        console.log("getPersonData here ");
    };
    methodDec(Manager.prototype.getPersonData);
    debugger;
    cont(Manager);
    return Manager;
}(classDecorator("Jobs")));

var manager = new Manager(22);
manager.getPersonData();
