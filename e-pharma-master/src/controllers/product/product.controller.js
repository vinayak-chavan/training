/* eslint-disable import/no-import-module-exports */
import { v4 as uuidv4 } from 'uuid';
import { Product, Disease } from '../../models';
import {
  successResponse,
  errorResponse,
  cloudUpload,
  deleteFile,
} from '../../helpers/index';

// add products by admin
exports.addProducts = async (req, res) => {
  try {
    let payload = {};
    // if id is category of disease
    if (!req.categoryId) {
      const diseaseData = await Disease.findOne({
        where: {
          id: req.diseaseId,
        },
        attributes: [
          'id', 'categoryId',
        ],
      });

      payload = {
        id: uuidv4(),
        categoryId: diseaseData.categoryId,
        diseaseId: req.diseaseId,
        title: req.body.title,
        companyName: req.body.companyName,
        price: req.body.price,
        productImage: `${process.env.AWS_BUCKET_URL}${req.file.filename}.${req.file.mimetype.split('/')[1]}`,
      };
    } else {
      // if id is category itself
      payload = {
        id: uuidv4(),
        categoryId: req.categoryId,
        title: req.body.title,
        companyName: req.body.companyName,
        price: req.body.price,
        productImage: `${process.env.AWS_BUCKET_URL}${req.file.filename}.${req.file.mimetype.split('/')[1]}`,
      };
    }

    try {
      await cloudUpload(req.file);
    } catch (error) {
      return errorResponse(
        req,
        res,
        'Product image upload Error!',
        500,
        error.message,
      );
    }

    // check if category exist or not
    const productData = await Product.findOne({
      where: {
        title: payload.title,
      },
    });
    if (productData) {
      return errorResponse(req, res, `Product already exist with name: ${productData.title}`, 409);
    }

    await Product.create(payload);
    return successResponse(req, res, 'Product successfully added', 200);
  } catch (error) {
    await deleteFile(req.file.path);
    return errorResponse(req, res, 'Something went wrong!', 500);
  }
};

// view products by admin
exports.viewProducts = async (req, res) => {
  try {
    // pagination
    const page = (Number(req.query.page) <= 0) ? 1 : Number(req.query.page) || 1;
    const size = (Number(req.query.size) <= 0) ? 5 : Number(req.query.size) || 5;

    let productData;
    if (!req.categoryId) {
      productData = await Product.findAndCountAll({
        where: {
          diseaseId: req.params.categoryDiseaseId,
        },
        limit: size,
        offset: (page - 1) * size,
        attributes: ['id', 'title', 'companyName', 'price', 'productImage'],
      });
    } else {
      productData = await Product.findAndCountAll({
        where: {
          categoryId: req.params.categoryDiseaseId,
        },
        limit: size,
        offset: (page - 1) * size,
        attributes: ['id', 'title', 'companyName', 'price', 'productImage'],
      });
    }

    // check if data exist or not
    if (productData.length === 0) {
      return errorResponse(req, res, 'Add product to view products!', 404);
    }

    const pagination = {
    };

    if (((page - 1) * size) > 0) {
      pagination.prev = page - 1;
    }

    if ((page * size) < productData.count) {
      pagination.next = page + 1;
    }

    const resultProduct = {
      data: productData.rows,
      currentPage: page,
      previousPage: pagination.prev,
      nextPage: pagination.next,
    };

    return successResponse(req, res, resultProduct, 200);
  } catch (error) {
    return errorResponse(req, res, error.message, 500, error);
  }
};

// view any one product by admin
exports.viewProductsOne = async (req, res) => {
  try {
    // check if id parameter is there or not
    if (!req.params.productId) {
      return errorResponse(req, res, 'product id is required!', 401);
    }

    const productData = await Product.findOne({
      where: {
        id: req.params.productId,
      },
      attributes: ['id', 'title', 'companyName', 'price', 'productImage'],
    });
    return successResponse(req, res, productData, 200);
  } catch (error) {
    return errorResponse(req, res, 'Product does not found', 404);
  }
};

// delete products by admin
exports.deleteProducts = async (req, res) => {
  try {
    // check if id parameter is there or not
    if (!req.params.productId) {
      return errorResponse(req, res, 'product id is required!', 401);
    }

    await Product.destroy({
      where: {
        id: req.params.productId,
      },
    });

    return successResponse(req, res, 'Product data deleted successfully', 200);
  } catch (error) {
    return errorResponse(req, res, 'Error while deleting product data', 500);
  }
};

// update product by admin side
exports.updateProducts = async (req, res) => {
  try {
    // check if id parameter is there or not
    if (!req.params.productId) {
      return errorResponse(req, res, 'product id is required!', 401);
    }

    const productData = await Product.findOne({
      where: {
        id: req.params.productId,
      },
      attributes: ['id', 'title', 'companyName', 'price', 'productImage'],
    });

    if (!productData) {
      return errorResponse(req, res, 'Product data does not exist!', 404);
    }

    const { title, companyName, price } = req.body;

    const payload = {
      id: req.params.productId,
      title,
      companyName,
      price,
      productImage: `${process.env.AWS_BUCKET_URL}${req.file.filename}.${req.file.mimetype.split('/')[1]}`,
    };

    try {
      await cloudUpload(req.file);
    } catch (error) {
      return errorResponse(req, res, 'product image update Error', 500);
    }

    await Product.update(payload, { where: { id: req.params.productId } });
    return successResponse(req, res, 'product data updated successfully', 200);
  } catch (error) {
    await deleteFile(req.file.path);
    return errorResponse(req, res, error.message, 500);
  }
};

// view products by user
exports.viewProduct = async (req, res) => {
  try {
    const sortBy = 'title';
    const sortOrder = 'ASC';

    // check if id parameter is there or not
    if (!req.params.categoryDiseaseId) {
      return errorResponse(req, res, 'category id is required!', 401);
    }

    const productData = await Product.findAll({
      where: {
        categoryId: req.params.categoryDiseaseId,
      },
      attributes: ['id', 'title', 'companyName', 'price', 'productImage'],
      order: [[`${sortBy}`, `${sortOrder}`]],
    });

    if (!productData) {
      return errorResponse(req, res, 'Product not found!', 404);
    }
    return successResponse(req, res, productData, 200);
  } catch (error) {
    return errorResponse(req, res, 'something went wrong!', 500);
  }
};

// view products by user(categry: disease)
exports.viewDiseaseProduct = async (req, res) => {
  try {
    const sortBy = 'title';
    const sortOrder = 'ASC';

    // check if id parameter is there or not
    if (!req.params.diseaseId) {
      return errorResponse(req, res, 'disease id is required!', 401);
    }

    // check if disease is there or not
    const diseaseExist = await Product.findOne({
      where: {
        diseaseId: req.params.diseaseId,
      },
    });

    if (!diseaseExist) {
      return errorResponse(req, res, 'Product not found!', 404);
    }

    const productData = await Product.findAll({
      where: {
        diseaseId: req.params.diseaseId,
      },
      attributes: ['id', 'title', 'companyName', 'price', 'productImage'],
      order: [[`${sortBy}`, `${sortOrder}`]],
    });

    if (!productData) {
      return errorResponse(req, res, 'Product not found!', 404);
    }
    return successResponse(req, res, productData, 200);
  } catch (error) {
    return errorResponse(req, res, 'something went wrong!', 500);
  }
};
