let md5 = require("md5");
let path = require("path");
let formidable = require("formidable");
let { Users } = require("../../database/user");

exports.adduser = (req, res) => {
    res.render("admin/adduser.ejs");
};
exports.searchuser = async(req, res) => {
    let page = Number(req.query.page) || 1;
    let size = Number(req.query.size) || 6;
    let totalUsers = await Users.countDocuments({});
    let totalPages = Math.ceil(totalUsers / size);
    let result = await Users.find({}).skip((page - 1) * size).limit(size);
    res.render("admin/searchuser.ejs", {
        result,
        total: totalUsers,
        page: page,
        size: size,
        totalPages: totalPages
    });
};
exports.dosearchuser = async(req, res) => {
    let page = Number(req.query.page) || 1;
    let size = Number(req.query.size) || 6;
    let searchname = req.query.searchname;
    let totalUsers = await Users.countDocuments({
        username: new RegExp(searchname, "gi")
    });
    let totalPages = Math.ceil(totalUsers / size);
    let rel = await Users.find({
        username: new RegExp(searchname, "gi")
    });
    if (rel) {
        res.render("admin/searchusers.ejs", {
            rel,
            total: totalUsers,
            page: page,
            size: size,
            totalPages: totalPages,
            searchname
        });
    }
};

exports.Doadduser = async(req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, "../", "../", "public", "upload");
    form.keepExtensions = true
    form.parse(req, async(err, fields, files) => {
        let result = await Users.create({
            username: fields.username,
            pwd: md5(fields.pwd),
            personname: fields.personname,
            age: fields.age,
            sex: fields.sex,
            pic: files.pic.path.split("public")[1]
        });
        if (result) {
            res.redirect(`/api/searchuser`);
        };
    });
};
exports.updateuser = async(req, res) => {
    let { id } = req.query;
    let rel = await Users.findOne({ _id: id });
    res.render("admin/updateuser.ejs", { rel });
};
exports.doupdateuser = async(req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, "../", "../", "public", "upload");
    form.keepExtensions = true;
    form.parse(req, async(err, fields, files) => {
        let rel = {};
        if (!files.pic.name) {
            rel = await Users.updateOne({
                _id: req.query.id
            }, {
                username: fields.username,
                personname: fields.personname,
                sex: fields.sex,
                age: fields.age,
                pwd: md5(fields.pwd)
            });
        } else {
            rel = await Users.updateOne({
                _id: req.query.id
            }, {
                username: fields.username,
                personname: fields.personname,
                sex: fields.sex,
                age: fields.age,
                pic: files.pic.path.split("public")[1],
                pwd: md5(fields.pwd)
            });
        };
        if (rel) {
            res.redirect("/api/searchuser")
        };
    });
};
exports.deleuser = async(req, res) => {
    let id = req.query.id;
    let rel = await Users.findByIdAndDelete({ _id: id });
    if (rel) {
        res.send(`<script>alert("删除成功");location.href="/api/searchuser";</script>`);
    };
};