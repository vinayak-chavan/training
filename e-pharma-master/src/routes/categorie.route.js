/* eslint-disable import/no-import-module-exports */
/* eslint-disable import/named */
import express from 'express';
import {
  addCategory,
  viewCategory,
  viewCategoryOne,
  deleteCategory,
  updateCategory,
  viewCategories,
} from '../controllers/categorie/categorie.controller';
import {
  categoryRegisterValidation,
  categoryUpdateValidation,
} from '../controllers/categorie/categorie.validator';
import { upload, uploadUpdateImage } from '../helpers/index';
import { verifyTokenAuth } from '../middlewares/verifyAuthToken';
import { adminRole, userRole } from '../middlewares/checkRole';

const router = express.Router();

// routes for admin
router.post('/categories', verifyTokenAuth, adminRole, upload.single('categoryImage'), categoryRegisterValidation, addCategory);
router.get('/categories', verifyTokenAuth, adminRole, viewCategory);
router.get('/categories/:categoryId', verifyTokenAuth, adminRole, viewCategoryOne);
router.delete('/categories/:categoryId', verifyTokenAuth, adminRole, deleteCategory);
router.put('/categories/:categoryId', verifyTokenAuth, adminRole, uploadUpdateImage.single('categoryImage'), categoryUpdateValidation, updateCategory);

// routes for user
router.get('/category', verifyTokenAuth, userRole, viewCategories);

module.exports = router;
