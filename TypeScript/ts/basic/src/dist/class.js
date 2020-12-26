var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/** 类 */
(function () {
    /** 抽象类 */
    var Father = /** @class */ (function () {
        function Father(age) {
            this.age = age;
        }
        return Father;
    }());
    /** 继承抽象类 并 实现接口结构 */
    var InterClass = /** @class */ (function (_super) {
        __extends(InterClass, _super);
        function InterClass(name, age) {
            var _this = _super.call(this, age) || this;
            _this.name = name;
            return _this;
        }
        InterClass.prototype.getName = function () { };
        /** 实现抽象方法 */
        InterClass.prototype.getAge = function () { };
        return InterClass;
    }(Father));
    var i = new InterClass('zd', 23);
    var MyClass = /** @class */ (function () {
        function MyClass(name, age, _gener, face) {
            this.age = age;
            this.name = name;
            this.age = age;
            this._gener = _gener;
            this.face = face;
        }
        Object.defineProperty(MyClass.prototype, "gener", {
            /** 私有属性除了通过方法暴露 还可以通过setter和getter暴露 */
            get: function () {
                return this._gener;
            },
            set: function (val) {
                this._gener = val;
            },
            enumerable: false,
            configurable: true
        });
        return MyClass;
    }());
    var Children = /** @class */ (function (_super) {
        __extends(Children, _super);
        function Children() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Children.prototype.getFace = function () {
            return this.face;
        };
        return Children;
    }(MyClass));
    var m = new MyClass('zs', 8, 'male', 'auto');
    // m.gener
    var c = new Children('ls', 10, 'female', 'big');
    // c.face
})();
