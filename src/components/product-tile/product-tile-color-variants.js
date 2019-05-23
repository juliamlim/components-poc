import { Base } from '../base';

import './product-tile-color-swatch';

class ProductTileColorVariants extends Base {
  static get observedAttributes() {
    return ['colors', 'display'];
  }

  init(attributes) {
    this.state = this.parseState(attributes);
  }

  render() {
    const { colors = [], toggle } = this.state;

    return `
      <ul class="product-tile-color-variants">
        ${ this.colorSwatches(colors) }
        ${
          this.state.colors.length > 5 ?
              `<li style="cursor: pointer" class="product-tile-color-swatch see ${toggle ? 'more' : 'less' }">${toggle ? '+' : '-' }</li>`
          : ''
        }
      </ul>
    `;
  }

  connectedCallback() {
    // this.element.querySelector('.see').addEventListener('click', () => this.state.toggle = !this.state.toggle);
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    attribute = this.toCamel(attribute);
    this.state[attribute] = this.parseState({ [attribute]: newValue })[attribute];
  }

  parseState(state = {}) {
    return {
      toggle: true,
      display: state.display || 5,
      colors: typeof state.colors === 'string' ? JSON.parse(state.colors) : state.colors || []
    };
  }

  colorSwatches(colors = []) {
    let swatches = [];

    let display = this.state.display > colors.length ? colors.length : this.state.display;

    for (let i = 0; i < display; i++) {
      const color = colors[i];
      swatches.push(`<product-tile-color-swatch product="${color.product}" name="${color.name}" hex="${color.hex}"></product-tile-color-swatch>`);
    }

    return swatches.join('');
  }
}

export default customElements.define('product-tile-color-variants', ProductTileColorVariants);
