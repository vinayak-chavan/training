/* eslint-disable import/no-import-module-exports */
/* eslint-disable import/named */
import express from 'express';
import {
  addProducts,
  viewProducts,
  viewProductsOne,
  deleteProducts,
  updateProducts,
  viewProduct,
  viewDiseaseProduct,
} from '../controllers/product/product.controller';
// eslint-disable-next-line import/named
import { productRegisterValidation, productUpdateValidation } from '../controllers/product/product.validator';
import { upload, uploadUpdateImagePro } from '../helpers/index';
import { verifyTokenAuth } from '../middlewares/verifyAuthToken';
import { adminRole, userRole } from '../middlewares/checkRole';
import { checkIfDiseaseExist, checkProduct } from '../middlewares/checkCategory';

const router = express.Router();

// routes for admin
router.post('/products/:categoryDiseaseId', verifyTokenAuth, adminRole, checkIfDiseaseExist, upload.single('productImage'), productRegisterValidation, addProducts);
router.get('/products/:categoryDiseaseId', verifyTokenAuth, adminRole, checkProduct, viewProducts);
router.get('/product/:productId', verifyTokenAuth, adminRole, viewProductsOne);
router.delete('/products/:productId', verifyTokenAuth, adminRole, deleteProducts);
router.put('/products/:productId', verifyTokenAuth, adminRole, uploadUpdateImagePro.single('productImage'), productUpdateValidation, updateProducts);

// routes for user
router.get('/all-product/:categoryDiseaseId', verifyTokenAuth, userRole, checkProduct, viewProduct);
router.get('/disease-product/:diseaseId', verifyTokenAuth, userRole, viewDiseaseProduct);

module.exports = router;
