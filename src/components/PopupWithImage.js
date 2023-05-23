import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

        this._fullImage = this._popup.querySelector('.popup__image');
        this._fullTitle = this._popup.querySelector('.popup__title')
    }

    open = (data) => {
        super.open();

        this._fullImage.src = data.link;
        this._fullImage.alt = data.name;
        this._fullTitle.textContent = data.name;
    }
}