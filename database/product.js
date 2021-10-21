let mongoose = require("mongoose");
require("./db");
let ProductSchema = new mongoose.Schema({
    proname: {
        type: String
    },
    price: {
        type: String
    },
    pronum: {
        type: String
    },
    totalnum: {
        type: String
    },
    pic: {
        type: String
    }
});
let Pros = mongoose.model("Pros", ProductSchema);
module.exports = {
    Pros
};