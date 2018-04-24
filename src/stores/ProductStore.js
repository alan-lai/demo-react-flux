import { EventEmitter } from 'events';
import dispatcher from '../Dispatcher';
import data from '../data/products';

class ProductStore extends EventEmitter {
    constructor() {
        super();
        this.products = data;
        
        let max = 0;
        data.forEach((item) => {
            if (item.id > max) {
                max = item.id;
            }
        });
        this.currentBaseId = max;
    }

    getAll() {
        return this.products;
    }

    createProduct(name, price, description) {
        let baseId = ++this.currentBaseId;
        this.products.push({
            id: baseId,
            name,
            price,
            description
        });

        this.emit('change');
    }

    handleActons(action) {
        switch(action.type) {
            case "CREATE_PRODUCT": {
                this.createProduct(action.name, action.price, action.description);
                break;
            }
            default: {}
        }
    }
}

const productStore = new ProductStore();
// window.productStore = productStore;

dispatcher.register(productStore.handleActons.bind(productStore));
// window.dispatcher = dispatcher;

export default productStore;