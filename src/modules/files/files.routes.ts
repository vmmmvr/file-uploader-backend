import { Router } from 'express';
import { validate } from '../../middlewares/validate.middleware'; // Adjust path as per your structure
import { authMiddleware } from '../../middlewares/auth.middleware';
import { FileControler } from './file.controller';
import fileUploadSchema from './file.schema';
import { upload } from '../../middlewares/file-uploader.middleware';

const router = Router();

// 
router.post('/files', authMiddleware, upload.single('file') , validate(fileUploadSchema), FileControler.uploadFile);

// 
router.get('/files/view/:filename', FileControler.viewFile);
router.get('/files', authMiddleware,FileControler.getFiles);
router.get('/files/:filename', authMiddleware,FileControler.getFile);

export default router;
