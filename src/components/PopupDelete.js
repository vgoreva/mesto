import Popup from './Popup.js';

export default class PopupDelete extends Popup {
    constructor(popupSelector, submitCallBack) {
        super(popupSelector);
        this._submitCallBack = submitCallBack;
        this._submitButton = this._form.querySelector('.popup__save-button');
        this._defaulButtonText = this._submitButton.textContent;
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', evt => {
            evt.preventDefault();
            this._submitCallBack({ item: this._item, id: this._itemId });
            this._submitButton.textContent = `${this._submitButton.textContent}...`
        });
    }

    setDefaultButton() {
        this._submitButton.textContent = this._defaulButtonText;
    }

    open = ({ item, id }) => {
        super.open();

        this._item = item;
        this._itemId = id;
    }
}