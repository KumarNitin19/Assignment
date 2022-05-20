const express = require("express");
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const connectDB = require('./Config/db')
const imageRoute = require('./Route/Image');
const cors = require('cors');
const path = require('path')


dotenv.config();

connectDB();


const app = express();

const corsOpts = {
    origin: '*'
  };
  
app.use(cors(corsOpts));

const directory = path.join(__dirname, 'Frontend/public/images/');
app.use('Frontend/public/images/', express.static(directory));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const PORT = process.env.PORT || 1000;

app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`)
})

app.use('/api/image',imageRoute)