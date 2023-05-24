
export default class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._data = data;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        this._cardTemplate = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
        return this._cardTemplate
    }

    createCard() {
        this._card = this._getTemplate();

        this._likeButton = this._card.querySelector('.element__like-button');
        this._deleteButton = this._card.querySelector('.element__trash-button');
        this._image = this._card.querySelector('.element__image');

        this._card.querySelector('.element__title').textContent = this._data.name;
        this._image.setAttribute('src', this._data.link);
        this._image.setAttribute('alt', this._data.name);

        this._setEventListners(this._card);
    }

    _setEventListners() {
        this._likeButton.addEventListener('click', this._likeCard);
        this._deleteButton.addEventListener('click', this._deleteCard);
        this._image.addEventListener('click', this._showCard);
    }

    _likeCard = () => {
        this._likeButton.classList.toggle('element__like_button_active');
    }

    _deleteCard = () => {
        this._card.remove();
    }

    _showCard = () => {
        this._handleCardClick(this._data);
    };

    getCard() {
        this.createCard()
        return this._card
    }

}

