const Image = require('../Model/Image');
const asyncHandler = require('express-async-handler');
const fs = require('fs');


const index = (req, res, next) => {
       Image.find()
       .then(response => {
           res.json({
               response
           })
       })
       .catch(error => {
           res.json({
               message : error
           })
       })
}



const addNewImage = asyncHandler(async (req,res) =>{
     const {username , buttonText, buttonSubText, link} = req.body;
     var imageFile = req.file.filename;
     
    if(!username || !buttonText || !buttonSubText || !link ){
        res.status(400);
        throw new Error("Please Enter all the Fields");
    }
  
        const newImage = await Image.create({
            username:username,
            buttonText:buttonText,
            buttonSubText:buttonSubText,
            link:link,
            image: imageFile
        });

    if(newImage){
        res.status(201).json({
            _id:newImage._id,
            username:newImage.username,
            buttonText:newImage.buttonText,
            buttonSubText:newImage.buttonSubText,
            link:newImage.link,
            image:newImage.image,
        })
    }else{
        res.status(400);
        throw new Error("Failed to upload the image");
    }
})


const updateImageData = asyncHandler(async (req,res) =>{
    const {username, buttonText, buttonSubText, link, image} = req.body;
    let imageId = req.body.image_id;

    if(!imageId){
        console.log("Invalid data passed into request");
        return res.sendStatus(400)
    }
   
    const updateImage = {
        username:username,
        buttonText:buttonText,
        buttonSubText:buttonSubText,
        link:link,
        image:image
    }

     await  Image.findByIdAndUpdate(imageId, {$set:updateImage})

    if(updateImage){
        res.status(201).json({
            _id:updateImage._id,
            username:updateImage.username,
            buttonText:updateImage.buttonText,
            buttonSubText:updateImage.buttonSubText,
            link:updateImage.link,
            image:updateImage.image,
        })
    }else{
        res.status(400);
        throw new Error("Failed to upload the image");
    }
})





const deleteImage = (req, res, next) => {
     let imageId = req.body.image_id;

     Image.findByIdAndRemove(imageId)
     .then(() => {
          req.json({
              message: "Image deleted Successfully"
          }) 
     })
     .catch(error => {
         req.json({
             message:"An error Occured!"
         })
     }) 
}


module.exports = {
       index,
       addNewImage,
       updateImageData,
       deleteImage
}