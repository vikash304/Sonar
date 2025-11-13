class Car {   
    Color:string     
    constructor(color:string) {   
       this.Color = color  
    }
    show():void {  
        console.log("show: " + this.Color);  
    }     
 }   
 class Audi extends Car {   
     Price: number  
     constructor(color: string, price: number) {  
         super(color);  
         this.Price = price;  
     }  
     display():void {  
         console.log("Color of Audi car: " + this.Color);
         this.show();  
         console.log("Price of Audi car: " + this.Price);  
     }  
 }  


 