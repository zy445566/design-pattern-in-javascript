# 前端控制器模式（Front Controller Pattern）
即为所有的请求提供一个统一处理的方法，像现在网关层就是一个前端控制器模式组件实例，但今天主要讲代码实例。

# 前端控制器模式的实例
定义两个需要展示的页面
```js
class HomeView {
    show(){
       console.log("Displaying Home Page");
    }
}
class StudentView {
    show(){
       console.log("Displaying Student Page");
    }
}
```
定义展示器
```js
class Dispatcher {
    constructor() {
       this.studentView = new StudentView();
       this.homeView = new HomeView();
    }
    dispatch(request) {
        if(request.toUpperCase()=="STUDENT"){
            this.studentView.show();
        }else{
            this.homeView.show();
        }  
    }
}
```
定义前端控制器
```js
class FrontController {
   
    constructor(){
       this.dispatcher = new Dispatcher();
    }
  
    isAuthenticUser(){
       console.log("User is authenticated successfully.");
       return true;
    }
  
    trackRequest(request){
       console.log("Page requested: " + request);
    }
  
    dispatchRequest(request){
       //记录每一个请求
       this.trackRequest(request);
       //对用户进行身份验证
       if(this.isAuthenticUser()){
          this.dispatcher.dispatch(request);
       }  
    }
}
```
通过前端请求，就能对所有访问的接口，进行记录和鉴权。
```js

const frontController = new FrontController();
frontController.dispatchRequest("HOME");
frontController.dispatchRequest("STUDENT");
```
# 前端控制器模式
能够提供统一处理接口请求的常用的方案。