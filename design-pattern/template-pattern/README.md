# 模板模式（Template Pattern）
当一个类型公开了它的执行方式，其它类型只需按需实现的的时候可以使用这个模式。

# 模板模式的实例
实现游戏的基类，同时它的执行方式play不允许被子类修改。
```js
class Game {
   constructor() {
      if(this.play!= Game.prototype.play) {
         throw new Error("play mothed is final,can't be modify!");
      }
   }
   initialize(){};
   startPlay(){};
   endPlay(){};
  
   play(){
       //初始化游戏
       this.initialize();
       //开始游戏
       this.startPlay();
       //结束游戏
       this.endPlay();
   }
}
```
子类只需要通过基类流程中的方法即可
```js
class Cricket extends Game {
    endPlay() {
       console.log("Cricket Game Finished!");
    }
    initialize() {
       console.log("Cricket Game Initialized! Start playing.");
    }
    startPlay() {
       console.log("Cricket Game Started. Enjoy the game!");
    }
}

class Football extends Game {
    endPlay() {
       console.log("Football Game Finished!");
    }
    initialize() {
       console.log("Football Game Initialized! Start playing.");
    }
    startPlay() {
       console.log("Football Game Started. Enjoy the game!");
    }
}
```
最终都是通过play进行运行
```js
let game = new Cricket();
game.play();
console.log('');
game = new Football();
game.play();    
/**
 * output:
 * Cricket Game Initialized! Start playing.
 * Cricket Game Started. Enjoy the game!
 * Cricket Game Finished!
 * 
 * Football Game Initialized! Start playing.
 * Football Game Started. Enjoy the game!
 * Football Game Finished!
 */  
```
# 模板模式的优势
只需要关注自己功能的实现，而不需要着眼整个流程。

[上一页(策略模式)](../strategy-pattern/README.md)

[下一页(访问者模式)](../visitor-pattern/README.md)