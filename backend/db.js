const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:lakshyawedsbhavya@lakshyawedsbhavya.xlv9j.mongodb.net/paytm")

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
})
const AccountSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    balance: Number
})


const User = mongoose.model("User", userSchema)
const Account = mongoose.model("Account",AccountSchema);

module.exports = {
    User,
    Account
}