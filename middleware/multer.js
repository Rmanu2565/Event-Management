import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createUploadsDir = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const userId = req.user?.id || '';
        const uploadPath = path.join(__dirname, './../assets', userId);

        createUploadsDir(uploadPath);
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // Clean filename and add timestamp
        const originalName = path.parse(file.originalname).name;
        const cleanName = originalName.replace(/[^a-zA-Z0-9]/g, '_');
        const extension = path.extname(file.originalname);
        const timestamp = Date.now();

        cb(null, `${cleanName}_${timestamp}${extension}`);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    },
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'text/plain',
            'application/rtf',
            'image/png',
            'image/jpeg',
            'image/jpg',
            'image/gif',
            'image/bmp',
            'image/webp',
            'image/svg+xml',
        ];

        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only document files are allowed'), false);
        }
    }
});

export default upload;