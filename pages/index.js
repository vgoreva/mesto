import FormValidator from '../scripts/FormValidator.js'
import Card from '../scripts/Card.js'

// переменные из профиля
const openButtonEditForm = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const userNameElement = document.querySelector('.profile__name');
const userDetailsElement = document.querySelector('.profile__details');

//все попапы
const anyPopups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__close-button')
const anyInputs = document.querySelectorAll('.popup__input')

//Селектор формы
const addForm = document.querySelector('.popup__form_type_add');
const editForm = document.querySelector('.popup__form_type_edit');

//переменные из всплывающего окна редактирования профиля
const popupEdit = document.querySelector('.popup_type_edit');
const userNameEditForm = document.querySelector('.popup__input_type_name');
const userDetailsEditForm = document.querySelector('.popup__input_type_details');

//переменные из всплвающенго окна добавления фото
const popupAdd = document.querySelector('.popup_type_add');
const cardNewImage = document.querySelector('.popup__input_type_link');
const cardNewTitle = document.querySelector('.popup__input_type_title');
// const saveButtonPopupAdd = document.querySelector('.popup__save-button_type_add')
const errorMessageContainers = document.querySelectorAll('.popup__error')

//переменные из попапа с картинкой
export const popupImage = document.querySelector('.popup_type_view');
// const popupContainerImage = document.querySelector('.popup__container_image');
export const imageFull = document.querySelector('.popup__image')
export const titleFull = document.querySelector('.popup__title_full')
// const closeButtonImage = document.querySelector('.popup__close-button_type_image');

//переменые из карточек
const cardArea = document.querySelector('.location__elements');
const initialCards = [
  {
    name: 'Новая Аквитания',
    link: './images/bordeux.jpg'
  },
  {
    name: 'Большой Барьерный риф',
    link: './images/riefs.jpg'
  },
  {
    name: 'Амазония',
    link: './images/amazon.jpg'
  },
  {
    name: 'Мадагаскар',
    link: './images/madagacsar.jpg'
  },
  {
    name: 'Новая Зеландия',
    link: './images/new_zealand.jpg'
  },
  {
    name: 'Антарктида',
    link: './images/antarctica.jpg'
  }
];

//Валидация
const validationConfig = {
  inputSelector: '.popup__input',                              //Селектор полей ввода
  submitButtonSelector: '.popup__save-button',                //Селектор кнопки
  inactiveButtonClass: 'popup__save-button_disabled',        //Класс неактивной кнопки
  inputErrorClass: 'popup__input_type_error',               //Класс поля ввода с ошибкой
  errorClass: 'popup__error_visible'                       //Класс текста ошибки
};


const addFormInstance = new FormValidator(addForm, validationConfig);
const editFormInstance = new FormValidator(editForm, validationConfig)

editFormInstance.enableValidation()
addFormInstance.enableValidation()

//открыть любой попап
export function openPopup(popup) {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closePressingEsc);
}

//закрыть любой попап
function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closePressingEsc);
};

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

//Открыть окно редактирование профиля с данными
function openEditPopup() {
  editFormInstance.disableButton();

  errorMessageContainers.forEach(editFormInstance.deleteErrorMessages);

  editFormInstance.undecorateInput(userNameEditForm);
  editFormInstance.undecorateInput(userDetailsEditForm);

  openPopup(popupEdit);

  userNameEditForm.value = userNameElement.textContent;
  userDetailsEditForm.value = userDetailsElement.textContent;
};

openButtonEditForm.addEventListener('click', openEditPopup);

// Изменить данные в профиле и сохранить изменения
function handleFormSubmit(event) {
  event.preventDefault();

  userNameElement.textContent = userNameEditForm.value;
  userDetailsElement.textContent = userDetailsEditForm.value;

  closePopup(popupEdit);
};

editForm.addEventListener('submit', handleFormSubmit);

//Очистить форму
function resetInput(form) {
  form.reset();
}

//Открыть окно добавления карточки
function openAddForm() {
  addFormInstance.disableButton();

  errorMessageContainers.forEach(editFormInstance.deleteErrorMessages);

  editFormInstance.undecorateInput(cardNewImage);
  editFormInstance.undecorateInput(cardNewTitle);

  openPopup(popupAdd);

  resetInput(addForm);
};

addButton.addEventListener('click', openAddForm);

//Определить куда и как добавлять начальные карточки
function addInitialCards(cardsToAdd) {
  cardArea.append(cardsToAdd);
}

//Отразить на странице начальные карточки
initialCards.forEach((item) => {
  const newCard = new Card(item, '#cardTemplate').getCard();
  addInitialCards(newCard)
})

//Определить куда и как добавлять новые карточки
function addAddedCards(card) {
  cardArea.prepend(card);
}

//Отразить новую карточку на страницу
function renderAddedCard(event) {
  event.preventDefault();

  const newCard = new Card(
    {
      name: cardNewTitle.value,
      link: cardNewImage.value,
    }, '#cardTemplate').getCard();;

  addAddedCards(newCard);
  closePopup(popupAdd);
}

addForm.addEventListener('submit', renderAddedCard);

//Закрыть попап кликом на оверлэй
function closeClickingOverlay(popup) {
  popup.addEventListener('click', function (evt) {
    if (evt.target === evt.currentTarget) {
      closePopup(popup)
    }
  })
}

//Закрыть попап кнопкой esc
function closePressingEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}

//Закрыть любой попап кликом вне попапа
anyPopups.forEach(closeClickingOverlay)