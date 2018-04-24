import React, { Component } from 'react';

class CartItem extends Component {
    removeProductFromCart(id) {
        this.props.removeProductFromCart(id);
    }
    render() {
        const product = this.props.product;
        return(
            <li className="cart-item">
                <span className="name">{product.name}</span>
                <span className="price">{'$' + (parseFloat(product.price) * this.props.qty).toFixed(2)}</span>
                <span className="qty">{'x' + this.props.qty}</span>
                <span className="remove">
                    <button className="btn btn-default" onClick={() => {this.removeProductFromCart(product.id)}}>X</button>
                </span>
            </li>
        )
    }
}

export default CartItem;