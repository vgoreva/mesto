export default class UserInfo {
    constructor({ nameSelector, detailsSelector, avatarSelector }) {
        this._name = document.querySelector(nameSelector);
        this._details = document.querySelector(detailsSelector);
        this._avatar =  document.querySelector(avatarSelector);
    }

    getUserInfo() { 
        return {name: this._name.textContent, details: this._details.textContent};
    }
    
    setUserInfo({name, details, avatar}) {
        this._name.textContent = name;
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