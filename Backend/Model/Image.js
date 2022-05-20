const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    username:{type: String},
    buttonText:{type:String},
    buttonSubText:{type:String},
    link:{type:String},
    type:{type:String},
    image:
    {
        type:String
    }
}, { timestamp:true});


const Image = mongoose.model('ImageDetail', imageSchema);
module.exports = Image; 