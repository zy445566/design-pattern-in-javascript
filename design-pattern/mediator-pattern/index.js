class Middleman {
    constructor(tenant, landlord) {
        this.tenant = tenant;
        this.landlord = landlord;
    }
    sendLandlord(money){
       this.tenant.money-=money;
       this.landlord.money+=money;
       console.log(`Now: ${this.tenant.name} have $${this.tenant.money}`
       +`,${this.landlord.name} have $${this.landlord.money}`);
    }
    sendTenant(money){
        this.landlord.money-=money;
        this.tenant.money+=money;
        console.log(`Now: ${this.tenant.name} have $${this.tenant.money}`
       +`,${this.landlord.name} have $${this.landlord.money}`);
    }
}

class Person {
    constructor(name, money){
        if(new.target == Person) {
            throw new Error('this class must be extends.')
        }
        this.name  = name;
        this.money  = money;
        console.log(`${name} have $${money}`);
    }
}

// 租客
class Tenant extends Person{
    constructor(name, money) {
        super(name, money);
    }
    payDeposit(money,middleman) {
        console.log(`${this.name} pay $${money} deposit`);
        middleman.sendLandlord(money);
    }
    payRent(money,middleman) {
        console.log(`${this.name} pay $${money} for rent`);
        middleman.sendLandlord(money);
    }
}

// 房东
class Landlord extends Person{
    constructor(name, money) {
        super(name, money)
    }
    refundDeposit(money,middleman) {
        console.log(`${this.name} refund $${money} deposit`);
        middleman.sendTenant(money)
    }
}

const tenant = new Tenant('Jack',1000);
const landlord = new Landlord('Zero',0);
const middleman = new Middleman(tenant, landlord);
tenant.payDeposit(300, middleman);
tenant.payRent(100, middleman);
tenant.payRent(100, middleman);
tenant.payRent(100, middleman);
landlord.refundDeposit(200, middleman);