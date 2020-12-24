export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this.data = data;
    this.templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;
  }

  render() {
    const template = document
      .querySelector(this.templateSelector)
      .content.querySelector(".places__item");
    const cardElement = template.cloneNode(true);
    const likeButton = cardElement.querySelector(".card__like-button");
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const cardImage = cardElement.querySelector(".card__image");

    cardImage.src = this.data.link;
    cardElement.querySelector(".card__title").textContent = this.data.name;

    likeButton.addEventListener("click", this._handleLikeIcon);
    deleteButton.addEventListener("click", this._handleDeleteCard);
    cardImage.addEventListener("click", () => this.handleCardClick(this.data));

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
}
