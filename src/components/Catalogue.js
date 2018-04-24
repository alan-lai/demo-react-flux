import React, { Component } from 'react';
import Product from './Product';

class Catalogue extends Component {
    render() {
        const products = this.props.products.map((product, index) => {
            return (
                <Product key={'catalogue-list-' + index} product={product} addProductToCart={this.props.addProductToCart} removeProductFromCart={this.props.removeProductFromCart} />
            )
        });

        return(
            <ul className="shop-items-list">
                {products}
            </ul>
        )
    }
}

export default Catalogue;