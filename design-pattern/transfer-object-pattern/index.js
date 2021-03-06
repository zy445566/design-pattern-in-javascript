class StudentVO {
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

class StudentBO{
    constructor(){
        //列表是当作一个数据库
        this.students = [];
        this.students.getIndexByRollNo = (rollNo)=>{
            return this.students.findIndex(
                (val)=>val.getRollNo() == rollNo
            );
        }
        const student1 = new StudentVO("Robert",0);
        const student2 = new StudentVO("John",1);
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

const studentBusinessObject = new StudentBO();
 
//输出所有的学生
for (const student of studentBusinessObject.getAllStudents()) {
    console.log("Student: [RollNo : "
    +student.getRollNo()+", Name : "+student.getName()+" ]");
}

//更新学生
const student =studentBusinessObject.getAllStudents()[
    studentBusinessObject.getAllStudents().getIndexByRollNo(0)
];
student.setName("Michael");
studentBusinessObject.updateStudent(student);

//获取学生
studentBusinessObject.getStudent(0);
console.log("Student: [RollNo : "
+student.getRollNo()+", Name : "+student.getName()+" ]");