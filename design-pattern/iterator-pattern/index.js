class NameRepository {
    constructor() {
        this.names = ["Robert" , "John" ,"Julie" , "Lora"];
    }
    getIterator() {
        const names = this.names;
        class NameIterator{
            constructor() {
                this.index = 0;
            }
            hasNext() {
                if(this.index < names.length){
                    return true;
                }
                return false;
            }
        
            next() {
                if(this.hasNext()){
                    return names[this.index++];
                }
                return null;
            }     
        }
       return new NameIterator();
    }
}

console.log("ES5 Iterator:");
const namesRepository = new NameRepository();
for(const iter = namesRepository.getIterator(); iter.hasNext();){
    const name = iter.next();
    console.log("Name : " + name);
}
/**
 * output:
 * ES5 Iterator:
 * Name : Robert
 * Name : John
 * Name : Julie
 * Name : Lora
 */

// 而在es6中可以这样使用
class NameRepositoryEs6 {
    constructor() {
        this.names = ["Robert" , "John" ,"Julie" , "Lora"];
        this.index = 0;
    }
    [Symbol.iterator]() {
        return {
            next:  () => {
                let done = true;
                if(this.index < this.names.length){
                    done = false;
                }
                return {value: this.names[this.index++],done};
            }
          };
    }
}
console.log("\nES6 Iterator:");
const namesRepositoryEs6 = new NameRepositoryEs6()
for(const name of namesRepositoryEs6) {
    console.log("Name : " + name);
}
/**
 * output:
 * ES6 Iterator:
 * Name : Robert
 * Name : John
 * Name : Julie
 * Name : Lora
 */