# 组合模式(Composite Pattern)
以结构化的方式，是单一对象具有树形结构，让单一对象更具有结构性。

# 组合模式的实例
在雇员和雇员之间都是存在上下级关系，如何用代码更直观的表达和关系与关系的操作，这是一个棘手的问题。

但通过组合模式，将关系表达为树状结构将更方便更直观的表达，如下。
```js
class Employee {
    constructor(name, dept, sal) {
       this.name = name;
       this.dept = dept;
       this.salary = sal;
       this.subordinates = [];
    }
    add(employee) {
       this.subordinates.push(employee);
    }
    remove(employee) {
        this.subordinates.splice(this.subordinates.indexOf(employee),1);
    }
    getSubordinates(){
      return this.subordinates;
    }
    toString(){
       return ("Employee :[ Name : "+ this.name
       +", dept : "+ this.dept + ", salary :"
       + this.salary+" ]");
    }  
}
```
所以当我们添加雇员和关系的时候将更加方便的添加，而且对于一个雇员，它只需要关心和下属的关系维护，而不需要关心上级和一些间接的关系。这样会更加清晰和维护更加方便。
```js
const CEO = new Employee("John","CEO", 30000);

const headSales = new Employee("Robert","Head Sales", 20000);

const headMarketing = new Employee("Michel","Head Marketing", 20000);

const clerk1 = new Employee("Laura","Marketing", 10000);
const clerk2 = new Employee("Bob","Marketing", 10000);

const salesExecutive1 = new Employee("Richard","Sales", 10000);
const salesExecutive2 = new Employee("Rob","Sales", 10000);

CEO.add(headSales);
CEO.add(headMarketing);

headSales.add(salesExecutive1);
headSales.add(salesExecutive2);

headMarketing.add(clerk1);
headMarketing.add(clerk2);
```
那么我们打印来说也只要打印最高级别的上级就能实现全部打印。
```js
function printAllEmployee(employee) {
for (const subEmployee of employee.getSubordinates()) {
    console.log(subEmployee.toString());
    if(subEmployee.getSubordinates().length>0) {
        printAllEmployee(subEmployee)
    }
    }
}
//打印该组织的所有员工
console.log(CEO.toString());
printAllEmployee(CEO) 
/**
 * output:
 * Employee :[ Name : John, dept : CEO, salary :30000 ]
 * Employee :[ Name : Robert, dept : Head Sales, salary :20000 ]
 * Employee :[ Name : Richard, dept : Sales, salary :10000 ]
 * Employee :[ Name : Rob, dept : Sales, salary :10000 ]
 * Employee :[ Name : Michel, dept : Head Marketing, salary :20000 ]
 * Employee :[ Name : Laura, dept : Marketing, salary :10000 ]
 * Employee :[ Name : Bob, dept : Marketing, salary :10000 ]
 */
```
# 组合模式的优势
让相互关联的对象产生了结构性，无论是在关系修改或者是关系直观性上，都只需要关心当前下级的关系，那么这样能更好的降低关系和关系之间的复杂度，加强单对象关系结构的可维护性。

[上一页(过滤器模式)](../filter-pattern/README.md)

[下一页(装饰器模式)](../decorator-pattern/README.md)