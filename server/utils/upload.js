import multer from 'multer';

// Use memory storage instead of GridFS storage
const storage = multer.memoryStorage();

const upload = multer({
    storage,
    fileFilter: (request, file, cb) => {
        const match = ['image/png', 'image/jpg', 'image/jpeg'];
        if (match.indexOf(file.mimetype) === -1) {
            return cb(null, false); // reject file
        }
        cb(null, true);
    }
});

export default upload;