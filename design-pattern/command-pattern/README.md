# 命令模式（Command Pattern）
顾名思义，这是一种接受命令再统一执行的模式。
# 命令模式的实例
比如在股票的买卖中可以买和卖，但是这是一个执行就实施的操作，不利于挂单。
```js
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
```
那么我们可以先定义单一行为，比如买或卖,同时只有使用了execute才真正执行。
```js
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
```
那么我们可以使用一个列表orderList来接受挂单了，使用takeOrder提交挂单，同时到达交易时间，我们再使用placeOrders来进行交易处理。
```js
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
```
那么我们在使用的时候就更加直观和更加参数化了。
```js
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
```

# 命令模式优势
由于命令模式是最终执行，所以中途可以发出很多不同的命令，能解决一些比如预约的问题。就比如上面的例子，股票可以提前下单，但是未必能最终生效。同时可以让代码展现更加直观和参数化。

[上一页(责任链模式)](../chain-of-responsibility-pattern/README.md)

[下一页(解释器模式)](../interpreter-pattern/README.md)