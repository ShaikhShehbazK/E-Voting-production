// backend/cloudinaryConfig.js
const cloudinary = require('cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: 'duqomeh93',
  api_key: '615866477781872',
  api_secret: 'CGNHUv7B01E3sZ9WlQxyYtoL5rE',
});

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
