import { Base } from './base';
import { parse } from 'url';

class ProductTile extends Base {
    static get observedAttributes() {
        return ['name', 'price'];
    }

    init(attributes) {
        this.state = this.parseState(attributes);
    }

    render() {
        return `
            <div>
                <h1 class="name">${this.state.name}</h1>
                <p>${this.state.price}</p>
            </div>
        `;
    }

    updated() {
        this.state = this.parseState(this.state);
        this.querySelector('h1').textContent = this.state.name;
        this.querySelector('p').textContent = this.state.price;
    }

    parseState(state) {
        return {
            name: state.name.toLowerCase(),
            price: `$${state.price}`
        };
    }
};

export default customElements.define('product-tile', ProductTile);