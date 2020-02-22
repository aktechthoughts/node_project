const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
// Enable cors for the application
app.use(cors())
// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/productservice', routes); //Main entry point


const PORT = 8081;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});