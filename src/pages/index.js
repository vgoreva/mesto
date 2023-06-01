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
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupAddCardOpenButton = document.querySelector('.profile__add-button');
const popupAvatarOpenButton = document.querySelector('.profile__change-avatar-button');

//Селектор формы
const formToAddCard = document.querySelector('.popup__form_type_add');
const formToEditProfile = document.querySelector('.popup__form_type_edit');
const formToChangeAvatar = document.querySelector('.popup__form_type_avatar');

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
const addFormInstance = new FormValidator(formToAddCard, validationConfig);
const editFormInstance = new FormValidator(formToEditProfile, validationConfig);
const changeFormInstance = new FormValidator(formToChangeAvatar, validationConfig);
editFormInstance.enableValidation();
addFormInstance.enableValidation();
changeFormInstance.enableValidation();

//Создать из класса правила о данных пользователя
const userInfo = new UserInfo({ nameSelector: '.profile__name', detailsSelector: '.profile__details', avatarSelector: '.profile__avatar' });

//Создать из класса попап редактирования профиля, описать сабмит и установить слушатели
const popupProfile = new PopupWithForm('.popup_type_edit', (data) => {
  api.setUserInfo(data)
    .then(res => {
      userInfo.setUserInfo({ name: res.name, details: res.about, avatar: res.avatar })
      popupProfile.close()
    })
    .catch(error => console.log(`Ошибка: ${error}`))
    .finally(() => popupProfile.setDefaultButton())
});
popupProfile.setEventListeners();

//Открыть окно редактирование профиля с данными
function openEditPopup() {
  popupProfile.open();

  popupProfile.setInputValues(userInfo.getUserInfo());

  editFormInstance.disableButton();
  errorMessageContainers.forEach(editFormInstance.deleteErrorMessages);
  editFormInstance.undecorateInput(userNameInput);
  editFormInstance.undecorateInput(userDetailsInput);
};
popupProfileOpenButton.addEventListener('click', openEditPopup);

//Создать из класса попап измениния аватарки, описать сабмит и поставить слушатель
const popupAvatar = new PopupWithForm('.popup_type_avatar', (data) => {
  api.setUserAvatar(data)
    .then(res => {
      userInfo.setUserInfo({ name: res.name, details: res.about, avatar: res.avatar })
      popupAvatar.close()
    })
    .catch(error => console.log(`Ошибка: ${error}`))
    .finally(() => popupAvatar.setDefaultButton())
})
popupAvatar.setEventListeners();

//Открыть окно изменения аватарки
function openPopupAvatar() {
  popupAvatar.open();

  changeFormInstance.disableButton();
  errorMessageContainers.forEach(changeFormInstance.deleteErrorMessages);
  changeFormInstance.undecorateInput(cardNewAvatar);
}
popupAvatarOpenButton.addEventListener('click', openPopupAvatar)

//Создать из класса попап с картинкой и установить слушатели
const popupFullImage = new PopupWithImage('.popup_type_view');
popupFullImage.setEventListeners();

//Создать из класса форму карточки и описать работу лайков
function createCard(data) {
  const item = new Card(data, '#cardTemplate', popupFullImage.open, popupDelete.open, (likeCard, id) => {
    if (likeCard.classList.contains('element__like_button_active')) {
      api.deleteLike(id)
        .then(res => {
          item.toggleLike(res.likes)
        })
        .catch(error => console.log(`Ошибка: ${error}`))
        .finally()
    } else {
      api.addLike(id)
        .then(res => {
          item.toggleLike(res.likes)
        })
        .catch(error => console.log(`Ошибка: ${error}`))
        .finally()
    }
  });
  return item.getCard();
}

//Создать из класса попап удаления карточки, описать сабмит и поставить на него слушатели
const popupDelete = new PopupDelete('.popup_type_delete', ({ item, id }) => {
  api.deleteCard(id)
    .then(() => {
      item.removeCard()
      popupDelete.close()
    })
})
popupDelete.setEventListeners();

//Создать из класса инструкцию отображения карточек на странице и добавитб карточки с сервера
const cardsContainer = new Section((item) => {
  cardsContainer.addServerItem(createCard(item))
}, '.location__elements');

//Открыть окно добавления карточки
function openPopupAdd() {
  popupAdd.open();

  addFormInstance.disableButton();
  errorMessageContainers.forEach(editFormInstance.deleteErrorMessages);
  addFormInstance.undecorateInput(cardNewImage);
  addFormInstance.undecorateInput(cardNewTitle);
};
popupAddCardOpenButton.addEventListener('click', openPopupAdd);

//Создать из класса попап дабавления карточки, описать сабмит и установить слушатели
const popupAdd = new PopupWithForm('.popup_type_add', (data) => {
  api.createCard(data)
    .then(dataCard => {
      dataCard.myid = userInfo.getid()
      cardsContainer.addItem(createCard(dataCard))
      popupAdd.close()
    })
    .catch(error => console.log(`Ошибка: ${error}`))
    .finally(() => popupAdd.setDefaultButton())
})
popupAdd.setEventListeners();

//Промис
Promise.all([api.getUserInfo(), api.getCards()])
  .then(([dataUser, dataCard]) => {
    dataCard.forEach((element) => element.myid = dataUser._id)
    userInfo.setUserInfo({ name: dataUser.name, details: dataUser.about, avatar: dataUser.avatar })
    userInfo.setid(dataUser._id)
    cardsContainer.renderItems(dataCard)
  })
  .catch(error => console.log(`Ошибка: ${error}`))
  .finally()