export default class UserInfo {
    constructor({ nameSelector, detailsSelector, avatarSelector }) {
        this._name = document.querySelector(nameSelector);
        this._details = document.querySelector(detailsSelector)
        this._avatar = document.querySelector(avatarSelector)
    }

    setUserInfo({ username, details, avatar }) { // Внести новые данные
        this._name.textContent = username;
        this._details.textContent = details;
        this._avatar.src = avatar;
    }
}