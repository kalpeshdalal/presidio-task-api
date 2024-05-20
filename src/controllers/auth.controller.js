

const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const moment = require('moment');
const { authService, userService, tokenService } = require('../services');
const { sendResponse } = require('../utils/responseHandler');



const singup = catchAsync(async (req, res) => {

  try {
    const { email, password, firstName, lastName, phone, role } = req.body;
    let userObj = {
      email,
      password,
      firstName,
      lastName,
      phone,
      role,
    };
    
    const user = await authService.singup(userObj);
    if(user.code == 200){

    const tokens = await tokenService.generateAuthTokens(user.data);
    res.status(httpStatus.CREATED).send({ user, tokens });
}
   sendResponse(res,httpStatus.BAD_REQUEST,user,null)
  } catch (error) {
  sendResponse(res,httpStatus.BAD_REQUEST,error.message,null)
  }

});






const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

    const user = await authService.loginUserWithEmailAndPassword(email, password);
    if(user && !user.user){
      sendResponse(res, httpStatus.FORBIDDEN, null,user.msg);
      return;
    }
    const tokens = await tokenService.generateAuthTokens(user.user);
    sendResponse(res, httpStatus.OK, { user:user.user, tokens }, null);
});



const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

module.exports = {
  login,
  logout,
  refreshTokens,
  singup,
};
