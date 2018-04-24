import React, { Component } from 'react';

class CartItem extends Component {
    removeProductFromCart(id) {
        this.props.removeProductFromCart(id);
    }
    render() {
        const product = this.props.product;
        return(
            <div className="cart-item">
                <span className="name">{product.name}</span>
                <span className="qty">{this.props.qty}</span>
                <span className="remove">
                    <button className="btn btn-default" onClick={() => {this.removeProductFromCart(product.id)}}>x</button>
                </span>
            </div>
        )
    }
}

export default CartItem;