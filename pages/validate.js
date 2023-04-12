//Отменить перезазрузку и вызвать нвстройку поведения кнопки
  const enableValidation = ({formSelector, ...rest }) => { //Использовать формы в попах и остальное
  
    const forms = Array.from(document.querySelectorAll(formSelector)); //Найти формы в попах
  
    forms.forEach(form => {                           //Цикл по формам в попах
        form.addEventListener('submit', (evt) => {   //При отправке каждой формы
            evt.preventDefault();                   //Отменить стандартные действия (перезагрузку страницы)
        })
  
        determineSaveButton (form, rest); // вызвать установку слушателей
    })
  }
  
  //Настроить поведение кнопки
  const determineSaveButton = (inputToValidate, { inputSelector, submitButtonSelector, ...rest }) => { //  Включить/выключить кнопку
  
    const formInputs = Array.from(inputToValidate.querySelectorAll(inputSelector)); // Массив из полей ввода
    const formButton = inputToValidate.querySelector(submitButtonSelector); // Массив из кнопок
  
    formInputs.forEach(input => {                      // Перебать каждого поля ввода из массива
      input.addEventListener('input', () => {         // Установить ответ на каждый ввод в вводе полей из массива
  
        checkInputValidity(input, rest)             // При вводе для каждого поля ввода проверить ошибку и продемонстрировать ее
  
        if (haveInvalidInput(formInputs)) {       // Проверить все поля на наличие ошибок
            disableButton(formButton, rest);     // Если есть, то отключить кнопку сохранения
        }
        else {
            enableButton(formButton, rest);   //Если нет, то включить кнопку сохранения
        }
  
      })
    })
  }
  
  //Проверить и продемонстрировать ошибку
  const checkInputValidity = (input, style) => {
  
  const currentInputError = document.querySelector(`#${input.id}-error`);       //Поля для комментария ошибки
  
  if (input.checkValidity()) {                    //Если ошибок нет (checkValidity = true),
        currentInputError.textContent = ''     //то поля для комментария ошибки пустое,  
        undecorateInputs(input, style)   //а поле ввода без выделения
    }
    else {                                                              //Иначе
      decorateInputs(input, style)                                      // выдели поле ввода,
      decorateErrorMessages (currentInputError, style)                //окрась сообщение об ошибке,
      currentInputError.textContent = input.validationMessage;     //наполни поля для комментария стандартным браузерным сообщение об ошибке
    } 
  }
  
  //Проверить правильность заполнения полей
  const haveInvalidInput = (formInputs) => {
    return formInputs.some(item => !item.validity.valid);
  }
  
  //Стилизовать сообщение ошибки
  const decorateErrorMessages = (input,{errorClass}) => {
    input.classList.add(errorClass);
  }
  
  //убрать текст ошибки
  const deleteErrorMessages = (currentInputError) => {
    currentInputError.textContent = '';
  }
  
  //Подчеркнуть инпут с ошибкой
  const decorateInputs = (input,{inputErrorClass}) => {
   input.classList.add(inputErrorClass);
  }
  
  //Убрать почеркивание
  const undecorateInputs = (input,{inputErrorClass}) => {
    input.classList.remove(inputErrorClass);
  }
  
  //Описать активную кнопку
  const enableButton = (button, {inactiveButtonClass}) => {
    button.classList.remove(inactiveButtonClass);
    button.removeAttribute('disabled');
  }
  
  //Описать неактивную кнопку
  const disableButton = (button, {inactiveButtonClass}) => {
    button.classList.add(inactiveButtonClass);
    button.setAttribute('disabled', true);
  }