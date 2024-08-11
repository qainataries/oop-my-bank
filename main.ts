import inquirer from "inquirer";
//Bank Account Interface
interface bankAccount{
    accountNumber:number;
    balance:number;
    withdraw(amount:number):void
    deposit(amount:number):void
    checkBalance():void

}
// Bank Account Class
class bankAccount implements bankAccount{
    accountNumber: number;
    balance: number;

    constructor(accountNumber:number, balance:number){
        this.accountNumber=accountNumber
        this.balance=balance
    }
    
    // Debit money
    withdraw(amount: number): void {
        if(this.balance >= amount){
            this.balance-=amount;
            console.log(`withdrawal of $${amount} successful. Remaining balance: $${this.balance}`);
        }else{
            console.log("Insufficient Balance.");
        }
    }

    //Credit Money
    deposit(amount: number): void {
        if(amount>100){
            amount-=1; //$1 fee charged if more than $100 is deposited
        }this.balance+=amount;
        console.log(`Deposit of $${amount} sucessful. Remaining balance:$${this.balance}`);
    }

    //Check balance
    checkBalance(): void {
        console.log(`Current balance: $${this.balance}`);
    }
}

//customer class
class customer{
    firstName:string;
    lastName:string;
    gender:string;
    age:number;
    mobileNumber: number;
    account: bankAccount;

    constructor(firstName:string, lastName:string, gender:string,age:number, mobileNumber:number, account:bankAccount)
    {
        this.firstName=firstName;
        this.lastName=lastName;
        this.gender=gender;
        this.age=age;
        this.mobileNumber=mobileNumber;
        this.account=account;
    }

}

// create bank accounts

const accounts: bankAccount[]=[
    new bankAccount (1001,500),
    new bankAccount (1002,1000),
    new bankAccount (1003,2000)

];
//create customers
const customers: customer[]=[
    new customer("Hamza","khan","male",35, 3161116664,accounts[0]),
    new customer("zubaida","khan","female",24, 3331116664,accounts[1]),
    new customer("areesha","khan","female",31, 3451116664,accounts[2])

]
//function to interact with bank Account
async function service(){
    do{
        const accountNumberInput= await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account Number:"

        })
        const customer=customers.find(customer => customer.account.accountNumber===accountNumberInput.accountNumber)
        if(customer){
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}!\n`);
            const ans= await inquirer.prompt([{
                name: "select",
                type:"list",
                message:"Select an operation",
                choices:["deposit","Withderaw","Check balance","Exit"]
                
                
            }]);
            switch(ans.select){
                case"Deposit":
                const deppositAmount=await inquirer.prompt({
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to deposit:"
                })
                customer.account.deposit(deppositAmount.amount)
                break;
                case"Withdraw":
                const WithdrawAmount=await inquirer.prompt({
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to deposit:"
                })
                customer.account.deposit(WithdrawAmount.amount);
                break;
                case"Check balance":
                customer.account.checkBalance();
                break;
                case"Exit":
                console.log("Exiting bank program...");
                console.log("\n Thank you for using our bank services")
                return;
            }
        }else{
            console.log("Invalid account number. plz try again");
        }

    }while(true)
}
service()



























// interface zbankAccount{
//     credit (amount:number): void;
//     debit (amount:number):void;
// }
// class bankAccount implements zbankAccount {
//     accountBalance : number;
//     constructer (accountBalance:number){
//         this.accountBalance=accountBalance
//     }
//     //publically credit
//     public credit (amount: number){
//         if (amount>0){
//             this.accountBalance+=amount
//             console.log("Credit successfully get into new account and your balance is :"+this.accountBalance);
//         }
//         else{
//             console.log("credit unsuccessful")
//         }
//     }
//     //publically debit
// public debit(amount: number) {
//     if (amount>0 && amount<this.accountBalance){
//         this.accountBalance-=amount
//         console.log("debit successfully share in new account balance:"+this.accountBalance)
//     }else{
//         console.log("debit unsuccessfuly")
//     }
// }
// }
// //customer details
// class customer {
//     person: {
//         firstName: string;
//         lastName: string;
//     }
    
//     age: number;
//     gender: string;
//     mobile_number: number;
//     bankAccount:bankAccount;
//     constructor(person:{firstName:string,lastName:string},age:number,gender:string,mobile_number:number,bankAccount:bankAccount)
//     //this property utilization
//     this.person=person;
//     this.age=age;
//     this.gender=gender;
//     this.mobile_number=mobile_number;
//     this.bankAccount=bankAccount;
// }
// //publically user access
// public display(){
//     console.log("Name:"+this.person.firstName+""+this.person.lastName)
//     console.log("age:" +this.age)
//     console.log("mobile_number:"+this.mobile_number)
//     console.log("Aount in bank:"this.bankAccount.accountBalance)
    
// }