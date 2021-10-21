let mongoose = require("mongoose");
require("./db");
let UserSchema = new mongoose.Schema({
    username: {
        type: String
    },
    personname: {
        type: String
    },
    age: {
        type: String
    },
    sex: {
        type: String
    },
    pwd: {
        type: String
    },
    pic: {
        type: String
    }
});
let Users = mongoose.model("Users", UserSchema);
module.exports = {
    Users
};