const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');

const schema = require('./src/schema');
const rootValue = require('./src/rootValue');

class App {
    constructor() {
        this.app = express();
        this.setMiddleware();
        this.getRouting();
        this.setStatic();
    }
    setMiddleware() {
        this.app.use(cors());
    }
    getRouting() {
        this.app.use(
            '/graphql',
            graphqlHTTP({
                schema,
                rootValue,
                graphiql: true, // support GUI
            }),
        );
    }
    setStatic() {
        this.app.use('/', express.static('static'));
    }
}

module.exports = new App().app;
