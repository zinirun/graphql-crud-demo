# graphql-crud-demo
GraphQL CRUD Operations in Node.js, Axios, VanillaJS


<img src="https://github.com/zinirun/graphql-crud-demo/blob/main/img/readme.png" alt="gql-crud-page-sample" />

## Start
```bash
$ git clone https://github.com/zinirun/graphql-crud-demo
$ cd ./graphql-crud-demo
$ npm install # yarn install
```

## Operations

### Create
```js
mutation addProduct($input: ProductInput) {
    addProduct(input: $input)
}
```

### Read
```js
{ getProduct(id : ?) { id price name description} }
```

### Update
```js
mutation updateProduct($id: ID!, $input: ProductInput!){
    updateProduct(id: $id, input: $input)
}
```

### Delete
```js
mutation deleteProduct{
    deleteProduct(id: ${id})
}
```

### Also supports
- Get all items
- Debouncing Search ()
- Set data-set default

## Structure
- GraphQL Server
  - `/src/schema.js` - Build-Schema defined
  - `/src/rootValue.js` - Mutations and queries implemented
  - `/src/products.js` - Shared data accessed from gql
  - `/src/defaultProducts.js` - Default data-set
- Express
  - `/app.js` - Express instance defined
  - `/server.js` - Server started from `/app.js`
- Client
  - `/static/mod.js` - DOM Initialized, all events added
  - `/static/crud.js` - Events implemented
  - `/static/graphiql.js` - Iframe for GraphiQL(GUI)

Hard-coded dataset `/src/defaultProducts.js` can be replaced by with Redis, etc...