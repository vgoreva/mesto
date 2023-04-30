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

    _getTemplate() {
        this._cardTemplate = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
        return this._cardTemplate
    }

    _createCard() {
        this._card = this._getTemplate();

        this._setEventListners(this._card);

        this._likeButton = this._card.querySelector('.element__like-button');
        this._deleteButton = this._card.querySelector('.element__trash-button');
        this._image = this._card.querySelector('.element__image');
        this._card.querySelector('.element__title').textContent = this._name;

        this._card.querySelector('.element__image').setAttribute('src', this._link);
        this._card.querySelector('.element__image').setAttribute('alt', this._name);

    }

    _setEventListners() {
        this._card.querySelector('.element__like-button').addEventListener('click', () => { this._likeCard() });
        this._card.querySelector('.element__trash-button').addEventListener('click', () => { this._deleteCard() });
        this._card.querySelector('.element__image').addEventListener('click', () => { this._showCard() });

    }

    _likeCard = () => {
        this._likeButton.classList.toggle('element__like_button_active');
    }

    _deleteCard = () => {
        this._card.remove();
    }

    _showCard = () => {

        openPopup(popupImage);

        imageFull.setAttribute('src', this._link);
        imageFull.setAttribute('alt', this._name);
        titleFull.textContent = this._name;
    };

    getCard() {
        this._createCard()
        return this._card
    }

}

export default Card

