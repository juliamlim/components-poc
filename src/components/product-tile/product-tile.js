import { Base } from '../base';

import './product-tile-color-variants';

class ProductTile extends Base {
  static get observedAttributes() {
    return ['name', 'price', 'image', 'variants', 'sale-price'];
  }

  init(attributes) {
    this.state = this.parseState(attributes);
  }

  render() {
    return `
      <article class="product-tile">
        <div class="product-img"><img src="${this.state.image || 'img/product.svg'}"/></div>
        ${ this.state.colors ? `<product-tile-color-variants colors='${this.state.colors}'></product-tile-color-variants>` : '' }
        <header class="product-name"><h5>${this.state.name}</h5></header>
        <p>
          <span class="product-price ${this.state.salePrice ? 'sale' : '' }">${this.state.price}</span>
          ${ this.state.salePrice ? `<span class="product-price-sale">${this.state.salePrice}</span>` : '' }
        </p>
        <!-- Need to define children in the constructor so we can create an event listener for below -->
        <slot name="buttons">
          <button class="product-atc">Add to Basket</button>
        </slot>
      </article>
    `;
  }

  connectedCallback() {
    this.addToCart = this.addToCart.bind(this);
    this.element.querySelector('.product-atc').addEventListener('click', this.addToCart);

    this.addEventListener('change_product_image', e => {
      this.element.querySelector('.product-img img').setAttribute('src', e.detail.image());
    });
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    attribute = this.toCamel(attribute);

    this.state[attribute] = this.parseState({ [attribute]: newValue })[attribute];

    switch (attribute) {
      case 'name':
        this.element.querySelector('.product-name').textContent = this.state.name;
        break;
      case 'price':
        this.element.querySelector('.product-price').textContent = this.state.price;
        break;
    }
  }

  parseState(state) {
    return {
      ...state,
      name: (state.name || 'Coal').toUpperCase(),
      price: state.price ? state.price : 'FREE',
      salePrice: state.salePrice ? state.salePrice : '',
    };
  }

  addToCart(e) {
    alert(`${this.state.name} was added to your cart`);
  }
};

export default customElements.define('product-tile', ProductTile);
