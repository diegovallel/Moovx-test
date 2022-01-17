//express
const express = require("express");
const app = express();

//imports
const morgan = require("morgan");
const bodyParser = require("body-parser")
var cors = require('cors')

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))


//routes
app.use(require("./routes/index.routes"));

//server
const port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log("Port listen ",port);
});