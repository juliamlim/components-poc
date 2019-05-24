import { Base } from '../base';

import './color-swatch';

class ColorVariants extends Base {
  static get observedAttributes() {
    return ['colors', 'display'];
  }

  init(attributes) {
    this.state = this.parseState(attributes);
  }

  render() {
    const { colors = [], toggle } = this.state;

    return `
      <ul class="color-variants">
        ${ this.colorSwatches(colors) }
        ${
          this.state.more ?
            `<slot name="more">
              <li class="color-swatch see-more">+${this.state.more}</li>
            </slot>`
          : ''
        }
      </ul>
    `;
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    attribute = this.toCamel(attribute);
    this.state[attribute] = this.parseState({ [attribute]: newValue })[attribute];
  }

  parseState(state = {}) {
    const colors = typeof state.colors === 'string' ? JSON.parse(state.colors) : state.colors || [];
    const display = state.display || 5;

    return {
      toggle: true,
      more: colors.length > display ? colors.length - display : false,
      colors,
      display
    };
  }

  colorSwatches(colors = []) {
    let swatches = [];

    let display = this.state.display > colors.length ? colors.length : this.state.display;

    for (let i = 0; i < display; i++) {
      const color = colors[i];
      swatches.push(`<color-swatch sku="${color.sku}" product="${color.product}" name="${color.name}" hex="${color.hex}"></color-swatch>`);
    }

    return swatches.join('');
  }
}

export default customElements.define('color-variants', ColorVariants);
