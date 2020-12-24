export default class UserInfo {
  constructor(selectors) {
    this.selectors = selectors;
    this.elements = {
      name: document.querySelector(selectors.nameSelector),
      description: document.querySelector(selectors.descriptionSelector),
    };
  }
  getUserInfo() {
    return Object.fromEntries(
      Object.entries(this.elements).map(([elementName, element]) => {
        return [elementName, element.textContent];
      })
    );
  }
  setUserInfo(data) {
    Object.keys(data).forEach((elementName) => {
      this.elements[elementName].textContent = data[elementName];
    });
  }
}
