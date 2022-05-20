const express = require("express");
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const connectDB = require('./Config/db')
const imageRoute = require('./Route/Image');
const cors = require('cors');
const path = require('path');


dotenv.config();

connectDB();


const app = express();

const corsOpts = {
    origin: '*'
  };
  
app.use(cors(corsOpts));

const directory = path.join(__dirname, 'Frontend/public/images/');
app.use('Frontend/public/images/', express.static(directory));

//=====================Deployment==============================//


const __dirname1 = path.resolve();
if(process.env.NODE_ENV === 'production'){
  
    app.use(express.static(path.join(__dirname1,"Frontend/build")))
 

   app.get('*',(req,res)=>{
     res.sendFile(path.resolve(__dirname1,"Frontend","build","index.html"))
   })

}


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());




//=====================Deployment==============================//
const PORT = process.env.PORT || 1000;

app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`)
})

app.use('/api/image',imageRoute)