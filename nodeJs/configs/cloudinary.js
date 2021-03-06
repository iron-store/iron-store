const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: 'ddibftjux',
    api_key: '615143174846895',
    api_secret: '-h0PLS8txRaVGzRs3ICORuQwLKY'
});

var myStorage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'ironStoreImages',
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    // console.log("HIIIIIII"),
    // console.log("HIIIIIII: ", file),
    cb(null, 'my-file-name');
  }
});


const uploadCloud = multer({ storage: myStorage });
module.exports = uploadCloud;
