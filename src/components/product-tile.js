import { Base } from './base';

class ProductTile extends Base {
  static get observedAttributes() {
    return ['name', 'price', 'add-to-cart'];
  }

  init(attributes) {
    this.state = this.parseState(attributes);
  }

  render() {
    const theme = 'contemporary';
    return `
      <style>
        @import url('/css/${theme}.css');
      </style>
      <article class="product-tile">
        <div class="product-img"><img src="img/product.svg"/></div>
        <header class="product-name"><h5>${this.state.name}</h5></header>
        <p>
          <span class="product-price ${this.state.salePrice ? 'sale' : '' }">${this.state.price}</span>
          ${ this.state.salePrice ? `<span class="product-price-sale">${this.state.salePrice}</span>` : '' }
        </p>
        ${
          this.state.colors ?
            `<ul>
              ${
                this.state.color.map((color) => {
                  `<li aria-label="${color.name}" style="background-color: ${color.hex}"></li>`
                }).join('')
              }
            </ul>` :
            ''
        }
        <!-- Need to define children in the constructor so we can create an event listener for below -->
        <slot name="buttons">
          <button class="product-atc">Add to Basket</button>
        </slot>
      </article>
    `;
  }

  connectedCallback() {
    this.addToCart = this.addToCart.bind(this);
    console.log('created');
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
      case 'addToCart':
        this.setListener(this.element.querySelector('.product-atc'), 'click', oldValue ? oldValue : this.addToCart.bind(this), newValue);
        break;
    }
  }

  parseState(state) {
    return {
      ...state,
      name: (state.name || 'Coal').toUpperCase(),
      price: state.price ? `$${state.price}` : 'FREE',
      salePrice: state.salePrice ? `$${state.salePrice}` : '',
    };
  }

  addToCart(e) {
    alert(`${this.state.name} was added to your cart`);
  }
};

export default customElements.define('product-tile', ProductTile);
