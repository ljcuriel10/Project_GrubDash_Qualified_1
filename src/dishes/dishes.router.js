const router = require("express").Router({mergeParams: true });
const controller = require("./dishes.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const ordersRouter = require("../orders/orders.router");

// TODO: Implement the /dishes routes needed to make the tests pass
router.use("/:dishId/orders", controller.dishExists, ordersRouter)

router.route("/:dishId").get(controller.read).put(controller.update).all(methodNotAllowed)

router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed)

module.exports = router;
