class Wrapper {
    pack() {
        return "Wrapper";
    }
}
class Bottle {
    pack() {
        return "Bottle";
    }
}
class Burger {
    packing() {
        return new Wrapper();
    }
}
class ColdDrink {
    packing() {
        return new Bottle();
    }
}
class VegBurger extends Burger {
    price() {
        return 25.0;
    }
    name() {
        return "Veg Burger";
    }
}
class ChickenBurger extends Burger {
    price() {
        return 50.5;
    }
    name() {
        return "Chicken Burger";
    }
}
class Coke extends ColdDrink {
    price() {
       return 30.0;
    }
    name() {
       return "Coke";
    }
}

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
        this.itemsName = Symbol('items');
        this[this.itemsName] = [];
    }
    addItem(item){
        this[this.itemsName].push(item);
    }
 
    getCost(){
       let cost = 0.0;
       for (const item of this[this.itemsName]) {
          cost += item.price();
       }        
       return cost;
    }
 
    showItems(){
       for (const item of this[this.itemsName]) {
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