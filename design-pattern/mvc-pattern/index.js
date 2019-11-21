/**
 * 模型，在业务中模式设计其实特别讲究
 * 在领域模型其实就细分了很多种类，比如：
 * 失血模型
 * 贫血模型
 * 充血模型
 * 胀血模型
 */
class Student {
    getRollNo() {
       return this.rollNo;
    }
    setRollNo(rollNo) {
       this.rollNo = rollNo;
    }
    getName() {
       return this.name;
    }
    setName(name) {
       this.name = name;
    }
}

class StudentView {
    printStudentDetails(studentName, studentRollNo){
       console.log("Student: ");
       console.log("Name: " + studentName);
       console.log("Roll No: " + studentRollNo);
    }
}

class StudentController {
    constructor(model, view){
       this.model = model;
       this.view = view;
    }
    setStudentName(name){
       this.model.setName(name);    
    }
    getStudentName(){
       return this.model.getName();  
    }
    setStudentRollNo(rollNo){
        this.model.setRollNo(rollNo);      
    }
    getStudentRollNo(){
       return this.model.getRollNo();     
    }
    updateView(){           
       view.printStudentDetails(this.model.getName(), this.model.getRollNo());
    }  
}

function retrieveStudentFromDatabase() {
    const student = new Student();
    student.setName("Robert");
    student.setRollNo("10");
    return student;
}

const model  = retrieveStudentFromDatabase();
//创建一个视图：把学生详细信息输出到控制台
const view = new StudentView();
const controller = new StudentController(model, view);
controller.updateView();
//更新模型数据
controller.setStudentName("John");
controller.updateView();