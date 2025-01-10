const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Beverage {
    constructor() {
        this.description = "";
        this.volume = 0;
    }

    getDescription() {
        return this.description;
    }

    cost() {
        return 0;
    }

    hasMilk() { return false; }
    hasSoy() { return false; }
    hasChoco() { return false; }
    hasWhip() { return false; }

    setMilk() {}
    setSoy() {}
    setChoco() {}
    setWhip() {}
}

// Декораторы
class AddonDecorator extends Beverage {
    constructor(beverage) {
        super();
        this.beverage = beverage;
    }

    getDescription() {
        return this.beverage.getDescription();
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
        return this.beverage.cost() + 50;
    }

    hasMilk() {
        return true;
    }
}

class Choco extends AddonDecorator {
    constructor(beverage) {
        super(beverage);
    }

    getDescription() {
        return this.beverage.getDescription() + ', Chocolate';
    }

    cost() {
        return this.beverage.cost() + 30; 
    }

    hasChoco() {
        return true;
    }
}

// Абстрактная фабрика 
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

// Метод для объемов напитков
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

// Классы для конкретных напитков
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
        let baseCost = 300; 
        return baseCost * this.volume;
    }
}

class Order {
    constructor(beverage) {
        this.beverage = beverage;
    }

    processOrder() {
        this.prepareRecipe();
        if (this.boilWater()) {
            this.addIngredients();
            this.pour();
            this.serve();
            this.processPayment();
        } else {
            console.log("Необходимо сначала нагреть воду.");
        }
    }

    prepareRecipe() {
        console.log(`Рецепт на приготовление: ${this.beverage.getDescription()}`);
    }

    boilWater() {
        console.log('Нагреваем воду...');
        return true;
    }

    addIngredients() {
        console.log('Добавляем ингредиенты...');
    }

    pour() {
        console.log('Наливаем в чашку/стакан...');
    }

    serve() {
        console.log('Ваш напиток готов!');
    }

    processPayment() {
        rl.question('Выберите способ оплаты (Карта/Наличные/QR-код): ', (paymentChoice) => {
            switch (paymentChoice.toLowerCase()) {
                case 'карта':
                    console.log('Оплата картой прошла успешно.');
                    break;
                case 'наличные':
                    console.log('Оплата наличными принята.');
                    break;
                case 'qr-код':
                    console.log('Оплата через QR-код прошла успешно.');
                    break;
                default:
                    console.log('Неверный выбор способа оплаты.');
                    this.processPayment(); 
                    return;
            }
            console.log('Спасибо за покупку!');
            rl.close();
        });
    }
}

class CoffeeOrder extends Order {
    constructor(beverage) {
        super(beverage);
    }
    boilWater() {
        console.log('Нагреваю молоко');
        return true; 
    }
}

class FreshOrder extends Order {
    constructor(beverage) {
        super(beverage);
    }

    boilWater() {
        console.log('Для фреша не требуется нагревать воду.');
        return true; 
    }
}

class TeaOrder extends Order {
    constructor(beverage) {
        super(beverage);
    }
}

function askForMilk(beverage, callback) {
    rl.question('Хотите добавить молоко? (yes/no): ', (milkChoice) => {
        if (milkChoice.toLowerCase() === 'yes') {
            beverage = new Milk(beverage);
            askForMilk(beverage, callback);
        } else {
            callback(beverage);
        }
    });
}

function askForChoco(beverage, callback) {
    rl.question('Хотите добавить шоколад? (yes/no): ', (chocoChoice) => {
        if (chocoChoice.toLowerCase() === 'yes') {
            beverage = new Choco(beverage);
            askForChoco(beverage, callback);
        } else {
            callback(beverage);
        }
    });
}

// Функция для выбора добавок
function askForAddons(beverage, callback) {
    rl.question('Выберите добавки (круассан/пирожок/штрудель/ничего): ', (addonChoice) => {
        let addonPrice = 0;
        if (addonChoice.toLowerCase() === 'круассан') {
            addonPrice = 100;
        } else if (addonChoice.toLowerCase() === 'пирожок') {
            addonPrice = 70;
        } else if (addonChoice.toLowerCase() === 'штрудель') {
            addonPrice = 80;
        }
        console.log(`Стоимость добавки: ${addonPrice} руб.`);
        callback(beverage, addonPrice);
    });
}

// Основной процесс заказа
rl.question('Выберите напиток (Coffee/Tea/Fresh): ', (beverageChoice) => {
    let beverageFactory;

    if (beverageChoice.toLowerCase() === 'coffee') {
        beverageFactory = new CoffeeFactory();
    } else if (beverageChoice.toLowerCase() === 'tea') {
        beverageFactory = new TeaFactory();
    } else if (beverageChoice.toLowerCase() === 'fresh') {
        beverageFactory = new FreshFactory();
    } else {
        console.log('Неверный выбор напитка');
        rl.close();
        return;
    }

    rl.question('Выберите объем (Small/Medium/Large): ', (volumeChoice) => {
        let volumeFactory;

        if (volumeChoice.toLowerCase() === 'small') {
            volumeFactory = new SmallVolumeFactory();
        } else if (volumeChoice.toLowerCase() === 'medium') {
            volumeFactory = new MediumVolumeFactory();
        } else if (volumeChoice.toLowerCase() === 'large') {
            volumeFactory = new LargeVolumeFactory();
        } else {
            console.log('Неверный выбор объема');
            rl.close();
            return;
        }

        let beverage = new Drink(beverageFactory, volumeFactory);

        askForMilk(beverage, (beverageWithMilk) => {
            askForChoco(beverageWithMilk, (beverageWithChoco) => {
                askForAddons(beverageWithChoco, (finalBeverage, addonPrice) => {
                    let order;

                
                    if (beverageChoice.toLowerCase() === 'fresh') {
                        order = new FreshOrder(finalBeverage);
                    } else if (beverageChoice.toLowerCase() === 'tea') {
                        order = new TeaOrder(finalBeverage);
                    } else {
                        order = new CoffeeOrder(finalBeverage);
                    }

                    order.processOrder();
                    console.log(`Общая стоимость: ${(finalBeverage.cost() + addonPrice).toFixed(2)} руб.`);
                });
            });
        });
    });
});
