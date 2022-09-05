const jwt = require('jsonwebtoken');
const User = require("../models/user");
const { successResponse, errorResponse } = require('../utils');

const auth = async (req, res, next) => {
    console.log(req.headers.authorization);
    const authorization = req.headers.authorization;
 
    if (authorization && authorization.startsWith("Bearer")) {
        let token = authorization.split(" ")[1]
        try {
            
            let payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            let user = await User.findById(payload.id, "-password -__v")
            if (!user) {
              console.log('User Not Found');
              return errorResponse(req, res, 'User Not Found', 404);
            }
            req.user = user
            console.log(req.user);
            next();
            
        } catch (error) {
            next(error)
        }
    }
    else {
      return errorResponse(req, res, 'Invalid Authorization Token', 404);
    }
}

module.exports = { auth }
