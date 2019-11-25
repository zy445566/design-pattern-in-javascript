# 数据访问对象模式（Data Access Object Pattern）
即不直接通过数据对象，而是抽象成Dao层来做这个事情。

# 数据访问对象模式的实例
定义数据模型
```js
class Student {
    constructor(name, rollNo){
       this.name = name;
       this.rollNo = rollNo;
    }
  
    getName() {
       return this.name;
    }
  
    setName(name) {
       this.name = name;
    }
  
    getRollNo() {
       return this.rollNo;
    }
  
    setRollNo(rollNo) {
       this.rollNo = rollNo;
    }
}
```
Dao层的实现
```js
class StudentDao{
    constructor(){
        this.students = [];
        this.students.getIndexByRollNo = (rollNo)=>{
            return this.students.findIndex(
                (val)=>val.getRollNo() == rollNo
            );
        }
        const student1 = new Student("Robert",0);
        const student2 = new Student("John",1);
        this.students.push(student1);
        this.students.push(student2);    
    }
    deleteStudent(student) {
        this.students.splice(student.getIndexByRollNo(student.getRollNo() ),1);
       console.log("Student: Roll No " + student.getRollNo() 
          +", deleted from database");
    }
    //从数据库中检索学生名单
    getAllStudents() {
       return this.students;
    }
    getStudent(rollNo) {
       return this.students[this.students.getIndexByRollNo(rollNo)];
    }
  
    updateStudent(student) {
        this.students[this.students.getIndexByRollNo(student.getRollNo())].setName(student.getName());
       console.log("Student: Roll No " + student.getRollNo() 
          +", updated in the database");
    }
}
```
使用Dao操作数据
```js
const studentDao = new StudentDao();

//输出所有的学生
for (let student of studentDao.getAllStudents()) {
    console.log("Student: [RollNo : "
    +student.getRollNo()+", Name : "+student.getName()+" ]");
}


//更新学生
const student =studentDao.getAllStudents()[studentDao.getAllStudents().getIndexByRollNo(0)];
student.setName("Michael");
studentDao.updateStudent(student);

//获取学生
studentDao.getStudent(0);
console.log("Student: [RollNo : "
    +student.getRollNo()+", Name : "+student.getName()+" ]");     
```

# 数据访问对象模式的优势
数据层和操作层分离，结构清晰，层级稳定。这看起来像是一种失血模型。