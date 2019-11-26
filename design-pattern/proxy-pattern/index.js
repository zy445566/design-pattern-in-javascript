class RealImage {
    constructor(fileName){
        this.fileName = fileName;
        this.loadFromDisk(fileName);
    }
    display() {
        console.log("Displaying " + this.fileName);
    }
    loadFromDisk(fileName){
        console.log("Loading " + fileName);
    }
}

class ProxyImage {
    constructor(fileName){
       this.fileName = fileName;
    }
    display() {
       if(this.realImage == null){
          this.realImage = new RealImage(this.fileName);
       }
       this.realImage.display();
    }
}

const image = new ProxyImage("test_10mb.jpg");

console.log('not use es6 Proxy:')
// 图像将从磁盘加载
image.display();
console.log('')
// 图像不需要从磁盘加载
image.display();
/**
 * output:
 * not use es6 Proxy:
 * Loading test_10mb.jpg
 * Displaying test_10mb.jpg
 * 
 * Displaying test_10mb.jpg
 */

// 其实上面的代码可以直接用es6代替
const ProxyImageEs6 = new Proxy(RealImage,{
    construct: function(target, args) {
        let imageObj = {};
        imageObj.__proto__ = target.prototype;
        imageObj.fileName = args[0];
        return new Proxy(imageObj,{
            get: function (target, key, receiver) {
                if(key=='display') {
                    return ()=>{
                        if(this.realImage == null){
                            this.realImage = new RealImage(target.fileName);
                        }
                        this.realImage.display();
                    };
                }
                return Reflect.get(target, key, receiver);
            },
        });
    }
})
console.log('\n\nuse es6 Proxy:')
const imageEs6 = new ProxyImageEs6("test_10mb.jpg");
// 图像将从磁盘加载
imageEs6.display();
console.log('')
// 图像不需要从磁盘加载
imageEs6.display();
/**
 * output:
 * use es6 Proxy:
 * Loading test_10mb.jpg
 * Displaying test_10mb.jpg
 * 
 * Displaying test_10mb.jpg
 */