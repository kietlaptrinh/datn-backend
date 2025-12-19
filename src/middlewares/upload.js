import multer from "multer";
import path from "path";
import "dotenv/config";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, process.env.UPLOAD_DIR || "uploads"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_")),
});

export const upload = multer({
  storage,
  fileFilter: (_, file, cb) => {
    const ok = /jpe?g|png|webp/.test(path.extname(file.originalname).toLowerCase());
    cb(ok ? null : new Error("Invalid image type"), ok);
  },
});
