const { errorResponse } = require('../helpers');

exports.userRole = async (req, res, next) => {
  if (req.user.isAdmin) {
    return errorResponse(req, res, 'Permission denied!', 403);
  }
  return next();
};

exports.adminRole = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return errorResponse(req, res, 'Permission denied!', 403);
  }
  return next();
};
