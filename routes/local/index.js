const router = require('express').Router();
const carrosRouter = require('./user');


router.use('/carros', carrosRouter);

module.exports = router;