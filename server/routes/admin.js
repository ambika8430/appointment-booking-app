const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review');
const userController = require('../controllers/user');

router.get('/review', reviewController.getReviews);
router.post('/review', reviewController.postAddReview);
router.delete('/review/:id', reviewController.deleteReview);

router.get('/user', userController.getUser);
router.post('/user/sign-up', userController.createUser);
router.post('/user/sign-in', userController.verifyUser);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

module.exports = router;
