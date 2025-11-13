function Employee(){
    this.age = 23;
    this.mul = function(){return 3;}
}
Employee.prototype.add=function(){return 1;}

let Emp = (function (_super){
    
    function Emp(){
    _super.apply(this, arguments);
    this.name = "vikash";
    this.subs = function() {return 2;}
    }
    Emp.prototype.__proto__ = Employee.prototype;
    return Emp;
    
}(Employee));



let a = new Employee();
let b = new Emp();

console.log("first ", Employee.prototype);
console.log("second ", Emp.prototype);
console.log(a);
console.log(b);