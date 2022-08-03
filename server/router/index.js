const userController = require('../controllers/user-controller');
const {body} = require('express-validator');
const Router = require('express').Router;
const router = new Router();
const authMiddleware = require('../middlewares/auth-middleware');
const emailController = require('../controllers/email-controller');

router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/registration', body('email').isEmail(), body('password').isLength({min: 4, max: 20}), userController.registration);
router.post('/send',  emailController.sendEmail)

router.get('/refresh', userController.refresh);
router.get('/user/:email', userController.getUserByEmail);
router.get('/inboxes/:recipientId', emailController.getInboxes);
router.get('/outboxes/:senderId', emailController.getOutboxes);
router.get('/importans/:recipientId', emailController.getImportans);
router.get('/email/:id', emailController.getEmailById);

router.put('/important', emailController.setIsImportantEmail);
router.put('/read', emailController.setIsReadEmail);
router.put('/edit/email', emailController.editEmail);
router.put('/theme', userController.changeTheme);

router.delete('/delete/:id', emailController.deleteEmail);

module.exports = router;