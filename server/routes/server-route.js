const express = require('express');
const controller = require('../controller/server-controller');

const router = express.Router();

router.get('/test-server/:version', controller.testServer);

module.exports = router;