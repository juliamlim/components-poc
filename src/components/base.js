export class Base extends HTMLElement {
  constructor(props) {
    super();
    this.init(this.parseAttributes);

    // /** Light DOM */
    // this.innerHTML = this.render();

    /** Shadow DOM */
    const template = document.createRange().createContextualFragment(this.render());
    this.attachShadow({mode: 'open'}).appendChild(template.cloneNode(true));

    // Set the root element
    this.element = this.shadowRoot.querySelector('style').nextElementSibling;
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    this.state[attribute] = newValue;
    this.updated(attribute, oldValue, newValue);
  }

  init() { }

  updated() { }

  get window() {
    return window;
  }

  get parseAttributes() {
    return Object.keys(this.attributes).reduce((obj, index) => {
      const { name, value } = this.attributes.item(index);
      obj[this.toCamel(name)] = value;
      return obj;
    }, {});
  }

  setListener(target, event, newValue, oldValue = () => {}) {
    console.log(target, event, newValue, oldValue);

    if (newValue) {
      target.removeEventListener(event, oldValue);
      target.addEventListener(event, newValue);
    } else {
      target.addEventListener(event, oldValue);
    }
  }

  toCamel(str = '') {
    return str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
  }
}
