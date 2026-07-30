import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuid } from "uuid";

const uploadPath = "uploads/documents";

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({

    destination(req, file, cb) {
        cb(null, uploadPath);
    },

    filename(req, file, cb) {

        const extension = path.extname(file.originalname);

        cb(
            null,
            `${uuid()}${extension}`
        );

    }

});

const fileFilter = (req, file, cb) => {

    const allowed = [
        "application/pdf",

        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

        "text/plain"
    ];

    if (!allowed.includes(file.mimetype)) {

        return cb(
            new Error("Only PDF, DOCX and TXT files are allowed.")
        );

    }

    cb(null, true);

};

const upload = multer({

    storage,

    fileFilter,

    limits: {
        fileSize: 20 * 1024 * 1024
    }

});

export default upload;