import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this.handleSubmit = handleSubmit;
    this.titleInput = this._element.querySelector(".popup__input_type_name");
    this.descriptionInput = this._element.querySelector(
      ".popup__input_type_description"
    );
  }
  _getInputValues() {
    return {
      title: this.titleInput.value,
      description: this.descriptionInput.value,
    };
  }
  setEventListeners() {
    super.setEventListeners();
    this._element.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.handleSubmit(this._getInputValues());
      this.close();
    });
  }
  open({ title, description }) {
    this.titleInput.value = title;
    this.descriptionInput.value = description;
    super.open();
  }
  close() {
    this.titleInput.value = "";
    this.descriptionInput.value = "";
    super.close();
  }
}
