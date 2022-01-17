import express, { Request, Response } from 'express'
import FileController from './resolver';
import File from '../../models/file';

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, 'src/uploads/')
  },
  filename: function (req: any, file: any, cb: any) {
    console.log({ file })
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const path: string = `${uniqueSuffix}-${file.originalname}`;

    // create file
    File
      .create({ name: file.originalname, path:`/uploads/${path}` })
      .then((data: any) => {
        console.log({ data })
      })

    cb(null, path)
  }
})

const uploadMiddleware = multer({storage}).single('image');
const router = express.Router();
const resolver = new FileController();

router.post('/upload', uploadMiddleware, resolver.uploadFile);
router.get('/all', resolver.getAllFiles);
router.delete('/delete/:id', resolver.deleteFile)

export default router;