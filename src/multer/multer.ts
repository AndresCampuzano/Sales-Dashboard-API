import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';

// Multer configuration
const storage = multer.memoryStorage();

// File filter for multer
const fileFilter = (
  _request: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
): void => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/webp'
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

/**
 * Returns the multer middleware
 */
export const multerUpload = multer({ storage, fileFilter });
