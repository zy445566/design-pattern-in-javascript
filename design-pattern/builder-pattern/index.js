// 纸盒
class Wrapper {
    pack() {
        return "Wrapper";
    }
}
// 瓶子
class Bottle {
    pack() {
        return "Bottle";
    }
}
// 汉堡需要纸盒包住
class Burger {
    packing() {
        return new Wrapper();
    }
}
// 冷饮需要瓶子装
class ColdDrink {
    packing() {
        return new Bottle();
    }
}
// 蔬菜汉堡
class VegBurger extends Burger {
    price() {
        return 25.0;
    }
    name() {
        return "Veg Burger";
    }
}
// 肌肉汉堡
class ChickenBurger extends Burger {
    price() {
        return 50.5;
    }
    name() {
        return "Chicken Burger";
    }
}
// 可乐
class Coke extends ColdDrink {
    price() {
       return 30.0;
    }
    name() {
       return "Coke";
    }
}
// 百事
class Pepsi extends ColdDrink {
    price() {
       return 35.0;
    }
    name() {
       return "Pepsi";
    }
}

class Meal {
    constructor () {
        const items = [];
        /**
         * 为什么不用Proxy而使用defineProperty
         * 因为Proxy虽然实现和defineProperty类似的功能
         * 但是在这个场景下，语意上是定义属性，而不是需要代理
         */
        Reflect.defineProperty(this, 'items', {
            get:()=>{
                if(this.__proto__ != Meal.prototype) {
                    throw new Error('items is private!');
                }
                return items;
            }
        })
        
    }
    addItem(item){
        this.items.push(item);
    }
 
    getCost(){
       let cost = 0.0;
       for (const item of this.items) {
          cost += item.price();
       }        
       return cost;
    }
 
    showItems(){
       for (const item of this.items) {
          const  nameStr = "Item : "+item.name();
          const  packStr = "Packing : "+item.packing().pack();
          const  priceStr = "Price : "+item.price();
          console.log(`${nameStr},${packStr},${priceStr}`);
       }        
    }   
 }
class MealBuilder {
    prepareVegMeal (){
       const meal = new Meal();
       meal.addItem(new VegBurger());
       meal.addItem(new Coke());
       return meal;
    }
    prepareNonVegMeal (){
        const meal = new Meal();
       meal.addItem(new ChickenBurger());
       meal.addItem(new Pepsi());
       return meal;
    }
}

const mealBuilder = new MealBuilder();
const vegMeal = mealBuilder.prepareVegMeal();
console.log("Veg Meal");
vegMeal.showItems();
console.log("Total Cost: " +vegMeal.getCost());

const nonVegMeal = mealBuilder.prepareNonVegMeal();
console.log("\nNon-Veg Meal");
nonVegMeal.showItems();
console.log("Total Cost: " +nonVegMeal.getCost());
/**
 * output:
 * Veg Meal
 * Item : Veg Burger,Packing : Wrapper,Price : 25
 * Item : Coke,Packing : Bottle,Price : 30
 * Total Cost: 55
 * 
 * Non-Veg Meal
 * Item : Chicken Burger,Packing : Wrapper,Price : 50.5
 * Item : Pepsi,Packing : Bottle,Price : 35
 * Total Cost: 85.5
 */