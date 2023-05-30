//Импорты
import FormValidator from '../components/FormValidator.js'
import Card from '../components/Card.js'
import Section from '../components/Section.js'
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDelete from '../components/PopupDelete.js';
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js';

import '../pages/index.css'

//Кнопки
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarButton = document.querySelector('.profile__change-avatar-button');

//Данные профиля
const userNameElement = document.querySelector('.profile__name');
const userDetailsElement = document.querySelector('.profile__details');
const userAvatarElement = document.querySelector('.profile__avatar')

//Селектор формы
const addCardForm = document.querySelector('.popup__form_type_add');
const editProfileForm = document.querySelector('.popup__form_type_edit');
const changeAvatarForm = document.querySelector('.popup__form_type_avatar');

//Селекторы инпутов
const userNameInput = document.querySelector('.popup__input_type_name');
const userDetailsInput = document.querySelector('.popup__input_type_link');

const cardNewImage = document.querySelector('.popup__input_type_link');
const cardNewTitle = document.querySelector('.popup__input_type_title');
const cardNewAvatar = document.querySelector('.popup__input_type_avatar');

const errorMessageContainers = document.querySelectorAll('.popup__error')

const validationConfig = {
  inputSelector: '.popup__input',                              //Селектор полей ввода
  submitButtonSelector: '.popup__save-button',                //Селектор кнопки
  inactiveButtonClass: 'popup__save-button_disabled',        //Класс неактивной кнопки
  inputErrorClass: 'popup__input_type_error',               //Класс поля ввода с ошибкой
  errorClass: 'popup__error_visible'                       //Класс текста ошибки
};

//Создать из класса Api экземпляр и авторизоваться на сервере
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '367e7a15-258a-47ba-a141-8c496f87187d',
    'Content-Type': 'application/json'
  }
})

//Создать из класа правила валидации форм редактирования профиля и добавления карточки, установить слушатели
const addFormInstance = new FormValidator(addCardForm, validationConfig);
const editFormInstance = new FormValidator(editProfileForm, validationConfig);
const changeFormInstance = new FormValidator(changeAvatarForm, validationConfig);
editFormInstance.enableValidation();
addFormInstance.enableValidation();
changeFormInstance.enableValidation();

//Создать из класса правила о данных пользователя
const userInfo = new UserInfo({ nameSelector: '.profile__name', detailsSelector: '.profile__details', avatarSelector: '.profile__avatar' });

//Создать из класса попап редактирования профиля, описать сабмит и установить слушатели
const profilePopup = new PopupWithForm('.popup_type_edit', (data) => {
  api.setUserInfo(data)
    .then(res => {
      userInfo.setUserInfo({ username: res.name, details: res.about, avatar: res.avatar })
      profilePopup.close()
    })
    .catch(error => console.log(`Ошибка: ${error}`))
    .finally(() => profilePopup.setDefaultButton())
});
profilePopup.setEventListeners();

//Открыть окно редактирование профиля с данными
function openEditPopup() {
  profilePopup.open();

  editFormInstance.disableButton();
  errorMessageContainers.forEach(editFormInstance.deleteErrorMessages);
  editFormInstance.undecorateInput(userNameInput);
  editFormInstance.undecorateInput(userDetailsInput);

  userNameInput.value = userNameElement.textContent;
  userDetailsInput.value = userDetailsElement.textContent;
};
editButton.addEventListener('click', openEditPopup);

//Создать из класса попап измениния аватарки, описать сабмит и поставить слушатель
const avatarPopup = new PopupWithForm('.popup_type_avatar', (data) => {
  api.setUserAvatar(data)
    .then(res => {
      userInfo.setUserInfo({ username: res.name, details: res.about, avatar: res.avatar })
      avatarPopup.close()
    })
    .catch(error => console.log(`Ошибка: ${error}`))
    .finally(() => avatarPopup.setDefaultButton())
})
avatarPopup.setEventListeners();

//Открыть окно изменения аватарки
function openAvatarPopup() {
  avatarPopup.open();

  changeFormInstance.disableButton();
  errorMessageContainers.forEach(changeFormInstance.deleteErrorMessages);
  changeFormInstance.undecorateInput(cardNewAvatar);
}
avatarButton.addEventListener('click', openAvatarPopup)

//Создать из класса попап с картинкой и установить слушатели
const fullImagePopup = new PopupWithImage('.popup_type_view');
fullImagePopup.setEventListeners();

//Создать из класса попап удаления карточки, описать сабмит и поставить на него слушатели
const deletePopup = new PopupDelete('.popup_type_delete', ({ card, cardId }) => {
  api.deleteCard(cardId)
    .then(() =>
      card.removeCard())
  deletePopup.close()
})
deletePopup.setEventListeners();

//Создать из класса форму карточки и описать работу лайков
function createCard(item) {
  const card = new Card(item, '#cardTemplate', fullImagePopup.open, deletePopup.open, (likeCard, cardId) => {
    if (likeCard.classList.contains('element__like_button_active')) {
      api.deleteLike(cardId)
        .then(res => {
          card.toggleLike(res.likes)
        })
        .catch(error => console.log(`Ошибка: ${error}`))
        .finally()
    } else {
      api.addLike(cardId)
        .then(res => {
          card.toggleLike(res.likes)
        })
        .catch(error => console.log(`Ошибка: ${error}`))
        .finally()
    }
  });
  return card.getCard();
}

//Создать из класса инструкцию отображения карточек на странице и добавитб карточки с сервера
const cardSection = new Section((item) => {
  cardSection.addServerItem(createCard(item))
}, '.location__elements');

//Открыть окно добавления карточки
function openAddPopup() {
  addPopup.open();

  addFormInstance.disableButton();
  errorMessageContainers.forEach(editFormInstance.deleteErrorMessages);
  addFormInstance.undecorateInput(cardNewImage);
  addFormInstance.undecorateInput(cardNewTitle);
};
addButton.addEventListener('click', openAddPopup);

//Создать из класса попап дабавления карточки, описать сабмит и установить слушатели
const addPopup = new PopupWithForm('.popup_type_add', (data) => {
  Promise.all([api.getUserInfo(), api.createCard(data)])
    .then(([dataUser, dataCard]) => {
      dataCard.myid = dataUser._id;
      cardSection.addItem(createCard(dataCard))
      addPopup.close()
    })
    .catch(error => console.log(`Ошибка: ${error}`))
    .finally(() => addPopup.setDefaultButton())
})
addPopup.setEventListeners();

//Промис
Promise.all([api.getUserInfo(), api.getCards()])
  .then(([dataUser, dataCard]) => {
    dataCard.forEach((element) => element.myid = dataUser._id)
    userInfo.setUserInfo({ username: dataUser.name, details: dataUser.about, avatar: dataUser.avatar })
    cardSection.renderItems(dataCard)
  })
  .catch(error => console.log(`Ошибка: ${error}`))
  .finally()