let { Pros } = require("../../database/product");
let path = require("path");
let formidable = require("formidable");
exports.showpro = async(req, res) => {
    let rel = await Pros.find();
    res.render('admin/showpro.ejs', { rel });
}