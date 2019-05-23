import { Base } from '../base';

class ImageWrap extends Base {
  static get observedAttributes() {
    return ['src', 'alt', 'type'];
  }

  init(attributes) {
    this.state = attributes;
  }

  render() {
    return `
      <div class="image-wrap ${this.state.type}">
        <img src="${this.state.src}" alt="${this.state.alt}" />
      </div>
    `;
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    attribute = this.toCamel(attribute);

    this.state[attribute] = newValue;

    switch (attribute) {
      case 'src':
        this.element.querySelector('img').setAttribute('src', newValue);
        break;
      case 'alt':
        this.element.querySelector('img').setAttribute('alt', newValue);
        break;
    }
  }
};

export default customElements.define('image-wrap', ImageWrap);
