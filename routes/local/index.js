const router = require('express').Router();
const commentsRouter = require('./comments');
const topicRouter = require('./topic');
const userRouter = require('./user');

router.use('/comments', commentsRouter);
router.use('/topic', topicRouter);
router.use('/user', userRouter);

module.exports = router;