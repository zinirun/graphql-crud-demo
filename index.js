const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql');
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
    }

    type Mutation {
        addProduct(input: ProductInput): Product
        updateProduct(id: ID!, input: ProductInput!): Product
        deleteProduct(id: ID!): String
    }
`);

const products = [
    {
        id: 1,
        name: '첫번째 제품',
        price: 2000,
        description: '하하하',
    },
    {
        id: 2,
        name: '두번째 제품',
        price: 4000,
        description: '호호호',
    }
]

const rootValue = {
    getProduct: ({id}) => products.find(product => product.id === parseInt(id)),

    addProduct: ({input}) => {
        input.id = products.length+1;
        products.push(input);
        return rootValue.getProduct({id: input.id});
    },

    updateProduct: ({id, input}) => {
        const index = products.findIndex(product => product.id === parseInt(id));
        products[index] = {
            id: parseInt(id),
            ...input
        }
        return products[index];
    },

    deleteProduct: ({id}) => {
        const index = products.findIndex(product => product.id === parseInt(id));
        products.splice(index, 1);
        return "Remove Success";
    }
};

const app = express();
app.use(cors()); // to use Postman
app.use('/static', express.static('static'));
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue,
    graphiql: true, // Support GUI (false when publishing)
}));

app.listen(port, ()=>{
    console.log(`running server port ${port}`);
});