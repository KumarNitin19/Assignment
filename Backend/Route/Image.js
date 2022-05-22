const express = require('express');
const router = express.Router();
const multer = require('multer');



var Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Frontend/public/assets/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
  
var upload = multer({ storage: Storage });



const imageController = require('../Controller/Imagecontroller');

router.get('/get',imageController.index);
router.post('/addImage', upload.single('image'),imageController.addNewImage);
router.post('/updateImage', upload.single('image'),imageController.updateImageData);
router.post('/deleteImage',imageController.deleteImage);


module.exports = router;