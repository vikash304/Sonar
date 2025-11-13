class Vikash{
    age: number;
    mul: any = function (){return 2;}
    constructor(){
    this.age =23;
}
}

class Vik extends Vikash{
    add:any = function (){ return "hey";}

}

// Vikash.prototype.mul = function (){ return "hey";}

let c = new Vikash();
let d = new Vik();
console.log('first ', c);
console.log('second ', d);
console.log ('parent Prototype ', Vikash.prototype);
console.log ('child Prototype ', Vik.prototype);

