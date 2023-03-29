// переменные из профиля
const openButtonEditForm = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const userNameElement = document.querySelector('.profile__name');
const userDetailsElement = document.querySelector('.profile__details');

//все попапы
const anyPopups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__close-button')

//переменные из всплывающего окна редактирования профиля
const popupEdit = document.querySelector('.popup_type_edit');
const editForm = document.querySelector('.popup__form_type_edit');
const userNameEditForm = document.querySelector('.popup__input_type_name');
const userDetailsEditForm = document.querySelector('.popup__input_type_details');

//переменные из всплвающенго окна добавления фото
const popupAdd = document.querySelector('.popup_type_add');
const addForm = document.querySelector('.popup__form_type_add')
const cardNewImage = document.querySelector('.popup__input_type_link');
const cardNewTitle = document.querySelector('.popup__input_type_title');

//переменные из попапа с картинкой
const popupImage = document.querySelector('.popup_type_view');
const popupContainerImage = document.querySelector('.popup__container_image');
const imageFull = document.querySelector('.popup__image')
const titleFull = document.querySelector('.popup__title_full')

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
}

//закрыть любой попап
function closePopup(popup) {
  popup.classList.remove('popup_opened')
};

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});


//открыть окно редактирование профиля с данными
function openEditPopup() {
  openPopup(popupEdit);
  userNameEditForm.value = userNameElement.textContent;
  userDetailsEditForm.value = userDetailsElement.textContent;
};

openButtonEditForm.addEventListener('click', openEditPopup);

// изменить данные в профиле и сохранить изменения
function handleFormSubmit(event) {
  event.preventDefault();
  userNameElement.textContent = userNameEditForm.value;
  userDetailsElement.textContent = userDetailsEditForm.value;
  closePopup(popupEdit);
};

editForm.addEventListener('submit', handleFormSubmit);

//открыть окно добавления карточки
function openAddForm() {
  openPopup(popupAdd);
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

  //лайки
  const likeButton = newCard.querySelector('.element__like-button');

  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle('element__like_button_active');
  });

  //удаление
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

//очистить инпуты
function resetInput() {
  addForm.reset();
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
  resetInput();
}

addForm.addEventListener('submit', renderAddedCard);

//Закрыть попап с картинкой
const closeButtonImage = document.querySelector('.popup__close-button_type_image');