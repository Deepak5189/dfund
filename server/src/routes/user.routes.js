const { signin, addUser, logout, getCurrUser } = require("../controllers/user.controller");
const useragent = require("express-useragent");
const { addUserValidator, addUserValidatorHandler } = require("../middlewares/users/usersValidator");

const router = require("express").Router();

router.get(
    "/me",
    getCurrUser
)

router.post(
    "/signup",
    addUserValidator,
    addUserValidatorHandler,
    addUser,
    // sendVerificationEmail
);

router.post(
    "/signin",
    useragent.express(),
    signin
);

router.post("/logout", logout);

module.exports = router;