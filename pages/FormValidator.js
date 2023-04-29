class FormValidator {
    constructor(form, { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) { // какая форма,{характеристики формы}
        this._form = form;
        this._inputSelector = inputSelector;
        this._submitButtonSelector = submitButtonSelector;
        this._inactiveButtonClass = inactiveButtonClass;
        this._inputErrorClass = inputErrorClass;
        this._errorClass = errorClass;
    }

    enableValidation() {
        this._formInputs = Array.from(this._form.querySelectorAll(this._inputSelector)); // Массив из полей ввода
        this._formButton = this._form.querySelector(this._submitButtonSelector); // Кнопка
        this._determineSaveButton()
    }

    _determineSaveButton() { //  Включить/выключить кнопку
        this._formInputs.forEach(input => {                      // Перебать каждого поля ввода из массива
            input.addEventListener('input', () => {           // Установить ответ на каждый ввод в вводе полей из массива
                this._checkInputValidity(input)                         // При вводе для каждого поля ввода проверить ошибку и продемонстрировать ее
                if (this._haveInvalidInput()) {       // Проверить все поля на наличие ошибок
                    this.disableButton();     // Если есть, то отключить кнопку сохранения
                }
                else {
                    this._enableButton();   //Если нет, то включить кнопку сохранения
                }
            })
        })
    }

    _haveInvalidInput() {
        return this._formInputs.some(item => !item.validity.valid);
    }

    _checkInputValidity(input) {
        if (input.checkValidity()) {
            this.hideInputError(input)
        }
        else {
            this._showInputError(input)
        }
    }

    hideInputError(input) {
        const currentInputError = this._form.querySelector(`#${input.id}-error`);       //Поля для комментария ошибки
        this.undecorateInput(input);
        currentInputError.textContent = '';     //то поля для комментария ошибки пустое,  
    }

    _showInputError(input) {
        const currentInputError = this._form.querySelector(`#${input.id}-error`);       //Поля для комментария ошибки
        this._decorateInput(input)
        currentInputError.classList.add(this._errorClass);           //окрась сообщение об ошибке,
        currentInputError.textContent = input.validationMessage;     //наполни поля для комментария стандартным браузерным сообщение об ошибке
    }

    deleteErrorMessages(currentInputError) {
        currentInputError.textContent = '';
    }

    _decorateInput(input) {
        input.classList.add(this._inputErrorClass);
    }

    undecorateInput(input) {
        input.classList.remove(this._inputErrorClass);
    }

    _enableButton() {
        this._formButton.classList.remove(this._inactiveButtonClass);
        this._formButton.removeAttribute('disabled');
    }

    disableButton() {
        this._formButton.classList.add(this._inactiveButtonClass);
        this._formButton.setAttribute('disabled', true);
    }

}

export default FormValidator