export class Base extends HTMLElement {
    constructor(props) {
      super();

      this.init(this.parsedAttributes);
      this.innerHTML = this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      this.state[name] = newValue;
      this.updated(name, oldValue, newValue);
    }

    init() { }

    updated() { }

    get parsedAttributes() {
      return Object.keys(this.attributes).reduce((obj, index) => {
        const { name, value } = this.attributes.item(index);
        obj[name] = value;
        return obj;
      }, {});
    }
}
