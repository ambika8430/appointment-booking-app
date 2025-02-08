const express = require('express');
const router = express.Router();
const productController = require('../controllers/admin');

router.get('/', productController.getProducts);
router.post('/', productController.postAddProduct);
router.get('/edit/:userId', productController.getEditProduct);
router.put('/edit/:userId', productController.putEditProduct);
router.delete('/delete/:userId', productController.deleteProduct);

module.exports = router;
