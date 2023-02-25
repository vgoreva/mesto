let openButtonEditForm = document.querySelector('.profile__edit-button')
let popup = document.querySelector('.popup');
let userNameElement = document.querySelector('.profile__name');
let userDetailsElement = document.querySelector('.profile__details');
let editForm = document.querySelector('.popup__form');
let userNameEditForm = document.querySelector('.popup__input_type_name');
let userDetailsEditForm = document.querySelector('.popup__input_type_details');
let closeButtonEditForm = document.querySelector('.popup__close-button');

openButtonEditForm.addEventListener('click', function openEditForm() {
    popup.classList.add('popup_opened');
    userNameEditForm.value = userNameElement.textContent;
    userDetailsEditForm.value = userDetailsElement.textContent;
}
)

function closeEditForm() {
    popup.classList.remove('popup_opened');
}

closeButtonEditForm.addEventListener('click', closeEditForm);

function handleFormSubmit(event) {
        event.preventDefault();
        userNameElement.textContent = userNameEditForm.value;
        userDetailsElement.textContent= userDetailsEditForm.value;
        closeEditForm();
      }

editForm.addEventListener('submit',handleFormSubmit)