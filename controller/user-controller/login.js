let md5 = require("md5");
let { Users } = require("../../database/user");
//登录页面
exports.Login = (req, res) => {
    res.render("admin/login");
};
// 登录提交数据
exports.Dologin = async(req, res) => {
    let username = req.body.username;
    let pwd = md5(req.body.pwd);
    let isUserName = await Users.findOne({
        username: username
    });
    let isUser = await Users.findOne({
        username: username,
        pwd: pwd
    });
    if (!isUserName) {
        res.send(`<script>alert("该用户不存在");location.href="/api/register";</script>`);
    } else if (!isUser) {
        res.send(`<script>alert("用户名或密码错误");location.href="/api/login";</script>`);
    } else {
        req.app.locals.username = username;
        req.session.username = username;
        res.redirect("/api/index");
    };
};
//注册页面
exports.Resiger = (req, res) => {
    res.render("admin/register");
};
//注册提交数据
exports.Doregister = async(req, res) => {
    let username = req.body.username;
    let pwd = md5(req.body.pwd);
    let isUserName = await Users.findOne({
        username: username
    });
    if (!isUserName) {
        let userInfo = {
            username: username,
            pwd: pwd
        };
        let rel = await Users.create(userInfo);
        if (rel) {
            res.redirect("/api/login.ejs");
        };
    } else {
        res.send(`<script>alert("该用户已存在");location.href="/api/login";</script>`)
    };
};
//首页
exports.index = (req, res) => {
    res.render("admin/index");
};