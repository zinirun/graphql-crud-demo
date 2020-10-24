const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql');
const cors = require('cors');
const port = 3000;

const schema = buildSchema(`
  type Query {
    hello: String,
    nodejs: Int
  }
`);

const rootValue = {
    hello: () => 'Hello world!' ,
    nodejs: () => 20 ,
};

const app = express();
app.use(cors()); // to use Postman
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue,
    graphiql: true, // Support GUI (false when publishing)
}))

app.listen(port, ()=>{
    console.log(`running server port ${port}`);
})