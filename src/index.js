import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import initialCards from "./initialCards.js";
import "./pages/index.css";

const openEditFormButton = document.querySelector(".profile__edit-button");
const openCardFormButton = document.querySelector(".profile__add-button");

const imagePopup = new PopupWithImage(".popup_type_image");
imagePopup.setEventListeners();

const renderCard = (data) => {
  return new Card(data, "#card-template", (data) => {
    imagePopup.open(data);
  }).render();
};

const section = new Section(
  { items: initialCards, renderer: renderCard },
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

const initialUserInfo = {
  name: "Johan Smithy",
  description: "Explorer Extraordinaire",
};

userInfo.setUserInfo(initialUserInfo);

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
