import React, { Component } from 'react';

class AddProductModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: 0,
            description: ''
        }
        this.updateName = this.updateName.bind(this);
        this.updatePrice = this.updatePrice.bind(this);
        this.updateDescription = this.updateDescription.bind(this);
    }
    checkElement(event) {
        if(event.target.getAttribute('role') === 'dialog') {
            this.props.toggleAddProductModal();
        }
    }
    createProduct() {
        this.props.createProduct(this.state.name, this.state.price, this.state.description);
        this.setState(
            {
                name: '',
                price: 0.00,
                description: ''
            }
        );
    }
    updateName(event) {
        this.setState({
            name: event.target.value.trim()
        })
    }
    updatePrice(event) {
        let price = 0.00;
        if(!isNaN(event.target.value.trim()))
        {
            price = parseFloat(event.target.value.trim());
        }
        this.setState({
            price: price
        })
    }
    updateDescription(event) {
        this.setState({
            description: event.target.value.trim()
        })
    }
    render() {
        return (
            <div className={"modal" + (this.props.showAddProductModal ? " fade show" : "")} tabIndex="-1" role="dialog" onClick={(event) => { this.checkElement(event) }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add a Product</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => { this.props.toggleAddProductModal() }}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label className="label" htmlFor="product-name">Name</label>
                                <input id="product-name" type="text" className="form-control" value={this.state.name} onChange={(event) => { this.updateName(event) }} />
                            </div>
                            <div className="form-group">
                                <label className="label" htmlFor="product-price">Price</label>
                                <input id="product-price" type="number" min="0" step="0.01" className="form-control" value={this.state.price} onChange={(event) => { this.updatePrice(event) }} />
                            </div>
                            <div className="form-group">
                                <label className="label" htmlFor="product-description">Description</label>
                                <textarea id="product-description" className="form-control" value={this.state.description} onChange={(event) => { this.updateDescription(event) }}></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={() => { this.createProduct() }}>Add Product</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => { this.props.toggleAddProductModal() }}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddProductModal;