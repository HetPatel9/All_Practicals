const express = require("express");
const queries = require("../Controller/queryController");

const router = express.Router();

router.get("/fetchAllUserOrder", queries.fetchAllUserOrder);
router.get("/undeliveredOrder", queries.undeliveredOrder);
router.get("/activeUsers", queries.activeUsers);
router.get("/inactiveUsers", queries.inactiveUsers);
router.get("/recentOrders", queries.recentOrders);
router.get("/popularProducts", queries.popularPorduct);
router.get("/mostExpensiveOrder", queries.mostExpensiveOrder);
router.get("/mostCheapOrder", queries.mostCheapOrder);

module.exports = router;
