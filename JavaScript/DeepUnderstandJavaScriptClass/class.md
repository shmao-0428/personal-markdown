# es6`class`类的用法总结

- es6的class相当于es5的构造函数。也就是 person.proptotype.constructor === person为true。-

- 类必须用new关键字来调用，否则会报错。

- class不存在变量声明提升，使用之前必须先定义。

- es5中的prototype继续在es6的class中存在，在类中定义的方法，都存在与类的prototype对象上。比如上面的getName方法。在类中调用这些方法，就是调用的原型（prototype）上的方法。另外，**类中定义的方法都是不可枚举的**。

- 类中的属性名可以使用表达式。

   ```js
   var name = 'tom'; class person{ [name] { } };
   ```

- constructor方法是类的默认属性，默认返回实例对象。

- 实例的属性除非显式定义在其本身（即定义在`this`对象上），否则都是定义在原型上（即定 义在`class`上）。

- 类可以像函数一样使用表达式来定义。

   ```js
   const myClass = class {};
   ```

- 私有属性和私有方法，也就是只能在类内部访问的属性和方法；定义之前加‘#’号。

   ```js
   class person { 
       #x = 1; // 私有属性
       get X(){ 
           return this.#x
       } 
   }
   ```

-  实例属性和实例方法，也就是可以被实例继承的方法和属性。直接用等号定义。

-  类中使用getName(){}这种写法表示该属性存在于实例的原型上，而使用`getName = () => {} `箭头函数，表示该属性存在于实例本身（this）上, **this永远指向实例本身**。

- class内部调用new.target放回当前类。

- super关键字作为函数时用作继承. super作为对象时，在普通方法中，指向父类的**原型对象**；在静态方法中，指向**父类**。

-  父类的静态方法也可以被子类继承, 重写.

