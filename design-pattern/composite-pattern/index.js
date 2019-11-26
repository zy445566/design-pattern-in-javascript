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