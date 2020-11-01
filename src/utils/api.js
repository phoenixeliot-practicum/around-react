import { renderLoading } from "./utils.js";

class Api {
  constructor({ address, token, groupId }) {
    // стандартная реализация -- объект options
    this._token = token;
    this._groupId = groupId;
    this._address = address;

    // Запросы в примере работы выполняются к старому Api, в новом URL изменены.
  }

  getAppInfo() {
    return Promise.all([this.getCardList(), this.getUserInfo()]);
  }

  getCardList() {
    return fetch(`${this._address}/cards`)
      .then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
      .catch((err) => console.log(`Загрузка карточек: ${err}`));
  }

  addCard({ name, link }) {
    renderLoading(true);

    return fetch(`${this._address}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
      .catch((err) => console.log(`Добавление карточки: ${err}`));
  }

  removeCard(cardID) {
    return fetch(`${this._address}/cards/${cardID}`, {
      method: "DELETE",
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
      .catch((err) => console.log(`При удалении карточки: ${err}`));
  }

  getUserInfo() {
    return fetch(`${this._address}/users/me`, {})
      .then((res) => {
        debugger;
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        debugger;
        console.log(`Загрузка информации о пользователе: ${err}`);
      });
  }

  setUserInfo({ name, about }) {
    renderLoading(true);

    return fetch(`${this._address}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
      .catch((err) => console.log(`При обновлении информации о пользователе: ${err}`));
  }

  setUserAvatar({ avatar }) {
    renderLoading(true);

    return fetch(`${this._address}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar,
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
      .catch((err) => console.log(`При изменении аватара пользователя: ${err}`));
  }

  changeLikeCardStatus(cardID, like) {
    console.log(cardID, like);
    // Обычная реализация: 2 разных метода для удаления и постановки лайка.
    return fetch(`${this._address}/cards/like/${cardID}`, {
      method: like ? "PUT" : "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
      .catch((err) => console.log(`Изменения статуса лайка: ${err}`));
  }
}

const api = new Api({
  address: "http://localhost:3000",
});

export default api;
