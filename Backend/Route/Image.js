const express = require('express');
const router = express.Router();
const path = require('path');

const multer = require('multer');

// router.use(express.static(__dirname+"Public/"));

var Storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'Frontend/public/assets/')
  }, 
  filename: function(req, file, cb){
    //   console.log(file)
    cb(null,file.originalname);
 }
})

var upload = multer({
    storage: Storage
})


const imageController = require('../Controller/Imagecontroller');

router.get('/',imageController.index);
router.post('/addImage',upload.single('file'),imageController.addNewImage);
router.post('/updateImage',imageController.updateImageData);
router.post('/deleteImage',imageController.deleteImage);


module.exports = router;