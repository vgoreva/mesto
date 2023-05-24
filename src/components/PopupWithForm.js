import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallBack) {
        super(popupSelector);

        this._submitCallBack = submitCallBack;
        this._form = this._popup.querySelector('.popup__form')
        this._inputs = Array.from(this._form.querySelectorAll('.popup__input'))
    }

    _getInputValues() {
        const obj = {};

        this._inputs.forEach(input => {
            obj[input.name] = input.value;
        })

        return obj;
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', evt => {
            evt.preventDefault();
            this._submitCallBack(this._getInputValues());
            this.close();
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}