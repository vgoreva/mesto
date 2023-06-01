import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallBack) {
        super(popupSelector);

        this._submitCallBack = submitCallBack;
        this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
        this._submitButton = this._form.querySelector('.popup__save-button');
        this._defaulButtonText = this._submitButton.textContent;
    }

    _getInputValues() {
        const obj = {};

        this._inputs.forEach(input => {
            obj[input.name] = input.value;
        })

        return obj;
    }

    setInputValues (dataUser) {
        this._inputs.forEach(input => {
            input.value = dataUser[input.name]
        }) 
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', evt => {
            evt.preventDefault();
            this._submitCallBack(this._getInputValues());
            this._submitButton.textContent = `${this._submitButton.textContent}...`
        });
    }

    setDefaultButton() {
        this._submitButton.textContent = this._defaulButtonText;
    }

    close() {
        super.close();
        this._form.reset();
    }
}