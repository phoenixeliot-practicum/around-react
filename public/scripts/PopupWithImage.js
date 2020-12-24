import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.imageElement = this._element.querySelector(".popup__image");
    this.imageCaption = this._element.querySelector(".popup__caption");
  }

  open({ name, link }) {
    this.imageElement.src = link;
    this.imageElement.alt = `Изображение ${name}`;
    this.imageCaption.textContent = name;
    super.open();
  }
}
