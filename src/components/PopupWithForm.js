import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallBack) {
        super(popupSelector);

        this._submitCallBack = submitCallBack;
        this._form = this._popup.querySelector('.popup__form')
        this._inputs = Array.from(this._form.querySelectorAll('.popup__input'))
    }

    getInputValues() {
        this._obj = {};

        this._inputs.forEach(input => {
            this._obj[input.name] = input.value;
            console.log(input.value) // input.value нет
        })

        return this._obj;
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', this._submitCallBack)
    }

    close() {
        super.close();
        this._form.reset();
    }
}