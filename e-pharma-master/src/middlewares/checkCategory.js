/* eslint-disable import/no-import-module-exports */
import { errorResponse } from '../helpers';
import { Categorie, Disease } from '../models';

// check if it is dieases or not... for dieases view
exports.checkDisease = async (req, res, next) => {
  try {
    const categorieData = await Categorie.findOne({
      where: {
        id: req.params.categoryId,
      },
    });

    if (categorieData.categoryName !== 'Diseases') {
      if (!req.user.isAdmin) {
        return res.redirect(`/all-product/${categorieData.id}`);
      }
      return res.redirect(`/products/${categorieData.id}`);
    }

    return next();
  } catch (error) {
    return errorResponse(req, res, 'Something went wrong!', 500);
  }
};

// check if category is dieases to store products dieases id and category id
exports.checkIfDiseaseExist = async (req, res, next) => {
  try {
    const diseasesData = await Disease.findOne({
      where: {
        id: req.params.categoryDiseaseId,
      },
    });

    if (!diseasesData) {
      const categorieData = await Categorie.findOne({
        where: {
          id: req.params.categoryDiseaseId,
        },
      });

      if (categorieData.categoryName !== 'Diseases') {
        req.categoryId = categorieData.id;
        return next();
      }
    }

    req.diseaseId = diseasesData.id;
    return next();
  } catch (error) {
    return errorResponse(req, res, 'Something went wrong!', 500);
  }
};

// check if its normal category or not... for product view
exports.checkProduct = async (req, res, next) => {
  try {
    const diseasesData = await Disease.findOne({
      where: {
        id: req.params.categoryDiseaseId,
      },
    });

    if (!diseasesData) {
      const categorieData = await Categorie.findOne({
        where: {
          id: req.params.categoryDiseaseId,
        },
      });

      if (categorieData.categoryName === 'Diseases') {
        // check if its admin or not
        if (!req.user.isAdmin) {
          return res.redirect(`/all-disease/${categorieData.id}`);
        }
        return res.redirect(`/diseases/${categorieData.id}`);
      }
      req.categoryId = categorieData.id;
      return next();
    }
    req.diseaseId = diseasesData.id;
    return next();
  } catch (error) {
    return errorResponse(req, res, 'Something went wrong!', 500);
  }
};
