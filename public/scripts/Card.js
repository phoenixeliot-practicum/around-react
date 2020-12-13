const ESC_KEYCODE = 27;
const imageModalWindow = document.querySelector(".popup_type_image");
const imageElement = imageModalWindow.querySelector(".popup__image");
const imageCaption = imageModalWindow.querySelector(".popup__caption");

const isEscEvent = (evt, action) => {
  const activePopup = document.querySelector(".popup_is-opened");
  if (evt.which === ESC_KEYCODE) {
    action(activePopup);
  }
};

const handleEscUp = (evt) => {
  evt.preventDefault();
  isEscEvent(evt, closeModalWindow);
};

const openModalWindow = () => {
  imageModalWindow.classList.add("popup_is-opened");
  document.addEventListener("keyup", handleEscUp);
};

const closeModalWindow = () => {
  imageModalWindow.classList.remove("popup_is-opened");
  document.removeEventListener("keyup", handleEscUp);
};

imageModalWindow.addEventListener("click", (evt) => {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close")
  ) {
    closeModalWindow(imageModalWindow);
  }
});

// Темплейты
export default class Card {
  constructor(
    data,
    templateSelector,
    imageElementSelector,
    imageCaptionSelector
  ) {
    this.data = data;
    this.templateSelector = templateSelector;
    this.imageElementSelector = imageElementSelector;
    this.imageCaptionSelector = imageCaptionSelector;
  }

  render() {
    const template = document
      .querySelector(this.templateSelector)
      .content.querySelector(".places__item");
    const cardElement = template.cloneNode(true);
    const likeButton = cardElement.querySelector(".card__like-button");
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const cardImage = cardElement.querySelector(".card__image");

    cardImage.style.backgroundImage = `url(${this.data.link})`;
    cardElement.querySelector(".card__title").textContent = this.data.name;

    likeButton.addEventListener("click", this._handleLikeIcon);
    deleteButton.addEventListener("click", this._handleDeleteCard);
    cardImage.addEventListener("click", () => this._handlePreviewPicture());

    this.element = cardElement;
    return cardElement;
  }

  // Хэндлеры
  _handleLikeIcon(evt) {
    evt.target.classList.toggle("card__like-button_is-active");
  }

  _handleDeleteCard(evt) {
    evt.target.closest(".card").remove();
  }

  _handlePreviewPicture() {
    imageElement.src = this.data.link;
    imageElement.alt = `Изображение ${this.data.name}`;
    imageCaption.textContent = this.data.name;
    openModalWindow(imageModalWindow);
  }
}
