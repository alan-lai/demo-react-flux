import React, { Component } from 'react';
import CartItem from './CartItem';

class Cart extends Component {
    render() {
        const cartItems = this.props.cartItems;
        const products = this.props.products;
        if (cartItems && cartItems.length) {
            const detailedCartItems = cartItems.map((item, index) => {
                let product = products.find((product) => { return product.id === item.id });
                return (
                    <CartItem key={'cart-item-' + index} product={product} qty={item.qty} removeProductFromCart={this.props.removeProductFromCart} />
                )
            });
            return (
                <div className="cart">
                    <ul>
                        {detailedCartItems}
                    </ul>
                </div>
            )
        } else {
            return(
                <div>No items</div>
            )
        }
    }
}

export default Cart;