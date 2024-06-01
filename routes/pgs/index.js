const router = require('express').Router();
const commentsRouter = require('./comments');
const topicRouter = require('./topic');
const userRouter = require('./user');
const authRouter = require('./auth');

router.use('/comments', commentsRouter);
router.use('/topic', topicRouter);
router.use('/user', userRouter);
router.use('/auth', authRouter);

module.exports = router;