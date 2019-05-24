import { Base } from '../base';

class ColorSwatch extends Base {
  static get observedAttributes() {
    return ['hex', 'name'];
  }

  init(attributes) {
    this.state = attributes;
  }

  render() {
    return `
      <li class="color-swatch" title="${this.state.name}" style="background-color: ${this.state.hex};"></li>
    `;
  }

  connectedCallback() {
    this.element.addEventListener('mouseover', e => {
      this.dispatchEvent(new CustomEvent('change_product_image', {
        bubbles: true,
        composed: true,
        detail: { image: () => this.state.product, sku: () => this.state.sku, color: () => this.state.name }
      }));
    });
  }

}

export default customElements.define('color-swatch', ColorSwatch);
