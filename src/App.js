import React, { Component } from 'react';
import ProductStore from './stores/ProductStore';
import * as ProductActions from './actions/ProductActions';
import Catalogue from './components/Catalogue';
import Cart from './components/Cart';
import AddProductModal from './components/AddProductModal';
import './styles/css/app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.removeProductFromCart = this.removeProductFromCart.bind(this);
    this.state = {
      products: ProductStore.getAll(),
      cartItems: [],
      showAddProductModal: false
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

  createProduct(name, price, description) {
    ProductActions.createProduct(name, price, description)
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

  toggleAddProductModal() {
    this.setState({
      showAddProductModal: !this.state.showAddProductModal
    });
  }

  render() {
    return (
      <div className="app">
        <div className="container-fluid">
          <div className="row">
            <div className="shop col-12">
              <Cart products={this.state.products} cartItems={this.state.cartItems} removeProductFromCart={this.removeProductFromCart}/>
              <div className="summary"></div>
              <div className="catalogue">
                <Catalogue products={this.state.products} addProductToCart={this.addProductToCart.bind(this)} removeProductFromCart={this.removeProductFromCart} />
              </div>
            </div>
          </div>
        </div>
        <button id="btn-product-create" className="btn btn-primary" type="button" onClick={this.toggleAddProductModal.bind(this)}>Add new item</button>
        <AddProductModal createProduct={this.createProduct.bind(this)} toggleAddProductModal={this.toggleAddProductModal.bind(this)} showAddProductModal={this.state.showAddProductModal}  />
      </div>
    );
  }
}

export default App;
