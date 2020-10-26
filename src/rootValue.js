const products = require('./products');
const defaultProducts = require('./defaultProducts');

module.exports = {
    getProduct: ({ id }) => {
        return products.find((product) => product.id === parseInt(id));
    },

    getProducts: () => products,

    searchProducts: ({ name }) => {
        return products.filter((product) => product.name.toLowerCase().includes(name));
    },

    addProduct: ({ input }) => {
        input.id = products.length === 0 ? 1 : products[products.length - 1].id + 1;
        products.push(input);
        return input.id;
    },

    updateProduct: ({ id, input }) => {
        const index = products.findIndex((product) => product.id === parseInt(id));
        products[index] = {
            id: parseInt(id),
            ...input,
        };
        return id;
    },

    deleteProduct: ({ id }) => {
        const index = products.findIndex((product) => product.id === parseInt(id));
        products.splice(index, 1);
        return id;
    },

    initProduct: () => {
        products.splice(0, products.length);
        products.push(...defaultProducts);
        return products.length;
    },
};
