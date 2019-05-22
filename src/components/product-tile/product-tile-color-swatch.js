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
      const parent = this.closest('.product-tile');
      console.log(this, parent);
    });
  }

}

export default customElements.define('product-tile-color-swatch', ProductTileColorSwatch);
