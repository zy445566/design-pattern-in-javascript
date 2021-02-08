# 建造者模式
让简单的对象通过组合的方式构造成多种复杂对象。
# 建造者模式的实例
这里举例西式快餐，里面有非常多的套餐种类，但是各种套餐都是由不同种类的冷饮和汉堡组合而成。同时冷饮需要瓶子装，汉堡需要纸盒包住，那么我们可以先定义冷饮和汉堡类和它们所需要的瓶子和纸盒。
```js
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
```
那么我们肯定不止一种冷饮和一种汉堡，比如汉堡有蔬菜汉堡和肌肉汉堡，冷饮有可乐和百事。那么我们需要不同的类型和对应的价格。
```js
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
```
那一个套餐肯定是有多个不同冷饮和汉堡，那么我们需要用一个数组作为储存不同冷饮和汉堡的条目，以下套餐就很容易打造好了。
```js
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
```
最后我们只要对外提供多个套餐就好了。这个叫它套餐建造者好了。
```js
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
```
最后我们只要用套餐建造者，给我们做出相应的套餐。
```js
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
```

# 建造者模式的优势
这是一种创建复杂对象的最佳实践。尤其是复杂对象多变的情况下，通过基础组件来组合，在基础组件变更时，多种依赖于基础组件的复杂组件也能方便变更，而不需要更改多种不同的复杂组件。

[上一页(单例模式)](../singleton-pattern/README.md)

[下一页(原型模式)](../prototype-pattern/README.md)