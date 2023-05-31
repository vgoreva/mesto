
export default class Card {
    constructor(data, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
        this._data = data;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;
    }

    createCard() {
        this._card = this._getTemplate();

        this._likeButton = this._card.querySelector('.element__like-button');
        this._deleteButton = this._card.querySelector('.element__trash-button');
        this._image = this._card.querySelector('.element__image');
        this._counter = this._card.querySelector('.element__counter ');

        this._hideDeleteButton();
        this._checkLike();

        this._card.querySelector('.element__title').textContent = this._data.name;
        this._image.setAttribute('src', this._data.link);
        this._image.setAttribute('alt', this._data.name);

        this._setEventListners(this._card);
    }

    _getTemplate() {
        this._cardTemplate = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
        return this._cardTemplate
    }

    _setEventListners() {
        this._likeButton.addEventListener('click', this._clickOnLike);
        this._deleteButton.addEventListener('click', this._clickOnTrash);
        this._image.addEventListener('click', this._showCard);
    }

    _clickOnLike = () => {
        this._handleLikeClick(this._likeButton, this._data._id)
    }

    toggleLike(likes) {
        this._likeButton.classList.toggle('element__like_button_active');
        this._counter.textContent = likes.length;
    }

    _checkLike() {
        this._data.likes.forEach((item) => {
            if (item._id === this._data.myid) {
                this._likeButton.classList.add('element__like_button_active');
                return
            }
        })
        this._counter.textContent = this._data.likes.length;
    }

    _clickOnTrash = () => {
        this._handleDeleteClick({item: this, id: this._data._id})
    }

    _hideDeleteButton() {
        if (this._data.myid !== this._data.owner._id) {
            this._deleteButton.remove()
        }
    }

    _showCard = () => {
        this._handleCardClick(this._data);
    };

    removeCard () {
        this._card.remove();
    }

    getCard() {
        this.createCard()
        return this._card
    }

}

