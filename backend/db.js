const mongoose = require("mongoose");
const { string } = require("zod");

mongoose.connect("mongodb+srv://admin:5G2bBE2AccGueftb@cluster0.qvjjfgo.mongodb.net/paytm");

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    firstName : {
        type : String,
        required : true,
    },
    lastName : {
        type : String,
        required : true,
    },
})

const accountSchema = new mongoose.Schema({
    userId : {
        type :  mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    balance : {
        type : Number,
        required : true,
    }

})

const Account = mongoose.model("Account",accountSchema);
const User = mongoose.model("User",userSchema);

module.exports = {
    User,
    Account
};