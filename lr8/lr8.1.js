// Интерфейсы
class Menu {
    createIterator() {
        throw new Error("Метод 'createIterator()' должен быть переопределен");
    }
}

class Iterator {
    hasNext() {
        throw new Error("Метод 'hasNext()' должен быть переопределен");
    }

    next() {
        throw new Error("Метод 'next()' должен быть переопределен");
    }

    remove() {
        throw new Error("Метод 'remove()' должен быть переопределен");
    }
}

// Итераторы
class ListIterator extends Iterator {
    constructor(items) {
        super();
        this.items = items;
        this.position = 0;
        this.lastReturned = -1;
    }

    hasNext() {
        return this.position < this.items.length;
    }

    next() {
        if (!this.hasNext()) {
            throw new Error("Нет больше элементов");
        }
        this.lastReturned = this.position;
        const item = this.items[this.position];
        this.position++;
        return item;
    }

    remove() {
        if (this.lastReturned === -1) {
            throw new Error("Невозможно удалить элемент до вызова 'next()'");
        }
        this.items.splice(this.lastReturned, 1);
        this.position--;
        this.lastReturned = -1;
    }
}

class HashTableIterator extends Iterator {
    constructor(items) {
        super();
        this.items = items;
        this.keys = Object.keys(items);
        this.position = 0;
        this.lastReturned = -1;
    }

    hasNext() {
        return this.position < this.keys.length;
    }

    next() {
        if (!this.hasNext()) {
            throw new Error("Нет больше элементов");
        }
        const key = this.keys[this.position];
        this.lastReturned = this.position;
        this.position++;
        return [key, this.items[key]];
    }

    remove() {
        if (this.lastReturned === -1) {
            throw new Error("Невозможно удалить элемент до вызова 'next()'");
        }
        const key = this.keys[this.lastReturned];
        delete this.items[key];
        this.keys.splice(this.lastReturned, 1);
        this.position--;
        this.lastReturned = -1;
    }
}

// Меню 
class PizzeriaMenu extends Menu {
    constructor() {
        super();
        this.items = [
            "Пицца Маргарита: 400 руб.",
            "Пицца Пепперони: 420 руб.",
            "Пицца 4 сыра: 480 руб."
        ];
    }

    createIterator() {
        return new ListIterator(this.items);
    }
}

class CafeMenu extends Menu {
    constructor() {
        super();
        this.items = [
            "Капучино: 120 руб.",
            "Латте: 135 руб.",
            "Эспрессо: 90 руб."
        ];
    }

    createIterator() {
        return new ListIterator(this.items);
    }
}

class PelmennayaMenu extends Menu {
    constructor() {
        super();
        this.items = {
            "Классические пельмени": 250,
            "Пельмени с грибами": 300,
            "Пельмени с рыбой": 350
        };
    }

    createIterator() {
        return new HashTableIterator(this.items);
    }
}

// Клиентский код для работы с меню
function printMenu(menu) {
    const iterator = menu.createIterator();
    while (iterator.hasNext()) {
        if (iterator instanceof HashTableIterator) {
            const [item, price] = iterator.next();
            console.log(`${item}: ${price} руб.`);
        } else {
            const item = iterator.next();
            console.log(item);
        }
    }
}

function removeLastItem(menu) {
    const iterator = menu.createIterator();
    let lastItem = null;
    while (iterator.hasNext()) {
        lastItem = iterator instanceof HashTableIterator ? iterator.next()[0] : iterator.next();
    }
    iterator.remove();
    console.log(`Удалён последний элемент: ${lastItem}`);
}

// Основной блок программы

    const pizzeriaMenu = new PizzeriaMenu();
    const cafeMenu = new CafeMenu();

    console.log("Меню Пиццерии:");
    printMenu(pizzeriaMenu);
    removeLastItem(pizzeriaMenu);
    printMenu(pizzeriaMenu);
    console.log("\nМеню Кофейни:");
    printMenu(cafeMenu);

    // добавляем пельменную (доп)
    const pelmennayaMenu = new PelmennayaMenu();
    console.log("\nМеню Пельменной:");
    printMenu(pelmennayaMenu);

    removeLastItem(pelmennayaMenu);
    printMenu(pelmennayaMenu);
