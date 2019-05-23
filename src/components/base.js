export class Base extends HTMLElement {
  constructor(props) {
    super();
    this.init(this.parseAttributes);

    /** Shadow DOM */

    // Get theme from environment
    const { THEME = 'minimal' } = process.env;
    const style = document.createElement('style');

    if (THEME) {
      style.textContent = `@import url('${__dirname}css/${THEME}.css')`;
    }

    // Create DOM tree from string
    const template = document.createRange().createContextualFragment(this.render());

    // Add style
    template.prepend(style);

    // Attach template to shadow
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

  get parseAttributes() {
    return Object.keys(this.attributes).reduce((obj, index) => {
      const { name, value } = this.attributes.item(index);
      obj[this.toCamel(name)] = value;
      return obj;
    }, {});
  }

  toCamel(str = '') {
    return str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
  }
}
