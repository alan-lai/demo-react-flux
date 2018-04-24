import React, { Component } from 'react';
import ProductStore from './stores/ProductStore';
import * as ProductActions from './actions/ProductActions';
import Catalogue from './components/Catalogue';
import Cart from './components/Cart';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.removeProductFromCart = this.removeProductFromCart.bind(this);
    this.state = {
      products: ProductStore.getAll(),
      cartItems: []
    }
  }
  
  addProductToCart(id, qty) {
    let updatedCartItems = [];
    let cartItems = this.state.cartItems;
    let matches = cartItems.filter(item => {
      return item.id === id;
    });
    if (matches.length) {
      updatedCartItems = cartItems.map((item) => {
        if (item.id === id) {
          item.qty = qty;
        }
        return item;
      });
      this.setState({
        cartItems: updatedCartItems
      });
    } else {
      updatedCartItems = cartItems.concat([{ id, qty }]);
      this.setState({
        cartItems: updatedCartItems
      });
    }
  }

  componentWillMount() {
    ProductStore.on('change', () => {
      this.setState({
        products: ProductStore.getAll()
      });
    });
  }

  createProduct() {
    ProductActions.createProduct('Sandals', 35, 'New')
  }

  removeProductFromCart(id) {
    let cartItems = this.state.cartItems;
    let updatedCartItems = cartItems.filter((item) => {
      return item.id !== id;
    });
    this.setState({
      cartItems: updatedCartItems
    });
  }

  render() {
    return (
      <div className="App">
        <Cart products={this.state.products} cartItems={this.state.cartItems} removeProductFromCart={this.removeProductFromCart}/>
        <div className="summary"></div>
        <div className="shop">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <Catalogue products={this.state.products} addProductToCart={this.addProductToCart.bind(this)} removeProductFromCart={this.removeProductFromCart} />
              </div>
            </div>
          </div>
        </div>
        <button onClick={this.createProduct.bind(this)}></button>
      </div>
    );
  }
}

export default App;
