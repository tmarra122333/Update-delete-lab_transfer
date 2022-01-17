class Collection {
    #Model
    #currentId
    #items
    constructor(model, startingData) {
        this.#Model = model;
        this.#currentId = 0;
        this.#items = this.#populateItems( startingData );
    }

    /**
     * @description It will take an array as a argument 
     * @returns on Object that contains the { id as a key } and { te item as the value } 
     */

    #populateItems( startingData ) {
        return startingData.reduce(( acc, item, idx ) => {
            this.#currentId = idx;
            acc[this.#currentId] = new this.#Model(item, idx)
            return acc;
        }, {});
    }

    #generateId(){
        return ++this.#currentId
    }

    /**
     * @description Will return an array with all items availible in this.items
     * @returns array
     */

    find() {
        return Object.values(this.#items);
    }

    /**
     * @description Will return item match with the itemId
     * @param { string } itemId
     * @param { function } callBack Will return error or item
     * @returns function;
     */

    findById( itemId, callBack ) {
        if (!itemId) return console.log("missing id in first argument");
    
        if (typeof callBack !== "function") {
            return console.log("missing function in second argument");
        }
    
        let error;
        const item = this.#items[itemId];
    
        if (!item) {
            error = { message: `item with id "${itemId}" can't be found` };
        }
    
        return callBack(error, item);
    }

    create( data, callBack ) {
        if (!data) return console.log("missing data in first argument");
    
        if (typeof callBack !== "function") {
            return console.log("missing function in second argument");
        }
    
        let error, newItem;
    
        const isEmpty = Object.keys(data).every(field => data[field] === "");
    
        if (isEmpty) {
            error = { message: `you have empty fields` };
        } else {
            
            newItem = new this.#Model( data, this.#generateId());
    
            this.#items[newItem.id] = newItem;
        }
    
        return callBack(error, newItem);
    }

    findByIdAndDelete( itemId, callBack ) {
        let error = null;
        const item = this.#items[itemId]
        const isDeleted = delete this.#items[itemId];
    
        if ( !isDeleted ) {
            error = { message: `item with id "${itemId}" can't be found` };
        }
    
        return callBack(error, item);
    }

    findByIdAndUpdate( itemId, data, callBack ) {
        let error = null;
        const item = this.#items[itemId];
    
        if (!item) {
            error = { message: `item can't be found` };
        } else {
            this.#items[itemId] = {
                ...item,
                ...data
            }
        }
    
        return callBack(error, this.#items[itemId]);
    }
};

class Product {
    constructor( data, id ) {
        this.id = id;
        this.name = data.name;
        this.price = data.price;
        this.image = data.image;
    }
}

// at the bottom 
module.exports = new Collection(Product, [
    {
        name: "Taylor Koa k24ce Acoustic Guitar",
        price: 6000,
        image:
            "https://www.taylorguitars.com/sites/default/files/styles/guitar_detail_horizontal/public/responsive-guitar-detail/Taylor-K24ce-Koa-fr-v-class-2018.png?itok=qqyAxaNp",
    },
    {
        name: "Taylor 814ce ",
        price: 5000,
        image:
            "https://www.taylorguitars.com/sites/default/files/styles/guitar_detail_horizontal/public/responsive-guitar-detail/Taylor-814ce-frl-2020_0.png?itok=_0WXHyrT",
    },
    {
        name: "Taylor 914ce",
        price: 5499,
        image:
            "https://www.taylorguitars.com/sites/default/files/styles/guitar_detail_horizontal/public/responsive-guitar-detail/Taylor-914ce-v-class-fr-2018.png?itok=r3Gwrr5K",
    }
]);