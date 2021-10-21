let express = require("express");
let ejs = require("ejs");
let bodyParser = require("body-parser");
let session = require("express-session");
let loginRouter = require("./routes/login/index.js");
let formidable = require("formidable");
let path = require("path");
let app = new express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: 'this is a mimi', //用来加密的 
    resave: false, //强制保存session，即使session没有变化也要强制保存，默认为true，通常写成false
    saveUninitialized: true, //强制将未初始化的session存储，默认为true，通常写成true
    cookie: { //cookie过期了，session就自动消失
        // secure: true  https协议
        maxAge: 30 * 60 * 1000
    },
    rolling: true //重新记录cookie的过期时间
}));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static("public"));
app.use("/api", express.static("public"));
//拦截路由
app.use((req, res, next) => {
    if (req.url != "/api/login" && req.url != "/api/dologin" && !req.session.username) {
        res.redirect("/api/login");
    } else {
        next();
    };
});
app.use("/api", loginRouter);
app.listen(3000, () => {
    console.log("3000 is running");
});