export default class Section {
    constructor(renderer, containerSelector) {
        this.renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addServerItem(item) {
        this._container.append(item);
    }

    addItem(item) {
        this._container.prepend(item);
    }

    renderItems(dataCard) {
        dataCard.forEach(item => {
            this.renderer(item);
        });
    }
}