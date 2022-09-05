/* eslint-disable import/no-import-module-exports */
/* eslint-disable import/named */
import express from 'express';
import {
  addUser,
  viewUserOne,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  otpResend,
  otpVerify,
  changePassword,
  forgotPassword,
} from '../controllers/user/user.controller';
import {
  userRegisterValidation,
  userUpdateValidation,
  loginValidation,
} from '../controllers/user/user.validator';
import {
  verifyTokenAuth,
} from '../middlewares/verifyAuthToken';
import {
  userRole,
} from '../middlewares/checkRole';

const router = express.Router();

// user add, update, view own profile, delete routes
router.post('/users', userRegisterValidation, addUser);
router.get('/users/:userId', verifyTokenAuth, userRole, viewUserOne);
router.delete('/users/:userId', verifyTokenAuth, userRole, deleteUser);
router.put('/users/:userId', verifyTokenAuth, userRole, userUpdateValidation, updateUser);

// login and logout route for user
router.post('/login', loginValidation, loginUser);
router.post('/logout', verifyTokenAuth, logoutUser);

// resend and verified otp route
router.post('/resend', otpResend);
router.post('/verify', otpVerify);

// change and forgot password route
router.post('/changepassword', verifyTokenAuth, changePassword);
router.post('/forgotpassword', forgotPassword);

module.exports = router;
