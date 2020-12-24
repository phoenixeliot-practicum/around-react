export default class FormValidator {
  constructor(settings, formElement) {
    this.settings = settings;
    this.formElement = formElement;
  }

  enableValidation() {
    this.formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this.setEventListeners();
  }

  setEventListeners() {
    const inputList = Array.from(
      this.formElement.querySelectorAll(this.settings.inputSelector)
    );
    const buttonElement = this.formElement.querySelector(
      this.settings.submitButtonSelector
    );

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.checkInputValidity(inputElement);
        this.toggleButtonState(inputList, buttonElement);
      });
    });
  }

  showInputError(inputElement, errorMessage) {
    const errorElement = this.formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this.settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.settings.errorClass);
  }

  hideInputError(inputElement) {
    const errorElement = this.formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this.settings.inputErrorClass);
    errorElement.classList.remove(this.settings.errorClass);
    errorElement.textContent = "";
  }

  checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this.showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.hideInputError(inputElement);
    }
  }

  hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  toggleButtonState(inputList, buttonElement) {
    if (this.hasInvalidInput(inputList)) {
      buttonElement.classList.add(this.settings.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this.settings.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }
}
