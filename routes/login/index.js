let express = require("express");
let loginController = require("../../controller/user-controller/login");
let userController = require("../../controller/user-controller/user");
let router = new express.Router();
router.get("/login", loginController.Login);
router.get("/register", loginController.Resiger);
router.get("/index", loginController.index);
router.post("/dologin", loginController.Dologin);
router.post("/doregister", loginController.Doregister);
router.get("/adduser", userController.adduser);
router.post("/doadduser", userController.Doadduser);
router.get("/searchuser", userController.searchuser);
router.get("/dosearchuser", userController.dosearchuser);
router.get("/updateuser", userController.updateuser);
router.get("/deleuser", userController.deleuser);
router.post("/doupdateuser", userController.doupdateuser);
module.exports = router;