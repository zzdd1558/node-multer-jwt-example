const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');


fs.readdir(process.env.UPLOAD_FILE_PATH , (error) => {
  if(error) {
    console.log("폴더가 존재하지 않습니다.");
    fs.mkdirSync(process.env.UPLOAD_FILE_PATH);
  }
});

const upload = multer({
  storage : multer.diskStorage({

    destination(req , file , cb) {
      cb(null , `${process.env.UPLOAD_FILE_PATH}/`)
    },

    filename(req , file , cb ){
      // 업로드된 파일의 확장자만 떄내기 위해서 사용
      // yunjin.jpeg
      // ext = .jpeg
      const ext = path.extname(file.originalname);

      // yunjin223147891347981273498.jpeg
      cb(null , `${path.basename(file.originalname , ext)}_${new Date().valueOf()}${ext}`);
    }
  }),

  // 5MB
  limits : {fileSize :  process.env.UPLOAD_FILE_SIZE}
});

/**
 *
 * single : 하나의 이미지를 업로드 할 때 사용 .
 * array  : 하나의 key값으로 여러개의 이미지를 업로드 할 때 사용 .
 * fields : 여러개의 key값으로 이미지를 업로드 할 때 사용.
 * none   : 업로드할 이미지는 없지만 , 데이터를 Multipart형식으로 전달하고싶을때 사용합니다.
 *
 * */

router.post('/' , upload.single("img")  ,(req , res) => {

  res.json({url : `${process.env.UPLOAD_FILE_PATH}/${req.file.filename}`});
});

router.post('/array' , upload.array("img")  ,(req , res) => {

  const uploadFileName = req.files.map(v => v.filename);

  res.json({url : uploadFileName});
  // res.json({url : "uploads/" + req.file.filename});
});

router.post('/fields' , upload.fields([{name:"img"} , {name:"img2"}])  ,(req , res) => {

  const {img , img2} = req.files;
  res.json({url : "abc"});
});

router.post('/none' , upload.none()  ,(req , res) => {

  const {hello , world} = req.body;
  res.json({url : `${hello} , ${world}`});
});

/**
 *  1. 서버는 응답하는것이 핵심이기때문에 수락하든 거절하든 무조건 응답해야합니다.
 *  2. nodemon 사용하십시오.
 *  3. dotenv .env 키관리하거나 설정파일같은경우 .env
 * */


module.exports = router;
