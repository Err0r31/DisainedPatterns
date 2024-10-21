class Duck {
    constructor (name, quackBehavior, flyBehavior) {
        this.name = name;
        this.quackBehavior = quackBehavior;
        this.flyBehavior = flyBehavior;
    }

    display() {
        console.log(this.name);
        this.quackBehavior.quack();
        this.flyBehavior.fly();
    }

    setFlyBehavior(flyBehavior) {
        this.flyBehavior = flyBehavior;
    }

    setQuackBehavior(quackBehavior) {
        this.quackBehavior = quackBehavior;
    }
}

class flyBehavior {
    fly() {
        throw new Error("Метод не реализован");
    }
}

class quackBehavior {
    quack() {
        throw new Error("Метод не реализован");
    }
}

class LoadQuack extends quackBehavior {
    quack() {
        console.log("Я крякаю громко");
    }
}

class RareQuack extends quackBehavior {
    quack() {
        console.log("Я крякаю редко");
    }
}

class SoftQuack extends quackBehavior {
    quack() {
        console.log("Я крякаю протяжно");
    }
}

class NoQuack extends quackBehavior {
    quack() {
        console.log("Я не крякаю");
    }
}

class FlyWithWings extends flyBehavior {
    fly() {
        console.log("Я летаю на крыльях", "\n");
    }
}

class FlyWithRocket extends flyBehavior {
    fly() {
        console.log("Я летаю на ракете", "\n");
    }
}

class FlyWithRemote extends flyBehavior {
    fly() {
        console.log("Я летаю на радиоуправлении", "\n");
    }
}

class NoFly extends flyBehavior {
    fly() {
        console.log("Я не умею летать", "\n");
    }
}

const saxonDuck = new Duck("Саксонская утка", new RareQuack(), new FlyWithWings);
const rubberDuck = new Duck("Резиновая утка", new NoQuack(), new NoFly());
const decoyDuck = new Duck("Утка-приманка", new LoadQuack(), new NoFly());
const redHeadDuck = new Duck("Красноголовая утка", new NoQuack(), new FlyWithWings());

console.log("Симуляция уток:");
saxonDuck.display();
rubberDuck.display();
decoyDuck.display(); 
redHeadDuck.display();

console.log("Изменение поведения:")
decoyDuck.setFlyBehavior(new FlyWithRemote());
decoyDuck.display();

redHeadDuck.setQuackBehavior(new SoftQuack());
redHeadDuck.display();
