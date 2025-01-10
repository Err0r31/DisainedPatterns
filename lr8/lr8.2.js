// Интерфейсы
class MenuComponent {
    add(menuComponent) {
        throw new Error('Метод не реализован');
    }

    remove(menuComponent) {
        throw new Error('Метод не реализован');
    }

    getChild(i) {
        throw new Error('Метод не реализован');
    }

    createIterator() {
        throw new Error('Метод не реализован');
    }

    getName() {
        throw new Error('Метод не реализован');
    }

    getPrice() {
        throw new Error('Метод не реализован');
    }

    isComposite() {
        return false;
    }
}

class Iterator {
    hasNext() {
        throw new Error('Метод не реализован');
    }

    next() {
        throw new Error('Метод не реализован');
    }

    remove() {
        throw new Error('Метод не реализован');
    }
}

// Итератор для Компоновщика
class CompositeIterator extends Iterator {
    constructor(iterator) {
        super();
        this.stack = [iterator];
    }

    hasNext() {
        if (this.stack.length === 0) {
            return false;
        }
        const iterator = this.stack[this.stack.length - 1];
        if (!iterator.hasNext()) {
            this.stack.pop();
            return this.hasNext();
        }
        return true;
    }

    next() {
        if (!this.hasNext()) {
            throw new Error('Больше нет элементов');
        }
        const iterator = this.stack[this.stack.length - 1];
        const component = iterator.next();
        if (component instanceof MenuComposite) {
            this.stack.push(component.createIterator());
        }
        return component;
    }

    remove() {
        throw new Error('Удаление не поддерживается');
    }
}

// Листовой элемент
class MenuItem extends MenuComponent {
    constructor(name, price) {
        super();
        this.name = name;
        this.price = price;
    }

    createIterator() {
        return new ArrayIterator([]);
    }

    getName() {
        return this.name;
    }

    getPrice() {
        return this.price;
    }
}

// Композиция (комбинация меню или подменю)
class MenuComposite extends MenuComponent {
    constructor(name) {
        super();
        this.name = name;
        this.menuComponents = [];
    }

    add(menuComponent) {
        this.menuComponents.push(menuComponent);
    }

    remove(menuComponent) {
        const index = this.menuComponents.indexOf(menuComponent);
        if (index !== -1) {
            this.menuComponents.splice(index, 1);
        }
    }

    getChild(i) {
        return this.menuComponents[i];
    }

    createIterator() {
        return new CompositeIterator(new ArrayIterator(this.menuComponents));
    }

    getName() {
        return this.name;
    }

    getPrice() {
        return null; // Для композиций цена не применима
    }

    isComposite() {
        return true;
    }
}

// Итератор для массива
class ArrayIterator extends Iterator {
    constructor(array) {
        super();
        this.array = array;
        this.index = 0;
    }

    hasNext() {
        return this.index < this.array.length;
    }

    next() {
        if (!this.hasNext()) {
            throw new Error('Больше нет элементов');
        }
        return this.array[this.index++];
    }

    remove() {
        throw new Error('Удаление не поддерживается');
    }
}

// Клиентский код для работы с меню
function printMenu(menuComponent) {
    const iterator = new CompositeIterator(menuComponent.createIterator());
    while (iterator.hasNext()) {
        const component = iterator.next();
        if (component.isComposite()) {
            console.log(`=== ${component.getName()} ===`);
        } else {
            console.log(`${component.getName()} : ${component.getPrice()} руб.`);
        }
    }
}

function removeLastItem(menuComponent) {
    const iterator = new CompositeIterator(menuComponent.createIterator());
    let lastComponent = null;
    while (iterator.hasNext()) {
        lastComponent = iterator.next();
    }
    // Удаляем последний элемент
    if (lastComponent.isComposite()) {
        throw new Error('Нельзя удалить композит');
    }
    menuComponent.remove(lastComponent);
    console.log(`Удалён последний элемент: ${lastComponent.getName()}`);
}

// Оформление заказа
function placeOrder(menuComponent) {
    let totalPrice = 0;
    console.log('Ваш заказ:');
    const iterator = new CompositeIterator(menuComponent.createIterator());
    while (iterator.hasNext()) {
        const component = iterator.next();
        if (!component.isComposite()) {
            console.log(`${component.getName()} - ${component.getPrice()} руб.`);
            totalPrice += component.getPrice();
        }
    }
    console.log(`Итого: ${totalPrice} руб.`);
}

// Основной блок программы
const pizzeriaMenu = new MenuComposite('Меню Пиццерии');
pizzeriaMenu.add(new MenuItem('Пицца Маргарита', 500));
pizzeriaMenu.add(new MenuItem('Пицца Пепперони', 600));
pizzeriaMenu.add(new MenuItem('Пицца 4 сыра', 700));

const cafeMenu = new MenuComposite('Меню Кофейни');
cafeMenu.add(new MenuItem('Капучино', 150));
cafeMenu.add(new MenuItem('Латте', 180));
cafeMenu.add(new MenuItem('Эспрессо', 120));

const dessertMenu = new MenuComposite('Десертное меню');
dessertMenu.add(new MenuItem('Тирамису', 300));
dessertMenu.add(new MenuItem('Чизкейк', 350));
cafeMenu.add(dessertMenu);

const pelmennayaMenu = new MenuComposite('Меню Пельменной');
pelmennayaMenu.add(new MenuItem('Классические пельмени', 250));
pelmennayaMenu.add(new MenuItem('Пельмени с грибами', 300));
pelmennayaMenu.add(new MenuItem('Пельмени с рыбой', 350));

const wineMenu = new MenuComposite('Винная карта');
wineMenu.add(new MenuItem('Красное вино', 500));
wineMenu.add(new MenuItem('Белое вино', 450));
pelmennayaMenu.add(wineMenu);

// Печать меню
console.log('Меню Пиццерии:');
printMenu(pizzeriaMenu);

console.log('\nМеню Кофейни:');
printMenu(cafeMenu);

console.log('\nМеню Пельменной:');
printMenu(pelmennayaMenu);

// Оформление заказа
console.log('\nОформляем заказ:');
placeOrder(cafeMenu);
