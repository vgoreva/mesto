// переменные из профиля
let openButtonEditForm = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');
let userNameElement = document.querySelector('.profile__name');
let userDetailsElement = document.querySelector('.profile__details');

//переменные из всплывающего окна редактирования профиля
let popupEdit = document.querySelector('.popup_type_edit');
let editForm = document.querySelector('.popup__form_type_edit');
let userNameEditForm = document.querySelector('.popup__input_type_name');
let userDetailsEditForm = document.querySelector('.popup__input_type_details');
let closeButtonEdit = document.querySelector('.popup__close-button_type_edit');

//переменные из всплвающенго окна добавления фото
let popupAdd = document.querySelector('.popup_type_add');
let closeButtonAdd = document.querySelector('.popup__close-button_type_add');
let addForm = document.querySelector('.popup__form_type_add')
let cardNewImage = document.querySelector('.popup__input_type_link');
let cardNewTitle = document.querySelector('.popup__input_type_title');

//переменые из карточек
let cardArea = document.querySelector('.location__elements');
let card = document.querySelectorAll('.element')

const initialCards = [
  {
    name: 'Новая Аквитания',
    link: '../images/bordeux.jpg'
  },
  {
    name: 'Большой Барьерный риф',
    link: '../images/riefs.jpg'
  },
  {
    name: 'Амазония',
    link: '../images/amazon.jpg'
  },
  {
    name: 'Мадагаскар',
    link: '../images/madagacsar.jpg'
  },
  {
    name: 'Новая Зеландия',
    link: '../images/new_zealand.jpg'
  },
  {
    name: 'Антарктида',
    link: '../images/antarctica.jpg'
  }
];



//открыть окно редактирование профиля с данными
function openEditForm() {
  popupEdit.classList.add('popup_opened');
  userNameEditForm.value = userNameElement.textContent;
  userDetailsEditForm.value = userDetailsElement.textContent;
}

openButtonEditForm.addEventListener('click', openEditForm);

//закрыть окно редактирования профиля
function closePopup() {
  popupEdit.classList.remove('popup_opened');
}

closeButtonEdit.addEventListener('click', closePopup);

// изменить данные в профиле и сохранить изменения
function handleFormSubmit(event) {
  event.preventDefault();
  userNameElement.textContent = userNameEditForm.value;
  userDetailsElement.textContent = userDetailsEditForm.value;
  closePopup();
}

editForm.addEventListener('submit', handleFormSubmit)

//открыть окно добавления карточки
function openAddForm() {
  popupAdd.classList.add('popup_opened');
}

addButton.addEventListener('click', openAddForm);

//закрыть окно добавления карточки
function closeAddForm() {
  popupAdd.classList.remove('popup_opened');
}

closeButtonAdd.addEventListener('click', closeAddForm);

// Добавить 6 карточек в начале
function renderCard() {
  for (let i = 0; i < initialCards.length; i++) {
    cardArea.innerHTML += `
  <li class="element">
      <img class="element__image" alt=${initialCards[i].name} src=${initialCards[i].link}>
      <button class="element__trash-button" type="button" aria-label="trash"></button>
      <h2 class="element__title">${initialCards[i].name}</h2>
      <button class="element__like-button" type="button" aria-label="like"></button>
  </li>`
  }
}

renderCard();

// Создать карточку
function createCard(event) {
  event.preventDefault();
  let data = {
    name: cardNewTitle.value,
    link: cardNewImage.value,
  }
  initialCards.unshift(data);
  cardArea.innerHTML = '';
  renderCard();
  closeAddForm();
  cardNewImage.value = '';
  cardNewTitle.value = '';
}

addForm.addEventListener('submit', createCard);

//Поставить лайк
function likeCard() {
  let likeButton = document.querySelectorAll('.element__like-button');
  for (let i = 0; i < likeButton.length; i++) {
    likeButton[i].addEventListener("click", function () {
      let thisLikeButton = likeButton[i];
      thisLikeButton.classList.toggle('element__like_button_active');
    });
  }
}
likeCard()

//Удалить карточку
function removeCard() {
  let trashButton = document.querySelectorAll('.element__trash-button');
  for (let i = 0; i < trashButton.length; i++) {
    trashButton[i].addEventListener("click", function () {
      let thisTrashButton = trashButton[i];
      thisTrashButton.parentElement.remove()
    });
  }
}
removeCard()

//Открыть попап с картинкой
let cardImage = document.querySelectorAll('.element__image')
let popupImage = document.querySelector('.popup_type_view')
let popupContainerImage = document.querySelector('.popup__container_image')
function openImage() {
  for (let i = 0; i < cardImage.length; i++) {
    cardImage[i].addEventListener("click", function () {
      let thisCardImage = cardImage[i];
      thisCardImage.addEventListener('click', openImage)
      popupImage.classList.add('popup_opened');
      popupContainerImage.insertAdjacentHTML ("beforeEnd",
      `<img class="popup__image" alt=${initialCards[i].name} src=${initialCards[i].link}>
      <h2 class="popup__title popup__title_full">${initialCards[i].name}</h2>`
    );
  })
}
}

openImage();

let closeButtonImage = document.querySelector('.popup__close-button_type_image');
console.log(closeButtonImage);

//Закрыть попап с картинкой
function closeImage() {
 let closeButtonImage = document.querySelector('.popup__close-button_type_image');
 closeButtonImage.addEventListener('click', function(){
  let popupImageFull = document.querySelector('.popup__image');
  let popupTitleFull = document.querySelector('.popup__title_full');
  popupImageFull.remove();
  popupTitleFull.remove();
 popupImage.classList.remove('popup_opened');
});
}
closeImage()

//Плавное