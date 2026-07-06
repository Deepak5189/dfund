const { signin, addUser } = require("../controllers/user.controller");
const useragent = require("express-useragent");
const { addUserValidator, addUserValidatorHandler } = require("../middlewares/users/usersValidator");

const router = require("express").Router();

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
)

module.exports = router;