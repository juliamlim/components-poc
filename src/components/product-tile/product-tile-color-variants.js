import { Base } from '../base';

import './product-tile-color-swatch';

class ProductTileColorVariants extends Base {
  static get observedAttributes() {
    return ['colors'];
  }

  init(attributes) {
    this.state = this.parseState(attributes);
  }

  render() {
    const { colors = [], toggle } = this.state;

    return `
      <ul class="product-tile-color-variants">
        ${
          Array.isArray(this.state.colors) ?
            this.state.colors.map(color => `<product-tile-color-swatch product="${color.product}" name="${color.name}" hex="${color.hex}"></product-tile-color-swatch>`).join('')
          : ''
        }
        <li style="cursor: pointer" class="see ${toggle ? 'more' : 'less' }">${toggle ? '+' : '-' }</li>
      </ul>
    `;
  }

  connectedCallback() {
    this.element.querySelector('.see').addEventListener('click', () => this.state.toggle = !this.state.toggle);
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    attribute = this.toCamel(attribute);
    this.state[attribute] = this.parseState({ [attribute]: newValue })[attribute];
  }

  parseState(state = {}) {
    return {
      toggle: true,
      colors: typeof state.colors === 'string' ? JSON.parse(state.colors) : state.colors || []
    };
  }

}

export default customElements.define('product-tile-color-variants', ProductTileColorVariants);
