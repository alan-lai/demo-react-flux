import React, { Component } from 'react';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1
        };
    }
    addProductToCart() {
        if (this.state.value === 0) {
            this.props.removeProductFromCart(this.props.product.id);
        } else if (this.state.value > 0) {
            this.props.addProductToCart(this.props.product.id, this.state.value);
        }
    }
    updateQty(event) {
        if (!isNaN(event.target.value)) {
            let qty = parseInt(event.target.value, 10);
            this.setState({
                value: qty
            });
        } else {
            this.setState({
                value: 1
            })
        }
    }
    render() {
        const product = this.props.product;        
        return (
            <li className="shop-item">
                <div className="item">
                    <div className="image"></div>
                    <div className="description">
                        <div className="name"><strong>{product.name}</strong></div>
                        <div className="price">{ "$" + product.price.toFixed(2) }</div>
                        <div className="description">{ product.description }</div>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="number" step="1" min="0" defaultValue="1" onChange={ (event) => { this.updateQty(event) } } />
                        <br />
                        <button type="button" className="btn btn-default" onClick={() => this.addProductToCart()}>Add to cart</button>
                    </div>
                </div>
            </li>
        )
    }
}

export default Product;