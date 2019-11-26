class Circle {
    constructor(color){
       this.color = color;    
    }
    setX(x) {
       this.x = x;
    }
    setY(y) {
       this.y = y;
    }
    setRadius(radius) {
       this.radius = radius;
    }
    draw() {
       console.log("Circle: Draw() [Color : " + this.color
          +", x : " + this.x +", y :" + this.y +", radius :" + this.radius);
    }
}

 class ShapeFactory {
    static getCircle(color) {
       let circle = ShapeFactory.circleMap.get(color);
       if(circle == null) {
          circle = new Circle(color);
          ShapeFactory.circleMap.set(color, circle);
          console.log("Creating circle of color : " + color);
       }
       return circle;
    }
}
ShapeFactory.circleMap = new Map();


const colors =["Red", "Green", "Blue", "White", "Black" ];
for(let i=0; i < 20; ++i) {
    const circle = ShapeFactory.getCircle(
        colors[Math.floor(Math.random()*colors.length)]
    );
    circle.setX(Math.floor(Math.random()*100));
    circle.setY(Math.floor(Math.random()*100));
    circle.setRadius(100);
    circle.draw();
}
/**
 * output:
 * Creating circle of color : Red
 * Circle: Draw() [Color : Red, x : 44, y :20, radius :100
 * Creating circle of color : Green
 * Circle: Draw() [Color : Green, x : 84, y :4, radius :100
 * Circle: Draw() [Color : Green, x : 98, y :64, radius :100
 * Creating circle of color : Blue
 * Circle: Draw() [Color : Blue, x : 97, y :31, radius :100
 * Circle: Draw() [Color : Red, x : 37, y :5, radius :100
 * Creating circle of color : Black
 * Circle: Draw() [Color : Black, x : 5, y :51, radius :100
 * Circle: Draw() [Color : Black, x : 49, y :36, radius :100
 * Circle: Draw() [Color : Blue, x : 27, y :69, radius :100
 * Circle: Draw() [Color : Red, x : 82, y :99, radius :100
 * Circle: Draw() [Color : Blue, x : 79, y :1, radius :100
 * Creating circle of color : White
 * Circle: Draw() [Color : White, x : 19, y :23, radius :100
 * Circle: Draw() [Color : White, x : 27, y :36, radius :100
 * Circle: Draw() [Color : Blue, x : 71, y :90, radius :100
 * Circle: Draw() [Color : Green, x : 80, y :66, radius :100
 * Circle: Draw() [Color : Black, x : 94, y :49, radius :100
 * Circle: Draw() [Color : Red, x : 49, y :90, radius :100
 * Circle: Draw() [Color : Black, x : 33, y :86, radius :100
 * Circle: Draw() [Color : Blue, x : 52, y :97, radius :100
 * Circle: Draw() [Color : White, x : 0, y :42, radius :100
 * Circle: Draw() [Color : Blue, x : 29, y :42, radius :100
 */