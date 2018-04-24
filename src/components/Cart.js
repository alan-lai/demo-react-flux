import React, { Component } from 'react';
import CartItem from './CartItem';

class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            cartVisible: false
        }
    }
    toggleCart() {
        this.setState({
            cartVisible: !this.state.cartVisible
        });
    }
    render() {
        const cartItems = this.props.cartItems;
        const products = this.props.products;

        let cartContent = <p>No items in cart.</p>;
        
        if (cartItems && cartItems.length) {
            const detailedCartItems = cartItems.map((item, index) => {
                let product = products.find((product) => { return product.id === item.id });
                return (
                    <CartItem key={'cart-item-' + index} product={product} qty={item.qty} removeProductFromCart={this.props.removeProductFromCart} />
                )
            });
            cartContent = (
                <ul>
                    {detailedCartItems}
                </ul>
            )
        }
        return (
            <div className="cart dropdown">
                <button className={"btn btn-secondary" + (this.state.cartVisible ? " show" : "")} type="button" onClick={() => { this.toggleCart() }} aria-expanded={this.state.cartVisible}>View Cart (<span>{this.props.cartItems.length}</span>)</button>
                <div className={"cart-content dropdown-menu" + (this.state.cartVisible ? " show" : "")}>
                    {cartContent}
                </div>
            </div>
        )
    }
}

export default Cart;