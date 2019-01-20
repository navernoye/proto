// Задача №1
// Перепишите в виде класса 
// Есть класс CoffeeMachine, заданный в функциональном стиле. 
// Задача: переписать CoffeeMachine в виде класса с использованием прототипа. 
// Исходный код: 

// function CoffeeMachine(power) { 
//     var waterAmount = 0; 
//     var WATER_HEAT_CAPACITY = 4200; 

//     function getTimeToBoil() { 
//         return waterAmount * WATER_HEAT_CAPACITY * 80 / power; 
//     } 

//     this.run = function() { 
//         setTimeout(function() { 
//             console.log( 'Кофе готов!' ); 
//     }, getTimeToBoil()); 
//     }; 

//     this.setWaterAmount = function(amount) { 
//         waterAmount = amount; 
//     }; 
// }
 
function CoffeeMachine(power) { 
    this._waterAmount = 0; 
    this._WATER_HEAT_CAPACITY = 4200;
    this._power = power;
}

    CoffeeMachine.prototype.getTimeToBoil = function() { 
        return this._waterAmount * this._WATER_HEAT_CAPACITY * 80 / this._power; 
    } 

    CoffeeMachine.prototype.run = function() { 
        setTimeout(function() { 
            console.log( 'Кофе готов!' ); 
    }, this.getTimeToBoil()); 
    }; 

    CoffeeMachine.prototype.setWaterAmount = function(amount) { 
        this._waterAmount = amount; 
    }; 
 
var coffeeMachine = new CoffeeMachine(10000); 
coffeeMachine.setWaterAmount(50); 
coffeeMachine.run(); 
// P.S. При описании через прототипы локальные переменные недоступны методам, поэтому нужно будет переделать их в защищённые свойства.

// Задача №2
// Хомяки с __proto__ 
// Вы – руководитель команды, которая разрабатывает игру, хомяковую ферму. Один из программистов получил задание создать класс «хомяк» (англ – "Hamster"). 
// Объекты-хомяки должны иметь массив food для хранения еды и метод found для добавления. 
// Ниже – его решение. При создании двух хомяков, если поел один – почему-то сытым становится и второй тоже. 
// В чём дело? Как поправить? 

function Hamster() {
    this._food = []; 
} 

// Hamster.prototype.food = []; // пустой "живот" 

Hamster.prototype.found = function(something) { 
    this._food.push(something); 
}; 

// Создаём двух хомяков и кормим первого 
var speedy = new Hamster(); 
var lazy = new Hamster(); 

speedy.found("яблоко"); 
speedy.found("орех"); 

console.log( speedy._food.length ); // 2 
console.log( lazy._food.length ); // 2 (!??)

// Задача №3
// Добавить функциям defer с аргументами 
// Добавьте всем функциям в прототип метод defer(ms), который возвращает обёртку, откладывающую вызов функции на ms миллисекунд. 

// Например, должно работать так: 

function f(a, b) { 
console.log( a + b ); 
} 
function fun(a, b, c) { 
    console.log( a + b + c ); 
    }

Function.prototype.defer = function(ms){
    var res = this;
    return function(){
        var a = this;
        var b = arguments;
        setTimeout(function(){
            res.apply(a, b);
        }, ms);
    }
};

f.defer(1000)(1, 2); // выведет 3 через 1 секунду. 
fun.defer(2000)(1, 2, 3);
// То есть, должны корректно передаваться аргументы.

// Задача №4
//  Добавить функциям defer 
// Добавьте всем функциям в прототип метод defer(ms), который откладывает вызов функции на ms миллисекунд. 
// После этого должен работать такой код: 

function f() { 
console.log( "привет" ); 
} 

function fun() { 
    console.log( "пока" ); 
    }

Function.prototype.defer = function(ms){
    setTimeout(this, ms);
}

f.defer(1000); // выведет "привет" через 1 секунду
fun.defer(3000);