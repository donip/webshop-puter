const express = require('express');

const productRouter = express.Router();
const productController = require('../controller/product.controller');
const multer = require('multer');


// Multer
// ***** file upload parsing *****
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads');
  },
  filename(req, file, cb) {
    const fullFileName = `${new Date().toISOString().replace(/:/g, '-')}.jpg`;
    cb(null, fullFileName);
  },
});
// ***** IMG file extension validation *****
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
// ***** IMG max upload limit 2Mb *****
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});

// multer end

function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.json({ error: 'Be kell jelentkezned' });
  }
}

productRouter.route('/')
  .get(productController.list)
  .post(loggedIn, upload.single('uploadimg'), productController.create);

productRouter.route('/:id')
  .get(productController.find)
  .put(loggedIn, upload.single('uploadimg'), productController.update)
  .patch(loggedIn, upload.single('uploadimg'), productController.update)
  .delete(loggedIn, productController.remove);

productRouter.route('/url/:producturl').get(productController.findByUrl);

module.exports = productRouter;
