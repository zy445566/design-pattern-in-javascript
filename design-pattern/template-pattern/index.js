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