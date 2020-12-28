/** 类 */
(function () {
    /** 描述一个对象的类型 */
    type MyType = {
        name: string,
        age: number,
        [propName: string]: any
    }
    /** 接口 可以约束类的结构 定义类中应该有哪些属性和方法
     * 同时也可以作为类型声明去使用
     * 接口可以重复声明, 并与之前定义的接口`合并`
     */
    interface Inter {
        name: string;
        getName(): void;
    }
    interface Inter {
        gender?: string
    }

    /** 抽象类 */
    abstract class Father {
        age: number;
        constructor(age: number) {
            this.age = age;
        }
        /** 抽象方法 并且没有函数体 只能定义在抽象类中 并且子类必须对抽象方法设置实现 */
        abstract getAge(): void
        getGender() {}
    }

    /** 继承抽象类 并 实现接口结构 */
    class InterClass extends Father implements Inter {
        name: string;
        constructor(name: string, age: number) {
            super(age);
            this.name = name;
        }
        getName() { }
        /** 实现抽象方法 */
        getAge() { }
    }

    const i = new InterClass('zd', 23);

    class MyClass {
        public name: string;
        /** 私有属性 只能在当前类的内部使用 可以通过函数暴露或者getter,setter暴露 */
        private _gener: string
        /** 受保护的属性 只能在在当前类和子类中使用 */
        protected face: string;

        constructor(name: string, public age: number, _gener: string, face: string) {
            this.name = name;
            this.age = age;
            this._gener = _gener;
            this.face = face;
        }
        /** 私有属性除了通过方法暴露 还可以通过setter和getter暴露 */
        get gener() {
            return this._gener;
        }
        set gener(val: string) {
            this._gener = val;
        }
    }

    class Children extends MyClass {
        getFace() {
            return this.face;
        }
    }

    const m = new MyClass('zs', 8, 'male', 'auto');
    // m.gener

    const c = new Children('ls', 10, 'female', 'big');
    // c.face
})()