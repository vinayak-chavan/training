/* eslint-disable import/no-import-module-exports */
import { v4 as uuidv4 } from 'uuid';
import { Disease, Categorie } from '../../models';
import {
  successResponse,
  errorResponse,
} from '../../helpers/index';

// add diseases by admin
exports.addDiseases = async (req, res) => {
  try {
    // check if category is diseases or not
    const categorieData = await Categorie.findOne({
      where: {
        id: req.params.categoryId,
      },
    });

    if (categorieData.categoryName !== 'Diseases') {
      if (categorieData.categoryName !== 'diseases') {
        return errorResponse(req, res, 'Category name should be Disease', 404);
      }
    }

    const payload = {
      id: uuidv4(),
      categoryId: req.params.categoryId,
      diseaseName: req.body.diseaseName,
      diseaseDescription: req.body.diseaseDescription,
    };

    // check if diseases exist or not
    const diseasesData = await Disease.findOne({
      where: {
        diseaseName: payload.diseaseName,
      },
    });
    if (diseasesData) {
      return errorResponse(req, res, `diseases already exist with name: ${diseasesData.diseaseName}`, 409);
    }

    await Disease.create(payload);
    return successResponse(req, res, 'diseases successfully added', 200);
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};

// view diseases by admin
exports.viewDiseases = async (req, res) => {
  try {
    // pagination
    const page = (Number(req.query.page) <= 0) ? 1 : Number(req.query.page) || 1;
    const size = (Number(req.query.size) <= 0) ? 5 : Number(req.query.size) || 5;

    const diseaseData = await Disease.findAndCountAll({
      limit: size,
      offset: (page - 1) * size,
      attributes: ['id', 'diseaseName', 'diseaseDescription'],
    });

    // check if data exist or not
    if (diseaseData.length === 0) {
      return errorResponse(req, res, 'Add disease to view diseases!', 404);
    }

    const pagination = {
    };

    if (((page - 1) * size) > 0) {
      pagination.prev = page - 1;
    }

    if ((page * size) < diseaseData.count) {
      pagination.next = page + 1;
    }

    const resultDisease = {
      data: diseaseData.rows,
      currentPage: page,
      previousPage: pagination.prev,
      nextPage: pagination.next,
    };

    return successResponse(req, res, resultDisease, 200);
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};

// view any one disease by admin
exports.viewDiseasesOne = async (req, res) => {
  try {
    // check if id parameter is there or not
    if (!req.params.diseasesId) {
      return errorResponse(req, res, 'diseases id is required!', 401);
    }

    const diseaseData = await Disease.findAll({
      where: {
        id: req.params.diseasesId,
      },
      attributes: ['id', 'diseaseName', 'diseaseDescription'],
    });
    return successResponse(req, res, diseaseData, 200);
  } catch (error) {
    return errorResponse(req, res, 'diseases does not found', 404);
  }
};

// delete disease by admin
exports.deleteDiseases = async (req, res) => {
  try {
    // check if id parameter is there or not
    if (!req.params.diseasesId) {
      return errorResponse(req, res, 'diseases id is required!', 401);
    }

    await Disease.destroy({
      where: {
        id: req.params.diseasesId,
      },
    });

    return successResponse(req, res, 'disease data deleted successfully', 200);
  } catch (error) {
    return errorResponse(req, res, 'Error while deleting diseases data', 500);
  }
};

// edit disease name and description by admin
exports.updateDiseases = async (req, res) => {
  try {
    // check if id parameter is there or not
    if (!req.params.diseasesId) {
      return errorResponse(req, res, 'diseases id is required!', 401);
    }

    // check if diseases is exist or not
    const diseasesData = await Disease.findOne({
      where: {
        id: req.params.diseasesId,
      },
    });
    if (!diseasesData) {
      return errorResponse(req, res, 'diseases data does not exist!', 404);
    }

    const { diseaseName, diseaseDescription } = req.body;

    const payload = {
      id: req.params.diseasesId,
      diseaseName,
      diseaseDescription,
    };

    await Disease.update(payload, { where: { id: req.params.diseasesId } });
    return successResponse(req, res, 'disease data updated successfully', 200);
  } catch (error) {
    return errorResponse(req, res, 'error while updating disease data', 500);
  }
};

// diseases shown from user side
exports.viewDisease = async (req, res) => {
  try {
    const sortBy = 'diseaseName';
    const sortOrder = 'ASC';

    const diseaseData = await Disease.findAll({
      attributes: [
        'id', 'diseaseName', 'diseaseDescription',
      ],
      order: [[`${sortBy}`, `${sortOrder}`]],
    });

    if (!diseaseData) {
      return errorResponse(req, res, 'diseases not found!', 404);
    }
    return successResponse(req, res, diseaseData, 200);
  } catch (error) {
    return errorResponse(req, res, 'something went wrong!', 500);
  }
};
