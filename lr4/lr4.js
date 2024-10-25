class Beverage {
    constructor() {
        this.description = '';
        this.volume = 0;
    }

    getDescription() {
        return this.description;
    }

    cost() {
        return 0;
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
    }

    getDescription() {
        return this.beverage.getDescription() + ', Milk';
    }

    cost() {
        return this.beverage.cost() + 0.50;
    }
}

class Soy extends AddonDecorator {
    constructor(beverage) {
        super(beverage);
    }

    getDescription() {
        return this.beverage.getDescription() + ', Soy';
    }

    cost() {
        return this.beverage.cost() + 0.30;
    }
}

class Mocha extends AddonDecorator {
    constructor(beverage) {
        super(beverage);
    }

    getDescription() {
        return this.beverage.getDescription() + ', Mocha';
    }

    cost() {
        return this.beverage.cost() + 0.20;
    }
}

class Whip extends AddonDecorator {
    constructor(beverage) {
        super(beverage);
    }

    getDescription() {
        return this.beverage.getDescription() + ', Whip';
    }

    cost() {
        return this.beverage.cost() + 0.10;
    }
}

class BeverageFactory {
    createBase() { }
    createMainIngredient() { }
    createTopper() { }
}

class CoffeeFactory extends BeverageFactory {
    createBase() {
        return "Water";
    }

    createMainIngredient() {
        return "Coffee";
    }

    createTopper() {
        return "Cream";
    }
}

class TeaFactory extends BeverageFactory {
    createBase() {
        return "Water";
    }

    createMainIngredient() {
        return "Tea";
    }

    createTopper() {
        return "Honey";
    }
}

class FreshFactory extends BeverageFactory {
    createBase() {
        return "Juice";
    }

    createMainIngredient() {
        return "Fruits";
    }

    createTopper() {
        return "Ice";
    }
}

class CocktailFactory extends BeverageFactory {
    createBase() {
        return "Sparkling Water";
    }

    createMainIngredient() {
        return "Fruits";
    }

    createTopper() {
        return "Syrup";
    }
}

class VolumeFactory {
    createVolume() { }
}

class SmallVolumeFactory extends VolumeFactory {
    createVolume() {
        return 0.4;
    }
}

class MediumVolumeFactory extends VolumeFactory {
    createVolume() {
        return 0.6;
    }
}

class LargeVolumeFactory extends VolumeFactory {
    createVolume() {
        return 0.8;
    }
}

class Drink {
    constructor(factory, volumeFactory) {
        this.base = factory.createBase();
        this.mainIngredient = factory.createMainIngredient();
        this.topper = factory.createTopper();
        this.volume = volumeFactory.createVolume();
        this.description = `${this.base} with ${this.mainIngredient} and ${this.topper}, ${this.volume}L`;
    }

    getDescription() {
        return this.description;
    }

    cost() {
        let baseCost = 2;
        return baseCost * this.volume;
    }
}

function createBeverage(beverageType, volumeType, addons = []) {
    let beverageFactory;

    switch (beverageType.toLowerCase()) {
        case 'coffee':
            beverageFactory = new CoffeeFactory();
            break;
        case 'tea':
            beverageFactory = new TeaFactory();
            break;
        case 'fresh':
            beverageFactory = new FreshFactory();
            break;
        case 'cocktail':
            beverageFactory = new CocktailFactory();
            break;
        default:
            throw new Error('Неизвестный тип напитка');
    }

    let volumeFactory;

    switch (volumeType.toLowerCase()) {
        case 'small':
            volumeFactory = new SmallVolumeFactory();
            break;
        case 'medium':
            volumeFactory = new MediumVolumeFactory();
            break;
        case 'large':
            volumeFactory = new LargeVolumeFactory();
            break;
        default:
            throw new Error('Неизвестный выбор объема');
    }

    let beverage = new Drink(beverageFactory, volumeFactory);

    addons.forEach(addon => {
        switch (addon.toLowerCase()) {
            case 'milk':
                beverage = new Milk(beverage);
                break;
            case 'soy':
                beverage = new Soy(beverage);
                break;
            case 'mocha':
                beverage = new Mocha(beverage);
                break;
            case 'whip':
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

const myDrink = createBeverage('Coffee', 'Medium', ['Mocha', 'Whip']);
console.log(`Ваш заказ: ${myDrink.description}`);
console.log(`Общая стоимость: $${myDrink.cost.toFixed(2)}`);

const myDrink2 = createBeverage('Tea', 'Large', ['Milk']);
console.log(`Ваш заказ: ${myDrink2.description}`);
console.log(`Общая стоимость: $${myDrink2.cost.toFixed(2)}`);

const myDrink3 = createBeverage('Fresh', 'Small', []);
console.log(`Ваш заказ: ${myDrink3.description}`);
console.log(`Общая стоимость: $${myDrink3.cost.toFixed(2)}`);

const myDrink4 = createBeverage('Cocktail', 'Large', ['Whip']);
console.log(`Ваш заказ: ${myDrink4.description}`);
console.log(`Общая стоимость: $${myDrink4.cost.toFixed(2)}`);
