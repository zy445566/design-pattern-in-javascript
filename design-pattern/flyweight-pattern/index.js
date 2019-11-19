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
