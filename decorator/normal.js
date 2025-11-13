let basic = 100;

function AddBonus(basic, bonus){
    basic = basic + bonus;
    return basic;
}

basic = AddBonus(basic, 10);
// console.log("basic amount", basic);

function AddIncentive(basic, incentive){
    basic = basic + incentive;
    return basic;
}


// basic = AddIncentive(basic, 10);
// console.log("basic amount", basic);


let emp = {Basic: 20}

let emp2 = {Basic: 20, 
    AddIncentive: function (incentive){
        return this.Basic + incentive;
    }
}
console.log('employee data ', emp);

// console.log('employee data ', emp2.AddIncentive(10));