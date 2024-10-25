class Beverage {
    constructor() {
        this.description = '';
        this.milk = 0;
        this.soy = 0;
        this.mocha = 0;
        this.whip = 0;
    }

    getDescription() { return this.description; }

    cost() { throw new Error("Этот метод должен быть переопределен"); }

    addMilk() { this.milk++; }
    addSoy() { this.soy++; }
    addMocha() { this.mocha++; }
    addWhip() { this.whip++; }

    getMilkDescription() { return this.milk > 0 ? ", Milk" : ""; }
    getSoyDescription() { return this.soy > 0 ? ", Soy" : ""; }
    getMochaDescription() { return this.mocha > 0 ? ", Mocha" : ""; }
    getWhipDescription() { return this.whip > 0 ? ", Whip" : ""; }

    getMilkCost() { return 0.40 * this.milk }
    getSoyCost() { return 0.30 * this.soy }
    getMochaCost() { return 0.20 * this.mocha }
    getWhipCost() { return 0.10 * this.whip }
}

class Espresso extends Beverage {
    constructor() {
        super();
        this.description = 'Espresso';
    }

    cost() {
        return 1.99;
    }
}

class DarkRoast extends Beverage {
    constructor() {
        super();
        this.description = 'DarkRoast';
    }

    cost() {
        return 0.99;
    }
}

class Decaf extends Beverage {
    constructor() {
        super();
        this.description = 'Decaf';
    }

    cost() {
        return 1.05;
    }
}

class HouseBlend extends Beverage {
    constructor() {
        super();
        this.description = 'HouseBlend';
    }

    cost() {
        return 0.89;
    }
}

class AddonDecorator extends Beverage {
    constructor(beverage) {
        super();
        this.beverage = beverage;
    }

    getDescription() {
        return this.beverage.getDescription();
    }

    cost() {
        return this.beverage.cost();
    }
}

class Milk extends AddonDecorator {
    constructor(beverage) {
        super(beverage);
        this.beverage.addMilk();
    }

    getDescription() {
        return this.beverage.getDescription() + this.beverage.getMilkDescription();
    }

    cost() {
        return this.beverage.cost() + this.beverage.getMilkCost();
    }
}

class Soy extends AddonDecorator {
    constructor(beverage) {
        super(beverage);
        this.beverage.addSoy();
    }

    getDescription() {
        return this.beverage.getDescription() + this.beverage.getSoyDescription();
    }

    cost() {
        return this.beverage.cost() + this.beverage.getSoyCost();
    }
}

class Mocha extends AddonDecorator {
    constructor(beverage) {
        super(beverage);
        this.beverage.addMocha();
    }

    getDescription() {
        return this.beverage.getDescription() + this.beverage.getMochaDescription();
    }

    cost() {
        return this.beverage.cost() + this.beverage.getMochaCost();
    }
}

class Whip extends AddonDecorator {
    constructor(beverage) {
        super(beverage);
        this.beverage.addWhip();
    }

    getDescription() {
        return this.beverage.getDescription() + this.beverage.getWhipDescription();
    }

    cost() {
        return this.beverage.cost() + this.beverage.getWhipCost();
    }
}

function createBeverage(type, addons = []) {
    let beverage;

    switch (type) {
        case 'Espresso':
            beverage = new Espresso();
            break;
        case 'DarkRoast':
            beverage = new DarkRoast();
            break;
        case 'Decaf':
            beverage = new Decaf();
            break;
        case 'HouseBlend':
            beverage = new HouseBlend();
            break;
        default:
            throw new Error('Неизвестный тип напитка');
    }


    addons.forEach(addon => {
        switch (addon) {
            case 'Milk':
                beverage = new Milk(beverage);
                break;
            case 'Soy':
                beverage = new Soy(beverage);
                break;
            case 'Mocha':
                beverage = new Mocha(beverage);
                break;
            case 'Whip':
                beverage = new Whip(beverage);
                break;
            default:
                throw new Error(`Неизвестная добавка: ${addon}`);
        }
    });

    return {
        description: beverage.getDescription(),
        cost: beverage.cost()
    };
}

const myDrink = createBeverage('DarkRoast', ['Mocha', 'Whip']);
console.log(`Описание: ${myDrink.description}, Стоимость: $${myDrink.cost}`);

const myDrink2 = createBeverage('Espresso', []);
console.log(`Описание: ${myDrink2.description}, Стоимость: $${myDrink2.cost}`);