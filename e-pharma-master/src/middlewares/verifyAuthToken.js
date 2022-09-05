/* eslint-disable import/no-import-module-exports */
import { verify } from 'jsonwebtoken';
import { errorResponse } from '../helpers';
import { User } from '../models';

exports.verifyTokenAuth = async (req, res, next) => {
  try {
    const authorizationToken = req.headers.authorization;
    if (!authorizationToken) {
      return errorResponse(req, res, 'Authorization token is not defined!');
    }
    const accessToken = authorizationToken.split(' ')[1];
    let payload;
    try {
      payload = verify(accessToken, process.env.verifyToken);
    } catch (error) {
      return errorResponse(req, res, 'Authorization Error!', 401);
    }
    const matchedUser = await User.findOne({
      where: {
        email: payload.email,
        isAdmin: payload.isAdmin,
        isArchived: false,
      },
      attributes: ['email', 'isAdmin', 'id', 'verifytoken'],
    });

    if (!matchedUser) {
      return errorResponse(req, res, 'user data does not exist!', 500);
    }

    // Check if verifyToken matched or not
    if (accessToken !== matchedUser.verifytoken) {
      return errorResponse(req, res, 'Please login first', 401);
    }

    // If token matched then send user's data to next route
    req.user = { id: payload.id, email: payload.email, isAdmin: payload.isAdmin };
    return next();
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};
