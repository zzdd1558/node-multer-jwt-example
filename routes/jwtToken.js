const express = require('express');
const jwt = require('jsonwebtoken');
const {OK} = require("../utils/HttpStatusCode");
const {verifyToken , sign} = require('./middlewares');

const router = express.Router();

/* GET users listing. */
router.get('/', verifyToken ,  function(req, res, next) {
  res.json(req.decoded);
});

router.post('/', (req, res, next) => {

  // ...
  // id , password DB에서 조회해서 사용자 정보를 가져오는 부분을 패스한것입니다.

  const token = sign(req.body);
  res.status(OK.CODE).json({...OK , token});
});



module.exports = router;
