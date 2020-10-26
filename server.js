const app = require('./app');
const port = 80;

app.listen(port, () => {
    console.log(`running server port ${port}`);
});
