export class Base extends HTMLElement {
  constructor(props) {
    super();
    this.init(this.parseAttributes);
    this.innerHTML = this.render();
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    this.state[attribute] = newValue;
    this.updated(attribute, oldValue, newValue);
  }

  init() { }

  updated() { }

  get parseAttributes() {
    return Object.keys(this.attributes).reduce((obj, index) => {
      const { name, value } = this.attributes.item(index);
      obj[name] = value;
      return obj;
    }, {});
  }
}
