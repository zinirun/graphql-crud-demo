const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');
const port = 3000;

const schema = buildSchema(`
    input ProductInput {
      name: String,
      price: Int,
      description: String
    }

    type Product {
        id: ID!,
        name: String,
        price: Int,
        description: String
    }

    type Query {
        getProduct(id: ID!): Product
        getProducts: [Product]
        searchProducts(name: String): [Product]
    }

    type Mutation {
        addProduct(input: ProductInput): Product
        updateProduct(id: ID!, input: ProductInput!): String
        deleteProduct(id: ID!): String
    }
`);

const products = [
    {
        id: 1,
        name: 'First Product',
        price: 2000,
        description: 'This is first product',
    },
    {
        id: 2,
        name: 'Second Product',
        price: 4000,
        description: 'This is second product',
    },
];

const rootValue = {
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
        return rootValue.getProduct({ id: input.id });
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
};

const app = express();
app.use(cors()); // to use Postman
app.use('/', express.static('static'));
app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        rootValue,
        graphiql: true, // Support GUI (false when publishing)
    }),
);

app.listen(port, () => {
    console.log(`running server port ${port}`);
});
