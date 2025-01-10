
// Класс для автоматов
class GumDispenser {
    constructor(city) {
        this.city = city;
        this.state = new NoCoinState(this);
        this.prizes = 5; 
        this.coinsInserted = 0;
        this.gumsDispensed = 0;
        this.prizesDispensed = 0;
    }

    setState(state) {
        this.state = state;
    }

    insertCoin() {
        this.state.insertCoin();
        this.coinsInserted++;
    }

    pullLever() {
        this.state.pullLever();
    }

    returnCoin() {
        this.state.returnCoin();
    }

    dispensePrize() {
        if (this.prizes > 0) {
            this.prizes--;
            this.prizesDispensed++;
            console.log('Приз выдан!');
            if (Math.random() < 0.1) {
                console.log('Выдается 2 приза!');
                this.dispensePrize();
            } else if (Math.random() < 0.15) {
                console.log('Выдается игрушка вместо жвачки!');
            }
        } else {
            console.log('Призы закончились! Пожалуйста, заполните автомат.');
        }
    }

    refill(count) {
        this.prizes += count;
        console.log(`Заполнено ${count} призов. Всего призов: ${this.prizes}`);
    }

    getSalesReport() {
        return {
            city: this.city,
            coinsInserted: this.coinsInserted,
            gumsDispensed: this.gumsDispensed,
            prizesDispensed: this.prizesDispensed,
            remainingPrizes: this.prizes
        };
    }
}

// Классы состояний
class NoCoinState {
    constructor(disp) {
        this.disp = disp; // Ссылка на автомат
    }

    insertCoin() {
        console.log('Монета вставлена.');
        this.disp.setState(new CoinInsertedState(this.disp));
    }

    pullLever() {
        console.log('Сначала вставьте монету.');
    }

    returnCoin() {
        console.log('Монеты нет для возврата.');
    }
}

class CoinInsertedState {
    constructor(disp) {
        this.disp = disp; // Ссылка на автомат
    }

    insertCoin() {
        console.log('Монета уже вставлена.');
    }

    pullLever() {
        console.log('Рычаг повернут.');
        this.disp.setState(new LeverPulledState(this.disp));
        this.disp.dispensePrize();
    }

    returnCoin() {
        console.log('Монета возвращена.');
        this.disp.setState(new NoCoinState(this.disp));
    }
}

class LeverPulledState {
    constructor(disp) {
        this.disp = disp; // Ссылка на автомат
    }

    insertCoin() {
        console.log('Подождите, прежде чем вставить другую монету.');
    }

    pullLever() {
        console.log('Рычаг уже повернут. Пожалуйста, подождите.');
    }

    returnCoin() {
        console.log('Невозможно вернуть монету сейчас. Подождите, пока получите приз.');
    }
}

// Прокси-класс для удаленного доступа
class GumDispenserProxy {
    constructor(realDispenser) {
        this.realDispenser = realDispenser;
    }

    getSalesReport() {
        return this.realDispenser.getSalesReport(); 
    }
}

// Пример использования
const dispenser1 = new GumDispenser("Москва");
const dispenser2 = new GumDispenser("Санкт-Петербург");
const dispenser3 = new GumDispenser("Новосибирск");

const proxy1 = new GumDispenserProxy(dispenser1);
const proxy2 = new GumDispenserProxy(dispenser2);
const proxy3 = new GumDispenserProxy(dispenser3);

// Взаимодействие с автоматами
dispenser1.insertCoin();
dispenser1.pullLever();
dispenser2.insertCoin();
dispenser2.pullLever();
dispenser3.insertCoin();
dispenser3.pullLever();

// Получение отчетов о продажах
console.log(proxy1.getSalesReport());
console.log(proxy2.getSalesReport());
console.log(proxy3.getSalesReport());
