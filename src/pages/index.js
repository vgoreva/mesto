//Импорты
import FormValidator from '../components/FormValidator.js'
import Card from '../components/Card.js'
import Section from '../components/Section.js'
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js'

import '../pages/index.css'

import amazon from '../images/amazon.jpg'
import antarctica from '../images/antarctica.jpg'
import bordeux from'../images/bordeux.jpg'
import madagacsar from '../images/madagacsar.jpg'
import newZealand from '../images/new_zealand.jpg'
import riefs from '../images/riefs.jpg'

// переменные из профиля
const openButtonEditForm = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const userNameElement = document.querySelector('.profile__name');
const userDetailsElement = document.querySelector('.profile__details');

//Селектор формы
const addForm = document.querySelector('.popup__form_type_add');
const editForm = document.querySelector('.popup__form_type_edit');

//Переменные из всплывающего окна редактирования профиля
//const popupEdit = document.querySelector('.popup_type_edit');
const userNameEditForm = document.querySelector('.popup__input_type_name');
const userDetailsEditForm = document.querySelector('.popup__input_type_details');

//Переменные из всплывающего окна добавления фото
//const popupAdd = document.querySelector('.popup_type_add');
const cardNewImage = document.querySelector('.popup__input_type_link');
const cardNewTitle = document.querySelector('.popup__input_type_title');
// const saveButtonPopupAdd = document.querySelector('.popup__save-button_type_add')
const errorMessageContainers = document.querySelectorAll('.popup__error')

//Переменные из попапа с картинкой
// const popupImage = document.querySelector('.popup_type_view');
// const popupContainerImage = document.querySelector('.popup__container_image');
// const imageFull = document.querySelector('.popup__image')
// const titleFull = document.querySelector('.popup__title_full')
// const closeButtonImage = document.querySelector('.popup__close-button_type_image');

//Данные начальных карточек
//const cardArea = document.querySelector('.location__elements');
const initialCards = [
  {
    name: 'Новая Аквитания',
    link: bordeux,
  },
  {
    name: 'Большой Барьерный риф',
    link: riefs
  },
  {
    name: 'Амазония',
    link: amazon
  },
  {
    name: 'Мадагаскар',
    link: madagacsar
  },
  {
    name: 'Новая Зеландия',
    link: newZealand
  },
  {
    name: 'Антарктида',
    link: antarctica
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
const editFormInstance = new FormValidator(editForm, validationConfig);

editFormInstance.enableValidation()
addFormInstance.enableValidation()

//Данные профиля
const userInfo = new UserInfo({ nameSelector: '.profile__name', detailsSelector: '.profile__details' });

//Попапы
const profilePopup = new PopupWithForm('.popup_type_edit', (event) => {
  event.preventDefault();

  userInfo.setUserInfo(profilePopup.getInputValues());

  profilePopup.close();
});

profilePopup.setEventListeners();

//Сабмит новой карточки
const addPopup = new PopupWithForm('.popup_type_add', (event) => {
  event.preventDefault();

  renderAddedCard();
})

addPopup.setEventListeners();

//Создать из класса попап с картинкой
const fullImagePopup = new PopupWithImage('.popup_type_view');

fullImagePopup.setEventListeners();

//Открыть окно редактирование профиля с данными
function openEditPopup() {
  profilePopup.open();

  editFormInstance.disableButton();
  errorMessageContainers.forEach(editFormInstance.deleteErrorMessages);
  editFormInstance.undecorateInput(userNameEditForm);
  editFormInstance.undecorateInput(userDetailsEditForm);

  userNameEditForm.value = userNameElement.textContent;
  userDetailsEditForm.value = userDetailsElement.textContent;
};

openButtonEditForm.addEventListener('click', openEditPopup);

//Открыть окно добавления карточки
function openAddPopup() {
  addPopup.open();

  addFormInstance.disableButton();
  errorMessageContainers.forEach(editFormInstance.deleteErrorMessages);
  editFormInstance.undecorateInput(cardNewImage);
  editFormInstance.undecorateInput(cardNewTitle);
};

addButton.addEventListener('click', openAddPopup);

//Отразить на странице начальные карточки
const initialCardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#cardTemplate', fullImagePopup.open);
    return card.getCard();
  }
}, '.location__elements');

initialCardList.renderItems()

//Отразить новую карточку на страницу
function renderAddedCard(event) {
  const addedCardList = new Section({
    data: {
      name: cardNewTitle.value,
      link: cardNewImage.value,
    },
    renderer: (item) => {
      const newCard = new Card(item, '#cardTemplate', fullImagePopup.open);
      return newCard.getCard();
    }
  }, '.location__elements');

  addedCardList.renderItem()

  addPopup.close();
}