import { Base } from '../base';

class ProductTileColorSwatch extends Base {
  static get observedAttributes() {
    return ['hex', 'name'];
  }

  init(attributes) {
    this.state = attributes;
  }

  render() {
    return `
      <li title="${this.state.name}" class="product-tile-color-swatch" style="background-color: ${this.state.hex};"></li>
    `;
  }

  connectedCallback() {
    this.element.addEventListener('mouseover', e => {
      this.dispatchEvent(new CustomEvent('change_product_image', {
        bubbles: true,
        composed: true,
        detail: { image: () => this.state.product }
      }));
    });
  }

}

export default customElements.define('product-tile-color-swatch', ProductTileColorSwatch);
