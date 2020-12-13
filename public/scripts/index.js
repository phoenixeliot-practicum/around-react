const ESC_KEYCODE = 27;
// Константы

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

// Темплейты
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".places__item");

// Врапперы
const placesWrap = document.querySelector(".places__list");
const editFormModalWindow = document.querySelector(".popup_type_edit");
const cardFormModalWindow = document.querySelector(".popup_type_new-card");
const imageModalWindow = document.querySelector(".popup_type_image");
// С submit ребята еще плохо работают.

// Кнопки и прочие дом узлы
const openEditFormButton = document.querySelector(".profile__edit-button");
const openCardFormButton = document.querySelector(".profile__add-button");

// DOM узлы профиля
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Данные форм и элементы форм
const titleInputValue = editFormModalWindow.querySelector(
  ".popup__input_type_name"
);
const descriptionInputValue = editFormModalWindow.querySelector(
  ".popup__input_type_description"
);
const cardNameInputValue = cardFormModalWindow.querySelector(
  ".popup__input_type_card-name"
);
const cardLinkInputValue = cardFormModalWindow.querySelector(
  ".popup__input_type_url"
);
const imageElement = imageModalWindow.querySelector(".popup__image");
const imageCaption = imageModalWindow.querySelector(".popup__caption");
// решение на минималках. Конечно, студент может корректно обобрать велью инпутов в форме.

const getCardElement = (data) => {
  const cardElement = cardTemplate.cloneNode(true);
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.style.backgroundImage = `url(${data.link})`;
  cardElement.querySelector(".card__title").textContent = data.name;

  likeButton.addEventListener("click", handleLikeIcon);
  deleteButton.addEventListener("click", handleDeleteCard);
  cardImage.addEventListener("click", () => handlePreviewPicture(data));
  return cardElement;
};

const isEscEvent = (evt, action) => {
  const activePopup = document.querySelector(".popup_is-opened");
  if (evt.which === ESC_KEYCODE) {
    action(activePopup);
  }
};

const openModalWindow = (modalWindow) => {
  modalWindow.classList.add("popup_is-opened");
  document.addEventListener("keyup", handleEscUp);
};

const closeModalWindow = (modalWindow) => {
  modalWindow.classList.remove("popup_is-opened");
  document.removeEventListener("keyup", handleEscUp);
};

const renderCard = (data, wrap) => {
  wrap.prepend(getCardElement(data));
};

// Хэндлеры
const handleLikeIcon = (evt) => {
  evt.target.classList.toggle("card__like-button_is-active");
};

const handleDeleteCard = (evt) => {
  evt.target.closest(".card").remove();
};

const handlePreviewPicture = (data) => {
  imageElement.src = data.link;
  imageElement.alt = `Изображение ${data.name}`;
  imageCaption.textContent = data.name;
  openModalWindow(imageModalWindow);
};

const handleEscUp = (evt) => {
  evt.preventDefault();
  isEscEvent(evt, closeModalWindow);
};

const formSubmitHandler = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = titleInputValue.value;
  profileDescription.textContent = descriptionInputValue.value;
  closeModalWindow(editFormModalWindow);
};

const cardFormSubmitHandler = (evt) => {
  evt.preventDefault();
  renderCard(
    {
      name: cardNameInputValue.value,
      link: cardLinkInputValue.value,
    },
    placesWrap
  );
  closeModalWindow(cardFormModalWindow);
};

// EventListeners
editFormModalWindow.addEventListener("submit", formSubmitHandler);
cardFormModalWindow.addEventListener("submit", cardFormSubmitHandler);

openEditFormButton.addEventListener("click", () => {
  titleInputValue.value = profileTitle.textContent;
  descriptionInputValue.value = profileDescription.textContent;
  openModalWindow(editFormModalWindow);
});

openCardFormButton.addEventListener("click", () => {
  openModalWindow(cardFormModalWindow);
});

editFormModalWindow.addEventListener("click", (evt) => {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close")
  ) {
    closeModalWindow(editFormModalWindow);
  }
});
cardFormModalWindow.addEventListener("click", (evt) => {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close")
  ) {
    closeModalWindow(cardFormModalWindow);
  }
});
imageModalWindow.addEventListener("click", (evt) => {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close")
  ) {
    closeModalWindow(imageModalWindow);
  }
});

// Render
initialCards.forEach((data) => {
  renderCard(data, placesWrap);
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
