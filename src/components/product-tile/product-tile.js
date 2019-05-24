import { Base } from '../base';

import '../color-variants';


class ProductTile extends Base {
  static get observedAttributes() {
    return ['name', 'price', 'image', 'variants', 'sale-price', 'buttons'];
  }

  init(attributes) {
    this.state = this.parseState(attributes);
  }

  render() {
    return `
      <article class="product-tile">
        <div class="product-img"><img src="${this.state.image || 'img/product.svg'}"/></div>
        <slot name="variants">
          ${ this.state.colors ? `<color-variants colors='${this.state.colors}'></color-variants>` : '' }
        </slot>
        <header class="product-name">
          <slot name="title">
            ${
              this.state.name ?
                `<h5>${this.state.name}</h5>`
              : ''
            }
          </slot>
        </header>
        <slot name="price">
          ${
            this.state.price ?
              `<p class="product-prices">
                <span class="product-price ${this.state.salePrice ? 'sale' : '' }">${this.state.price}</span>
                ${ this.state.salePrice ? `<span class="product-price-sale">${this.state.salePrice}</span>` : '' }
              </p>`
            : ''
          }
        </slot>
        ${
          this.state.buttons ?
            `<slot name="buttons">
              <button class="product-cta add-to-basket primary-button">Add to Basket</button>
            </slot>`
          : ''
        }
      </article>
    `;
  }

  connectedCallback() {
    this.addToCart = this.addToCart.bind(this);
    const atb = this.element.querySelector('.add-to-basket') || null;

    if (atb) {
      atb.addEventListener('click', this.addToCart);
    }

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
      name: (state.name || '').toUpperCase(),
      price: state.price,
      salePrice: state.salePrice ? state.salePrice : '',
      buttons: state.buttons !== 'false',
    };
  }

  addToCart(e) {
    alert(`${this.state.name} was added to your cart`);
  }
};

export default customElements.define('product-tile', ProductTile);
