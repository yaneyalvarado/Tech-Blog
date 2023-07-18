const router = require('express').Router();

const api = require('../controllers/api');
const homeRoutes = require('../controllers/home-routes');

router.use("/api", api);
router.use("/", homeRoutes);

module.exports = router;