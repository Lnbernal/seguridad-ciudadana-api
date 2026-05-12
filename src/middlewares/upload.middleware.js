const multer = require('multer');

const path = require('path');

/*
|--------------------------------------------------------------------------
| STORAGE
|--------------------------------------------------------------------------
*/

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, 'uploads/');

    },

    filename: (req, file, cb) => {

        const uniqueName = Date.now() + path.extname(file.originalname);

        cb(null, uniqueName);

    }

});

/*
|--------------------------------------------------------------------------
| FILTRO
|--------------------------------------------------------------------------
*/

const fileFilter = (req, file, cb) => {

    const allowedTypes = /jpg|jpeg|png|webp/;

    const extname = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {

        return cb(null, true);

    }

    cb(new Error('Solo imágenes permitidas'));

};

/*
|--------------------------------------------------------------------------
| MULTER
|--------------------------------------------------------------------------
*/

const upload = multer({

    storage,
    fileFilter,

    limits: {
        fileSize: 5 * 1024 * 1024
    }

});

module.exports = upload;