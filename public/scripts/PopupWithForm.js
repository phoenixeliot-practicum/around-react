import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this.inputs = {};
    this._element.querySelectorAll("form input").forEach((input) => {
      this.inputs[input.getAttribute("name")] = input;
    });
    this.handleSubmit = handleSubmit;
  }
  _getInputValues() {
    const values = {};
    Object.keys(this.inputs).forEach((inputName) => {
      values[inputName] = this.inputs[inputName].value;
    });
    return values;
  }
  setEventListeners() {
    super.setEventListeners();
    this._element.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.handleSubmit(this._getInputValues());
      this.close();
    });
  }
  open(data = {}) {
    Object.keys(this.inputs).forEach((inputName) => {
      this.inputs[inputName].value = data[inputName] || "";
    });
    super.open();
  }
  close() {
    Object.keys(this.inputs).forEach((inputName) => {
      this.inputs[inputName].value = "";
    });
    super.close();
  }
}
