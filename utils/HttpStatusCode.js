const HttpStatusCode = {
  "OK" : {
    CODE : 200,
    MESSAGE : "정상적으로 토큰이 발급되었습니다."
  } ,

  "UNAUTHORIZED" : {
    CODE : 401,
    MESSAGE : "해당 토큰은 유효하지 않습니다."
  },

  "EXPIRED_JWT_TOKEN" : {
    CODE:419 ,
    MESSAGE : "토큰이 만료되었습니다."
  }
};

module.exports = HttpStatusCode;
