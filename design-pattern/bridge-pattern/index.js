class RedCircle {
    drawCircle(radius, x, y) {
       console.log("Drawing Circle[ color: red, radius: "
          + radius +", x: " +x+", "+ y +"]");
    }
}
class GreenCircle {
    drawCircle(radius, x, y) {
       console.log("Drawing Circle[ color: green, radius: "
          + radius +", x: " +x+", "+ y +"]");
    }
}

class Shape {
    constructor(drawAPI) {
        if(new.target == Shape) {
            throw new Error('this class must be extends.')
        }
        this.drawAPI = drawAPI;
    }
    draw() {}
}

class Circle extends Shape {
    constructor(x, y, radius, drawAPI) {
       super(drawAPI);
       this.x = x;  
       this.y = y;  
       this.radius = radius;
    }
    draw() {
        this.drawAPI.drawCircle(this.radius, this.x, this.y);
    }
}

const redCircle = new Circle(100,100, 10, new RedCircle());
const greenCircle = new Circle(100,100, 10, new GreenCircle());

redCircle.draw();
greenCircle.draw();
/**
 * output:
 * Drawing Circle[ color: red, radius: 10, x: 100, 100]
 * Drawing Circle[ color: green, radius: 10, x: 100, 100]
 */