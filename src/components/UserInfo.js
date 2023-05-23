export default class UserInfo {
    constructor({ nameSelector, detailsSelector }) {
        this._name = document.querySelector(nameSelector);
        this._details = document.querySelector(detailsSelector)
    }

    getUserInfo() { //Вернуть данные со страницы
        return {
            name: this._name.textContent,
            details: this._details.textContent,
        }
    }

    setUserInfo(data) { // Внести новые данные
        this._name.textContent = data.name;
        this._details.textContent = data.details;
    }
}