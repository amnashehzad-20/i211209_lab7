const mongoose = require('mongoose');
const userschema= new mongoose.Schema({
    name:{ 
        type: String,
        required:true
    },
    email: String,
    password: String,
    createdAt: {
        type: Date,
        default: Date.now
    },

    });
    //module.exports.model('User',userschema)
const User =mongoose.model('User',userschema);
module.exports=User;

