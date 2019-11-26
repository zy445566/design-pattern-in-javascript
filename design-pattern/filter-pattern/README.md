# 过滤器模式(Filter Pattern)
通过多个单一的功能筛选构建出一个复杂的筛选功能。

# 过滤器模式的实例
首先定义一个对象，我们后续可以通过名字(name)，性别(gender)，婚姻状况(maritalStatus)
```js
// 定义对象
class Person {
    constructor(name, gender, maritalStatus){
       this.name = name;
       this.gender = gender;
       this.maritalStatus = maritalStatus;    
    }
    getName() {
       return this.name;
    }
    getGender() {
       return this.gender;
    }
    getMaritalStatus() {
       return this.maritalStatus;
    }  
}
```
定义一些单一功能的筛选条件，比如啊判断是男，是女，是不是单身。
```js
// 添加筛选条件
class CriteriaMale {
    meetCriteria(persons) {
       const malePersons = [];
       for (const person of persons) {
          if(person.getGender().toUpperCase() == "MALE"){
             malePersons.push(person);
          }
       }
       return malePersons;
    }
}

class CriteriaFemale {
    meetCriteria(persons) {
       const femalePersons = [];
       for (const person of persons) {
          if(person.getGender().toUpperCase() == "FEMALE"){
             femalePersons.push(person);
          }
       }
       return femalePersons;
    }
}

class CriteriaSingle {
    meetCriteria(persons) {
       const singlePersons = [];
       for (const person of persons) {
          if(person.getMaritalStatus().toUpperCase() == "SINGLE"){
             singlePersons.push(person);
          }
       }
       return singlePersons;
    }
}
```
将单一功能增加对应的操作符，使单一功能筛选条件能通过组合来实现复杂的筛选。
```js
// 添加筛选操作符
class AndCriteria {
    constructor(criteria, otherCriteria) {
       this.criteria = criteria;
       this.otherCriteria = otherCriteria;
    }
    meetCriteria(persons) {
       const firstCriteriaPersons = this.criteria.meetCriteria(persons);
       return this.otherCriteria.meetCriteria(firstCriteriaPersons);
    }
 }

 class OrCriteria{
    constructor(criteria, otherCriteria) {
       this.criteria = criteria;
       this.otherCriteria = otherCriteria;
    }
 
    meetCriteria(persons) {
       const firstCriteriaItems = this.criteria.meetCriteria(persons);
       const otherCriteriaItems = this.otherCriteria.meetCriteria(persons);
       for (const person of otherCriteriaItems) {
          if(firstCriteriaItems.indexOf(person)==-1){
            firstCriteriaItems.push(person);
          }
       }
       return firstCriteriaItems;
    }
 }
```
使用单一筛选条件或是组合单一筛选条件来筛选，达到复杂筛选目的
```js
function printPersons(persons){
    for (const  person of persons) {
       console.log(person);
    }
}

const persons = [];
persons.push(new Person("Robert","Male", "Single"));
persons.push(new Person("John","Male", "Married"));
persons.push(new Person("Laura","Female", "Married"));
persons.push(new Person("Diana","Female", "Single"));
persons.push(new Person("Mike","Male", "Single"));
persons.push(new Person("Bobby","Male", "Single"));

const male = new CriteriaMale();
const female = new CriteriaFemale();
const single = new CriteriaSingle();
const singleMale = new AndCriteria(single, male);
const singleOrFemale = new OrCriteria(single, female);

console.log("Males: ");
printPersons(male.meetCriteria(persons));

console.log("\nFemales: ");
printPersons(female.meetCriteria(persons));

console.log("\nSingle Males: ");
printPersons(singleMale.meetCriteria(persons));

console.log("\nSingle Or Females: ");
printPersons(singleOrFemale.meetCriteria(persons));
/**
 * output:
 * Males: 
 * Person { name: 'Robert', gender: 'Male', maritalStatus: 'Single' }
 * Person { name: 'John', gender: 'Male', maritalStatus: 'Married' }
 * Person { name: 'Mike', gender: 'Male', maritalStatus: 'Single' }
 * Person { name: 'Bobby', gender: 'Male', maritalStatus: 'Single' }
 * 
 * Females: 
 * Person { name: 'Laura', gender: 'Female', maritalStatus: 'Married' }
 * Person { name: 'Diana', gender: 'Female', maritalStatus: 'Single' }
 * 
 * Single Males: 
 * Person { name: 'Robert', gender: 'Male', maritalStatus: 'Single' }
 * Person { name: 'Mike', gender: 'Male', maritalStatus: 'Single' }
 * Person { name: 'Bobby', gender: 'Male', maritalStatus: 'Single' }
 * 
 * Single Or Females: 
 * Person { name: 'Robert', gender: 'Male', maritalStatus: 'Single' }
 * Person { name: 'Diana', gender: 'Female', maritalStatus: 'Single' }
 * Person { name: 'Mike', gender: 'Male', maritalStatus: 'Single' }
 * Person { name: 'Bobby', gender: 'Male', maritalStatus: 'Single' }
 * Person { name: 'Laura', gender: 'Female', maritalStatus: 'Married' }
 */
```
# 过滤器模式优势
在需要做类的筛选的时候，通过每次单一功能的筛选，再做聚合能极大的降低筛选功能的复杂性。

[上一页(桥接模式)](../bridge-pattern/README.md)

[下一页(组合模式)](../composite-pattern/README.md)