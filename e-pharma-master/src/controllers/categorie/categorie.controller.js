/* eslint-disable import/no-import-module-exports */
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import { Categorie, User } from '../../models';
import {
  successResponse,
  errorResponse,
  cloudUpload,
  deleteFile,
} from '../../helpers/index';

// add categories by admin
exports.addCategory = async (req, res) => {
  try {
    const payload = {
      id: uuidv4(),
      categoryName: req.body.categoryName,
      categoryImage: `${process.env.AWS_BUCKET_URL}${req.file.filename}.${req.file.mimetype.split('/')[1]}`,
    };

    try {
      await cloudUpload(req.file);
    } catch (error) {
      return errorResponse(
        req,
        res,
        'Category image upload Error!',
        500,
        error.message,
      );
    }

    // check if category exist or not
    const categoryData = await Categorie.findOne({
      where: {
        categoryName: payload.categoryName,
      },
    });
    if (categoryData) {
      return errorResponse(req, res, `Category already exist with name: ${categoryData.categoryName}`, 409);
    }

    await Categorie.create(payload);
    return successResponse(req, res, 'category successfully added', 200);
  } catch (error) {
    await deleteFile(req.file.path);
    return errorResponse(req, res, 'Something went wrong!', 500);
  }
};

// view all categories by admin
exports.viewCategory = async (req, res) => {
  try {
    // pagination
    const page = (Number(req.query.page) <= 0) ? 1 : Number(req.query.page) || 1;
    const size = (Number(req.query.size) <= 0) ? 5 : Number(req.query.size) || 5;

    const categorieData = await Categorie.findAndCountAll({
      limit: size,
      offset: (page - 1) * size,
      attributes: ['id', 'categoryName', 'categoryImage'],
    });

    // check if data exist or not
    if (categorieData.length === 0) {
      return errorResponse(req, res, 'Add category to view categories!', 404);
    }

    const pagination = {
    };

    if (((page - 1) * size) > 0) {
      pagination.prev = page - 1;
    }

    if ((page * size) < categorieData.count) {
      pagination.next = page + 1;
    }

    const resultCategories = {
      data: categorieData.rows,
      currentPage: page,
      previousPage: pagination.prev,
      nextPage: pagination.next,
    };

    return successResponse(req, res, resultCategories, 200);
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};

// view any one category by admin
exports.viewCategoryOne = async (req, res) => {
  try {
    // check if id parameter is there or not
    if (!req.params.categoryId) {
      return errorResponse(req, res, 'category id is required!', 401);
    }

    const categorieData = await Categorie.findAll({
      where: {
        id: req.params.categoryId,
      },
      attributes: ['id', 'categoryName', 'categoryImage'],
    });
    return successResponse(req, res, categorieData, 200);
  } catch (error) {
    return errorResponse(req, res, 'Category does not found', 404);
  }
};

// remove any category permanently by admin
exports.deleteCategory = async (req, res) => {
  try {
    // check if id parameter is there or not
    if (!req.params.categoryId) {
      return errorResponse(req, res, 'category id is required!', 401);
    }

    await Categorie.destroy({
      where: {
        id: req.params.categoryId,
      },
    });

    return successResponse(req, res, 'category data deleted successfully', 200);
  } catch (error) {
    return errorResponse(req, res, 'Error while deleting category data', 500);
  }
};

// edit category name by admin
exports.updateCategory = async (req, res) => {
  try {
    // check if id parameter is there or not
    if (!req.params.categoryId) {
      return errorResponse(req, res, 'category id is required!', 401);
    }

    // check if category is exist or not
    const categoryData = await Categorie.findOne({
      where: {
        id: req.params.categoryId,
      },
    });
    if (!categoryData) {
      return errorResponse(req, res, 'Category data does not exist!', 404);
    }

    const { categoryName } = req.body;

    const payload = {
      id: req.params.categoryId,
      categoryName,
      categoryImage: `${process.env.AWS_BUCKET_URL}${req.file.filename}.${req.file.mimetype.split('/')[1]}`,
    };

    try {
      await cloudUpload(req.file);
    } catch (error) {
      return errorResponse(req, res, 'category image update Error', 500);
    }

    await Categorie.update(payload, { where: { id: req.params.categoryId } });
    return successResponse(req, res, 'category data updated successfully', 200);
  } catch (error) {
    await deleteFile(req.file.path);
    return errorResponse(req, res, error.message, 500);
  }
};

// categories shown from user side
exports.viewCategories = async (req, res) => {
  try {
    const sortBy = req.query.sortBy || 'categoryName';
    const sortOrder = req.query.sortOrder || 'ASC';
    const search = req.query.search || '';
    // check if user is verified or not
    const verifyUser = await User.findAll({
      where: {
        id: req.user.id,
        isVerified: true,
      },
    });

    if (!verifyUser) {
      return errorResponse(req, res, 'User email is not verified!', 401);
    }

    const categorieData = await Categorie.findAll({
      where: {
        categoryName: { [Op.iLike]: `%${search}%` },
      },
      attributes: [
        'id', 'categoryName', 'categoryImage',
      ],
      order: [[`${sortBy}`, `${sortOrder}`]],
    });

    if (!categorieData) {
      return errorResponse(req, res, 'Category not found!', 404);
    }
    return successResponse(req, res, categorieData, 200);
  } catch (error) {
    return errorResponse(req, res, 'something went wrong!', 500);
  }
};
