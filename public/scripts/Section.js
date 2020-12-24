export default class Section {
  constructor({ items, renderer }, sectionSelector) {
    this.items = items;
    this.renderer = renderer;
    this.sectionSelector = sectionSelector;
    this.element = document.querySelector(sectionSelector);
  }
  render() {
    this.items.forEach((item) => {
      this.element.append(this.renderer(item));
    });
  }
  addItem(item) {
    this.element.prepend(this.renderer(item));
  }
}
