export default class UserInfo {
    constructor({ nameSelector, detailsSelector, avatarSelector }) {
        this._name = document.querySelector(nameSelector);
        this._details = document.querySelector(detailsSelector)
        this._avatar =  document.querySelector(avatarSelector)
    }

    getUserInfo(nameInput, detailsInput) { 
        nameInput.value = this._name.textContent;
        detailsInput.value = this._details.textContent;
    }
    
    setUserInfo({username, details, avatar}) {
        this._name.textContent = username;
        this._details.textContent = details;
        this._avatar.src = avatar;
    }

    setid (id) {
        this._id = id;
    }
    
    getid() {
        return this._id;
    }
}