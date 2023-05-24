export default class Section {                               //экспортирую класс Selector
    constructor({ data, renderer }, containerSelector) {    //конструктор состоит из массива, который включает в себя данные, способ взаимодействия с ними и селектора контейнера
        this._renderedItems = data; // Массив того, что нужно отразить на странице
        this.renderer = renderer; // функция колбек для вставки в разметку
        this._container = document.querySelector(containerSelector);
    }

    addInitialItem(item) {
        this._container.append(item);
    }

    addItem(item) {
        this._container.prepend(item);
    }

    renderItems() {
        this._renderedItems.forEach(item => {
            this.addInitialItem(this.renderer(item));
        });
    }

    renderItem() {
        this.addItem(this._renderer(this._renderedItems))
    }
}