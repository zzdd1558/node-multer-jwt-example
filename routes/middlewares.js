const jwt = require('jsonwebtoken');
const {UNAUTHORIZED , EXPIRED_JWT_TOKEN} = require("../utils/HttpStatusCode");

exports.verifyToken = (req , res , next) => {

  try {
    req.decoded = jwt.verify(req.headers.authorization , process.env.JWT_SECRET_KEY);
    return next();

  }catch ({name}) {

    if (name === 'TokenExpiredError') {
      return res.status(EXPIRED_JWT_TOKEN.CODE).json(EXPIRED_JWT_TOKEN)
    }

    return res.status(UNAUTHORIZED.CODE).json(UNAUTHORIZED);
  }
};


exports.sign = ({id , name}) => {

  return jwt.sign({
    id  , name
  } , process.env.JWT_SECRET_KEY , {
    expiresIn: process.env.JWT_EXPIRES_SECOND,
    issuer:"Yunjin Choi"
  });
};
