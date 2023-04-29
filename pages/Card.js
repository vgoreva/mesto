import { popupImage } from './index.js'
import { imageFull } from './index.js'
import { titleFull } from './index.js'
import { openPopup } from './index.js'


class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
    }

    _likeCard() {
        this._card = document.querySelector(this._templateSelector).content.cloneNode(true);
        const likeButton = this._card.querySelector('.element__like-button');

        likeButton.addEventListener("click", function () {
            likeButton.classList.toggle('element__like_button_active');
        });
    }

    _deleteCard() {
        this._card = document.querySelector(this._templateSelector).content.cloneNode(true);
        const trashButton = this._card.querySelector('.element__trash-button');

        trashButton.addEventListener("click", function () {
            trashButton.closest("li").remove();
        });

    }

    _openFullCard() {
        this._card = document.querySelector(this._templateSelector).content.cloneNode(true);
        const smallImage = this._card.querySelector('.element__image');

        smallImage.addEventListener("click", function () {
            openPopup(popupImage);

            imageFull.setAttribute('src', this._link);
            imageFull.setAttribute('alt', this._name);
            titleFull.textContent = this._name;
        });
    
    }
    _createCard() {
        this._card = document.querySelector(this._templateSelector).content.cloneNode(true);

        this._openFullCard()
        this._likeCard();
        this._deleteCard();

        this._card.querySelector('.element__title').textContent = this._name;

        this._card.querySelector('.element__image').setAttribute('src', this._link);
        this._card.querySelector('.element__image').setAttribute('alt', this._name);
    }

    getCard() {
        this._createCard()
        return this._card
    }

}

export default Card