class Stock {
    constructor() {
        this.name = "ABC";
        this.quantity = 10;
    }
    buy(){
       console.log("Stock [ Name: " + this.name + 
       ",Quantity: " + this.quantity +" ] bought");
    }
    sell(){
        console.log("Stock [ Name: " + this.name + 
       ",Quantity: " + this.quantity +" ] sold");
    }
 }

 class BuyStock {
    constructor(abcStock){
       this.abcStock = abcStock;
    }
    execute() {
        this.abcStock.buy();
    }
}
class SellStock{
    constructor(abcStock){
        this.abcStock = abcStock;
    }
    execute() {
        this.abcStock.sell();
    }
}

class Broker {
    constructor() {
        this.orderList = [];
    }
 
    takeOrder(order){
       this.orderList.push(order);      
    }
 
    placeOrders(){
       for (const order of this.orderList) {
          order.execute();
       }
       this.orderList = [];
    }
}

const abcStock = new Stock();

const buyStockOrder = new BuyStock(abcStock);
const sellStockOrder = new SellStock(abcStock);

const broker = new Broker();
broker.takeOrder(buyStockOrder);
broker.takeOrder(buyStockOrder);
broker.takeOrder(buyStockOrder);
broker.takeOrder(sellStockOrder);
broker.takeOrder(sellStockOrder);

broker.placeOrders();
/** 
 * output:
 * Stock [ Name: ABC,Quantity: 10 ] bought
 * Stock [ Name: ABC,Quantity: 10 ] bought
 * Stock [ Name: ABC,Quantity: 10 ] bought
 * Stock [ Name: ABC,Quantity: 10 ] sold
 * Stock [ Name: ABC,Quantity: 10 ] sold
 */