let openButtonEditForm = document.querySelector('.profile__button')
let popupDisplayClass = document.querySelector('.popup_hidden');

openButtonEditForm.addEventListener('click', function () {
    popupDisplayClass.classList.remove('popup_hidden');
})

let closeEdit = document.querySelector('.popup__close');

closeEdit.addEventListener('click', function () {
    popupDisplayClass.classList.add('popup__hidden');
})

let userName = "Жак-Ив Кусто";
let userDetails = "Исследователь океана"
let userNameElement = document.querySelector('.profile__name');
let userDetailsElement = document.querySelector('.profile__details')
let userNameEditForm = document.querySelector('.popup__name');
let userDetailsEditForm = document.querySelector('.popup__details');

userNameElement.textContent = userName;
userDetailsElement.textContent = userDetails;
userNameEditForm.value = userName;
userDetailsEditForm.value = userDetails;

let editForm = document.querySelector('.popup__form');
let saveButtonEditForm = document.querySelector('.popup__saveButton');

saveButtonEditForm.addEventListener('click', function () {
    userNameElement.textContent = userNameEditForm.value;
    userDetailsElement.textContent = userDetailsEditForm.value;
    popupDisplayClass.classList.add('popup_hidden');
})