const { buildSchema } = require('graphql');

module.exports = buildSchema(`
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
