import dispatcher from '../Dispatcher';

export function createProduct(name, price, description) {
    dispatcher.dispatch({
        type: 'CREATE_PRODUCT',
        name,
        price,
        description
    })
}

export function deleteProduct(id) {
    dispatcher.dispatch({
        type: 'DELETE_PRODUCT',
        id
    })
}