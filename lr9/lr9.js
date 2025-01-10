// Реализация шаблона
class GumDispenser {
    constructor() {
        this.state = new NoCoinState(this); 
        this.prizes = 5; 
    }

    setState(state) {
        this.state = state;
    }

    insertCoin() {
        this.state.insertCoin();
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
            console.log('Приз выдан!'); 
            // Проверка на исключительные состояния
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

    getPrizes() {
        return this.prizes; 
    }
}

// Классы состояний
class NoCoinState {
    constructor(disp) {
        this.disp = disp; 
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
        this.disp = disp;
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

// Использование
const dispenser = new GumDispenser();
dispenser.insertCoin(); // Вставить монету
dispenser.pullLever(); // Повернуть рычаг
dispenser.refill(3); // Заполнить автомат
