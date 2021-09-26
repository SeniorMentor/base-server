require('dotenv').config();
const express = require('express');
const app = express(); 
const fileUpload = require('express-fileupload');
app.use(fileUpload());

const cors = require('cors');
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({extended : false}))
require("./routes")(app);

module.exports = app; 