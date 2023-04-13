// переменные из профиля
const openButtonEditForm = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const userNameElement = document.querySelector('.profile__name');
const userDetailsElement = document.querySelector('.profile__details');

//все попапы
const anyPopups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__close-button')
const anyInputs = document.querySelectorAll('.popup__input')

//переменные из всплывающего окна редактирования профиля
const popupEdit = document.querySelector('.popup_type_edit');
const editForm = document.querySelector('.popup__form_type_edit');
const userNameEditForm = document.querySelector('.popup__input_type_name');
const userDetailsEditForm = document.querySelector('.popup__input_type_details');

//переменные из всплвающенго окна добавления фото
const popupAdd = document.querySelector('.popup_type_add');
const addForm = document.querySelector('.popup__form_type_add');
const cardNewImage = document.querySelector('.popup__input_type_link');
const cardNewTitle = document.querySelector('.popup__input_type_title');
const saveButtonPopupAdd = document.querySelector('.popup__save-button_type_add')
const errorMessageContainers = document.querySelectorAll('.popup__error')

//переменные из попапа с картинкой
const popupImage = document.querySelector('.popup_type_view');
const popupContainerImage = document.querySelector('.popup__container_image');
const imageFull = document.querySelector('.popup__image')
const titleFull = document.querySelector('.popup__title_full')
const closeButtonImage = document.querySelector('.popup__close-button_type_image');

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

//открыть любой попап
function openPopup(popup) {
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
  disableButton(saveButtonPopupAdd, { inactiveButtonClass: validationConfig.inactiveButtonClass });                    // Отключить кнопку при вызове окна

  errorMessageContainers.forEach(deleteErrorMessages);

  undecorateInputs(cardNewImage, { inputErrorClass: validationConfig.inputErrorClass })
  undecorateInputs(cardNewTitle, { inputErrorClass: validationConfig.inputErrorClass })

  openPopup(popupAdd);
  resetInput(addForm);
};

addButton.addEventListener('click', openAddForm);

//Клонировать template, наполнить именем и ссылкой
function createCard(card) {
  const newCard = document.querySelector('#cardTemplate').content.cloneNode(true);

  const cardHeading = newCard.querySelector('.element__title');
  cardHeading.textContent = card.name;

  const cardImage = newCard.querySelector('.element__image');
  cardImage.setAttribute('src', card.link);
  cardImage.setAttribute('alt', card.name);

  //Лайкнуть
  const likeButton = newCard.querySelector('.element__like-button');

  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle('element__like_button_active');
  });

  //Удалить
  const trashButton = newCard.querySelector('.element__trash-button');

  trashButton.addEventListener("click", function () {
    trashButton.closest("li").remove();
  });

  //Открыть попап с картинкой
  cardImage.addEventListener("click", function () {
    openPopup(popupImage);

    imageFull.setAttribute('src', card.link);
    cardImage.setAttribute('alt', card.name);
    titleFull.textContent = card.name;
  });

  return newCard;
};

//Добавить начальные карточки
function addInitialCards(cardsToAdd) {
  cardArea.append(cardsToAdd);
}

//Отразить начальные карточки из массива на страницу
function renderInitialCard(card) {
  const newCard = createCard(card);
  addInitialCards(newCard);
}

initialCards.forEach(renderInitialCard);

//добавить новые карточки
function addAddedCards(card) {
  cardArea.prepend(card);
}

//Отразить новую карточку на страницу
function renderAddedCard(event) {
  event.preventDefault();

  const newCard = createCard({
    name: cardNewTitle.value,
    link: cardNewImage.value,
  });

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

//Валидация
const validationConfig = {
  formSelector: '.popup__form',                                 //Селектор формы
  inputSelector: '.popup__input',                              //Селектор полей ввода
  submitButtonSelector: '.popup__save-button',                //Селектор кнопки
  inactiveButtonClass: 'popup__save-button_disabled',        //Класс неактивной кнопки
  inputErrorClass: 'popup__input_type_error',               //Класс поля ввода с ошибкой
  errorClass: 'popup__error_visible'                       //Класс текста ошибки
};

enableValidation(validationConfig)
