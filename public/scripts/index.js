import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import Section from "./Section.js";

const ESC_KEYCODE = 27;

const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const openEditFormButton = document.querySelector(".profile__edit-button");
const openCardFormButton = document.querySelector(".profile__add-button");

// const profileTitle = document.querySelector(".profile__title");
// const profileDescription = document.querySelector(".profile__description");

const section = new Section(
  {
    items: initialCards,
    renderer: (data) =>
      new Card(data, "#card-template", ".popup_type_image").render(),
  },
  ".places__list"
);
section.render();

const editFormPopup = new PopupWithForm(".popup_type_edit", (data) => {
  userInfo.setUserInfo(data);
});
editFormPopup.setEventListeners();

const addCardFormPopup = new PopupWithForm(".popup_type_new-card", (data) => {
  section.addItem(data);
});
addCardFormPopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

// EventListeners
openEditFormButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  editFormPopup.open(data);
});

openCardFormButton.addEventListener("click", () => {
  addCardFormPopup.open();
});

// Set up form validation
const formSelector = ".popup__form";

const settings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const getFormList = Array.from(document.querySelectorAll(formSelector));
getFormList.forEach((formElement) => {
  const validator = new FormValidator(settings, formElement);
  validator.enableValidation();
});

/* Саммари:
 * Добавлены следующие файлы:
 * popup__button.css popup__button_disabled.css
 * popup__error.css popup__error_visible.css
 * popup__label.css
 * popup__input_type_error.css
 *
 * Изменена верстка модальных окон, добавлены HTML5-атрибуты: длина строки, novalidate, регулярные выражения.
 *
 * index.js терпит минимальный рефактор. В задании 6 проектной работы нет указаний на рефактор index.js.
 * Код выше -- ожидаемый результат от студента.
 *
 * Делегирование - нежелательный, но необходимый элемент решения данной проектной работы.
 * Функция работы с модальными окнами видоизменена, поделена на две.
 *
 * */
