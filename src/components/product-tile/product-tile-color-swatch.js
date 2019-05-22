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
    const eventAwesome = new CustomEvent('awesome', {
      bubbles: true,
      composed: true,
      detail: { image: () => this.state.product }
    });

    this.element.addEventListener('mouseover', e => {
      this.dispatchEvent(eventAwesome);
    });
  }

}

export default customElements.define('product-tile-color-swatch', ProductTileColorSwatch);
