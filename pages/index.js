let openButtonEditForm = document.querySelector('.profile__edit-button')
let popupDisplayClass = document.querySelector('.popup');
let userNameElement = document.querySelector('.profile__name');
let userDetailsElement = document.querySelector('.profile__details');
let editForm = document.querySelector('.popup__form');
let userNameEditForm = document.querySelector('.popup__input_name');
let userDetailsEditForm = document.querySelector('.popup__input_details');
let saveButtonEditForm = document.querySelector('.popup__save-button');
let closeButtonEditForm = document.querySelector('.popup__close-button');

openButtonEditForm.onclick = function openEditForm() {
    popupDisplayClass.classList.add('popup_opened');
    userNameEditForm.value = userNameElement.textContent;
    userDetailsEditForm.value = userDetailsElement.textContent;
}

closeButtonEditForm.onclick = function closeEditForm() {
    popupDisplayClass.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    userNameEditForm.value = userNameElement.textContent;
    userDetailsEditForm.value = userDetailsElement.textContent;
}

saveButtonEditForm.addEventListener('submit', handleFormSubmit); 