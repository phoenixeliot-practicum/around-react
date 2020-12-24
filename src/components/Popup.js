const ESC_KEYCODE = 27;

export default class Popup {
  constructor(popupSelector) {
    this.element = document.querySelector(popupSelector);
  }
  open() {
    this.element.classList.add("popup_is-opened");
  }
  close() {
    this.element.classList.remove("popup_is-opened");
  }
  _handleEscClose(evt) {
    if (evt.which === ESC_KEYCODE) {
      this.close();
    }
  }
  setEventListeners() {
    document.addEventListener("keyup", this._handleEscClose.bind(this));
    this.element.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("popup") ||
        evt.target.classList.contains("popup__close")
      ) {
        this.close();
      }
    });
  }
}
