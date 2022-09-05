/* eslint-disable import/no-import-module-exports */
import { hash, compare } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { sign } from 'jsonwebtoken';
import { User, OtpUser, Addresses } from '../../models';
import { successResponse, errorResponse } from '../../helpers/index';
import { sendmail } from '../../utils/mail';

// login user
exports.loginUser = async (req, res) => {
  try {
    // check if user found or not
    const userobj = await User.findOne({
      where: {
        email: req.body.email,
        isArchived: false,
      },
    });
    if (!userobj) {
      return errorResponse(
        req,
        res,
        `user not found with email: ${req.body.email}`,
        406,
      );
    }

    // check if email verify or not
    if (!userobj.isVerified) {
      return errorResponse(req, res, `user email: ${userobj.email} is not verified`, 401);
    }

    // if password match generate token and update user table
    const result = await compare(req.body.password, userobj.password);
    if (!result) {
      return errorResponse(req, res, 'invalid credentials!', 406);
    }

    const verifyToken = sign(
      { id: userobj.id, email: userobj.email, isAdmin: userobj.isAdmin },
      process.env.verifyToken,
      { expiresIn: '1d' },
    );

    await User.update({ verifytoken: verifyToken }, {
      where: {
        id: userobj.id,
      },
    });

    // userid and verifytoken for response
    const resultData = {
      token: verifyToken,
      userId: userobj.id,
    };

    return successResponse(req, res, resultData, 200);
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};

// logout user
exports.logoutUser = async (req, res) => {
  try {
    await User.update(
      { verifytoken: '' },
      {
        where: {
          id: req.user.id,
          isArchived: false,
        },
      },
    );

    return successResponse(req, res, 'logout successfully', 200);
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};

// user register
exports.addUser = async (req, res) => {
  try {
    // check if user exist or not
    const user = await User.findOne({
      where: { email: req.body.email },
    });
    if (user) {
      return errorResponse(
        req,
        res,
        `USER ALREADY EXIST WITH ${req.body.email}`,
        409,
      );
    }

    const passwordHash = await hash(req.body.password, 10);
    const otp = Math.floor(Math.random() * 1000000 + 1);

    const payload = {
      id: uuidv4(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: passwordHash,
      contactNo: req.body.contactNo,
      isAdmin: false,
      isVerified: false,
      isArchived: false,
    };

    await User.create(payload);

    const payloadOtp = {
      id: uuidv4(),
      userId: payload.id,
      otp,
    };

    try {
      await OtpUser.create(payloadOtp);
    } catch (error) {
      return errorResponse(req, res, 'error while generating otp', 401);
    }
    sendmail(
      payload.email,
      'OTP',
      `YOUR OTP FOR VERFICATION OF EMAIL: ${payload.email} IS: ${otp}. Valid till 10 minutes`,
    );
    return successResponse(req, res, 'user successfully added', 200);
  } catch (error) {
    return errorResponse(req, res, 'something went wrong!', 500);
  }
};

// add admin by admin
exports.addAdmin = async (req, res) => {
  try {
    // check if user exist or not
    const user = await User.findOne({
      where: { email: req.body.email },
    });
    if (user) {
      return errorResponse(
        req,
        res,
        `USER ALREADY EXIST WITH ${req.body.email}`,
        409,
      );
    }

    const passwordHash = await hash(req.body.password, 10);
    const otp = Math.floor(Math.random() * 1000000 + 1);

    const payload = {
      id: uuidv4(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: passwordHash,
      contactNo: req.body.contactNo,
      isAdmin: true,
      isVerified: false,
      isArchived: false,
    };

    await User.create(payload);

    const payloadOtp = {
      id: uuidv4(),
      userId: payload.id,
      otp,
    };

    try {
      await OtpUser.create(payloadOtp);
    } catch (error) {
      return errorResponse(req, res, 'error while generating otp', 401);
    }

    sendmail(
      payload.email,
      'Pharmly',
      `YOUR PASSWORD FOR LOGIN INTO PHARMLY IS: ${req.body.password} OF EMAIL: ${payload.email} AND YOUR OTP FOR VERIFY EMAILID IS: ${otp}. Valid till 10 minutes`,
    );
    return successResponse(req, res, 'user successfully added', 200);
  } catch (error) {
    return errorResponse(req, res, 'something went wrong!', 500);
  }
};

// view own profile of user
exports.viewUserOne = async (req, res) => {
  try {
    // check if id parameter is there or not
    if (!req.params.userId) {
      return errorResponse(req, res, 'userid is required!', 401);
    }

    const userData = await User.findOne({
      where: {
        id: req.params.userId,
        isArchived: false,
      },
      attributes: ['id', 'firstName', 'lastName', 'email', 'contactNo'],
    });

    return successResponse(req, res, userData, 200);
  } catch (error) {
    return errorResponse(req, res, 'User does not exist', 404);
  }
};

// view all users by admin
exports.viewUsers = async (req, res) => {
  try {
    const userData = await User.findAll({
      where: {
        isArchived: false,
      },
    });

    return successResponse(req, res, userData, 200);
  } catch (error) {
    return errorResponse(req, res, 'User does not exist', 404);
  }
};

// remove user
exports.deleteUser = async (req, res) => {
  try {
    // check if id parameter is there or not
    if (!req.params.userId) {
      return errorResponse(req, res, 'userid is required!', 401);
    }

    // check if user exist or not
    try {
      const dataId = await User.findOne({
        where: {
          id: req.params.userId,
        },
      });

      if (!dataId) {
        return errorResponse(req, res, 'User data does not exist!', 404);
      }
    } catch (error) {
      return errorResponse(req, res, 'error while fetching userdara', 500);
    }

    // soft delete for admin
    await User.update({ isArchived: true }, { where: { id: req.params.userId } });

    // update data in address table
    try {
      await Addresses.update(
        {
          isArchived: true,
        },
        {
          where: {
            userId: req.params.userId,
          },
        },
      );
    } catch (error) {
      return errorResponse(req, res, 'Something went wrong!', 500);
    }

    return successResponse(req, res, 'user data deleted successfully', 200);
  } catch (error) {
    return errorResponse(req, res, 'error while removing profile', 500);
  }
};

// edit profile of user
exports.updateUser = async (req, res) => {
  try {
    // check if id parameter is there or not
    if (!req.params.userId) {
      return errorResponse(req, res, 'userid is required!', 401);
    }

    // check if user exist or not
    try {
      const dataId = await User.findOne({
        where: {
          id: req.params.userId,
        },
      });

      if (!dataId) {
        return errorResponse(req, res, 'User data does not exist!', 404);
      }
    } catch (error) {
      return errorResponse(req, res, 'error while fetching userdara', 500);
    }

    const { firstName, lastName, contactNo } = req.body;

    const payload = {
      firstName,
      lastName,
      contactNo,
    };

    await User.update(payload, { where: { id: req.params.userId } });

    return successResponse(req, res, 'user data updated successfully', 200);
  } catch (error) {
    return errorResponse(req, res, 'error while updating data', 500);
  }
};

// resend otp to user
exports.otpResend = async (req, res) => {
  try {
    // find user id for resend otp to their email
    const userobj = await User.findOne({
      where: {
        email: req.body.email,
        isArchived: false,
      },
    });

    if (!userobj) {
      return errorResponse(
        req,
        res,
        `user email: ${userobj.email} does not exist!`,
      );
    }

    // find user id in OTP table for delete old otp
    const otpData = await OtpUser.findOne({
      where: {
        userId: userobj.id,
      },
    });

    if (otpData) {
      await OtpUser.destroy({
        where: {
          userId: userobj.id,
        },
      });
    }

    // generate new otp for resend to user email
    const otp = Math.floor(Math.random() * 1000000 + 1);

    const payloadOtp = {
      id: uuidv4(),
      userId: userobj.id,
      otp,
    };

    // add new otp in OtpUser table
    try {
      await OtpUser.create(payloadOtp);
    } catch (error) {
      return errorResponse(req, res, 'error while sending otp', 401);
    }
    sendmail(
      userobj.email,
      'OTP',
      `YOUR NEW OTP FOR VERFICATION OF ${userobj.email} IS: ${otp}`,
    );
    return successResponse(req, res, 'otp send successfully', 200);
  } catch (error) {
    return errorResponse(req, res, 'something went wrong!', 500);
  }
};

// otp verification
// eslint-disable-next-line consistent-return
exports.otpVerify = async (req, res) => {
  try {
    const { otp, email } = req.body;

    if (!otp || !email) {
      return errorResponse(req, res, 'email and otp required', 406);
    }

    // find user id for resend otp to their email
    const userobj = await User.findOne({
      where: {
        email,
        isArchived: false,
      },
    });

    if (!userobj) {
      return errorResponse(
        req,
        res,
        `user email: ${userobj.email} does not exist!`,
        401,
      );
    }

    // find user id in OTP table for delete old otp
    const otpData = await OtpUser.findOne({
      where: {
        userId: userobj.id,
      },
    });

    if (!otpData) {
      return errorResponse(req, res, 'something went wrong!', 500);
    }

    if (otpData.otp === Number(otp)) {
      try {
        await OtpUser.destroy({
          where: {
            userId: userobj.id,
          },
        });

        await User.update(
          { isVerified: true },
          {
            where: {
              id: userobj.id,
            },
          },
        );

        // if user verified
        const verifyToken = sign(
          { id: userobj.id, email: userobj.email, isAdmin: userobj.isAdmin },
          process.env.verifyToken,
          { expiresIn: '1d' },
        );

        await User.update({ verifytoken: verifyToken }, {
          where: {
            id: userobj.id,
          },
        });

        // userid and verifytoken for response
        const resultData = {
          token: verifyToken,
          userId: userobj.id,
        };

        return successResponse(req, res, resultData, 200);
      } catch (error) {
        return errorResponse(req, res, 'Something went wrong!', 500);
      }
    }
    return errorResponse(
      req,
      res,
      `otp: ${req.body.otp} does not matched!`,
      401,
    );
  } catch (error) {
    return errorResponse(
      req,
      res,
      'error while verifying your otp',
      401,
    );
  }
};

// change password for user
exports.changePassword = async (req, res) => {
  try {
    if (!req.body.password || !req.body.newPassword) {
      return errorResponse(req, res, 'password fields are required!', 406);
    }

    // to find old password
    const userObj = await User.findOne({
      where: {
        id: req.user.id,
      },
      attributes: ['id', 'email', 'password'],
    });

    const decryptedPassword = await compare(req.body.password, userObj.password);

    // check if old password is not same
    if (!decryptedPassword) {
      return errorResponse(req, res, 'inavalid password!', 406);
    }

    // update old password with new password
    const hashPassword = await hash(req.body.newPassword, 10);
    await User.update({ password: hashPassword }, {
      where: {
        id: userObj.id,
      },
    });

    return successResponse(req, res, 'password updated successfully', 200);
  } catch (error) {
    return errorResponse(req, res, 'error while changing password!', 500);
  }
};

// forgot password
exports.forgotPassword = async (req, res) => {
  try {
    if (!req.body.email || !req.body.newPassword) {
      return errorResponse(req, res, 'password fields are required!', 406);
    }

    // update old password with new password
    const hashPassword = await hash(req.body.newPassword, 10);
    await User.update({ password: hashPassword }, {
      where: {
        email: req.body.email,
      },
    });

    return successResponse(req, res, 'password updated successfully', 200);
  } catch (error) {
    return errorResponse(req, res, 'something went wrong!', 500);
  }
};
