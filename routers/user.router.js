const controller = require("../controllers/index");
const router = require("express").Router();
const validation = require("../validations/index");

router.post(
  "/register",
  [validation.userValidation.validateRegister()],
  controller.user.register
);

router.post(
  "/login",
  [validation.userValidation.validateLogin()],
  controller.user.login
);

router.put(
  "/updateUser/:userId",
  [validation.userValidation.validateUpdateUser()],
  controller.user.updateUser
);

router.get("/getAllUsers", controller.user.getAllUsers);

router.put(
  "/changePassword/:id",
  [validation.userValidation.validateChangePassword()],
  controller.user.changePassword
);

router.get("/getUserComments/:userId", controller.user.getUserComments);


router.delete("/deleteUser/:userId", controller.user.deleteUser);

router.post("/uploadProfilePhoto/:userId",controller.user.uploadProfilePhoto);

module.exports = {
  user: router,
};
