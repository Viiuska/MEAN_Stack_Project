const mongoose = require('mongoose');

const Schema = mongoose.Schema

let BookSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    genre:{
        type:String,
    },
    description:{
        type:String,
    }
});

module.exports=mongoose.model('Book', BookSchema)