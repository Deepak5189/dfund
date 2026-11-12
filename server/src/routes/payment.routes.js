const { getCheckoutSession } = require("../controllers/payment.controller");
const { verifyCreator } = require("../middlewares/posts/verifyCreator");
const { verifyUser } = require("../middlewares/users/verifyUser");

const router = require("express").Router();

router.post(
    "/create-checkout-session",
    verifyUser,
    verifyCreator,
    getCheckoutSession
);

module.exports = router;