import { Base } from './base';

class ProductTile extends Base {
    static get observedAttributes() {
      return ['name', 'price'];
    }

    init(attributes) {
      this.state = this.parseState(attributes);
    }

    render() {
      return `
        <h1 class="name">${this.state.name}</h1>
        <p>${this.state.price}</p>
      `;
    }

    updated(name, oldValue, newValue) {
      this.state = this.parseState(this.state);
      switch (name) {
        case 'name':
          this.querySelector('h1').textContent = this.state.name;
          break;
        case 'price':
          this.querySelector('p').textContent = this.state.price;
          break;
      }
    }

    parseState(state) {
        return {
            name: state.name.toLowerCase(),
            price: `$${state.price}`
        };
    }
};

export default customElements.define('product-tile', ProductTile);
