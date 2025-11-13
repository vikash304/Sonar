
export function classDecorator(someBooleanFlag){
    return function(target: any, key:any = null): any{
        console.log('classDecorator here ');
        console.log('key data here  ', key);
        target.prototype.getName = function(a){
          return a;
        }
        // return function(...args){
        //   console.log('before constructor here ');
        //   let res = target.apply(target, args);
        //   console.log('after constructor here ');
        //   return target.prototype;
        // }
    }
  }


  export function methodDecorator(someBooleanFlag){
    return function(target: any, key:any): any{
        console.log('methodDecorator here  ');
        console.log('key data here  ', key);
        // return function (...args: any[]) {
        //     console.log('before method call ', args);
        //     let result = target.apply(this, args);
        //     console.log('after method call ', args);
        //     return result + "ku";
        // };
        // target(29);
    }
  }
  export function propDecorator(configValue){
    function memberProp(target: any, key: any): any{
        console.log('propDecorator here  ');
          return function (initialValue: string) {
            console.log('before property call ', initialValue);
            return configValue + initialValue
          }
    }
    return memberProp;
};

//Not working
export function propDec(someBooleanFlag){
  function memberProp(target: any, key: any): any{
      let modifiedMessage : string = `bye from!`;
          
      // Return modifiedMessage whenever the message is asked 
      const getter = function() { 
        console.log('getter here  ');
          return modifiedMessage; 
      }; 
        
      // Set the modifiedMessage value 
      const setter = function(sender) { 
        console.log('setter here  ');
          modifiedMessage = `Hello from ${sender}!`;   
      };

      // Overwrite the original message with
      // modifiedMessage we just created
      
      let Person = Object.defineProperty({}, key, {
          get: getter,
          set: setter
      });
  }
  return memberProp;
};

export function paramLogger(target, methodName, parameterIndex: number): any {
  // console.log(`Parameter ${parameterIndex + 1} of ${methodName} method`);
  console.log('target here 123', target);
  console.log('methodName here ', methodName);
  console.log('parameterIndex here1 ', parameterIndex);
  // return "DDdlj";
  return function(){
      console.log('before paramLogger here ');
      // console.log('argumm here ', args[parameterIndex]);
      // let result = target.apply(this, args);
      // return result;
      
    }
}  

export function paramDecorator(someBooleanFlag){
  function memberProp(target: any, key: any, descriptor): any{
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
};
// export function paramDecorator(someBooleanFlag: boolean){
//   function memberProp(target: any, key: any){
//       console.log('paramDecorator here  ');
//   }
//   return memberProp;
// };
  
  // @classDecorator(true)
  export class Person {
    constructor(){
        // console.log('constructon ', sName);
        this.personName = "umar";
    }
    @propDecorator("vikash") personName: string;
    // @methodDecorator(true)
    //ddeeddf
    // getAge(@paramDecorator("Hello")fname: string, @paramDecorator("Bye")lname:string){
    getAge(fname: string, lname:string){
        console.log('propDec personName her ', this.personName);
        console.log('fname her ', fname);
        console.log('lname her ', lname)
        return fname + lname;
    }
  }

  let person = new Person();
  let a = person.getAge("ddvik", "kum");
  
  console.log("method return ", a);
  // console.log("prop before set ", person.personName);
  // person.personName = "test";
  // console.log("prop after set ", person.personName);