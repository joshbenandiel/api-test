import { Request, Response } from "express";
import BaseController from "../base";
import File from '../../models/file';
import fs from 'fs';
import { multerConfig, uploadMiddleware } from ".";
const multer = require('multer');

class FileController extends BaseController {
  /**
   *
   */
  constructor() {
    super();
    
  }

  getAllFiles = async (req: Request, res: Response) => {
    try {
      const search: any = req.query['search'] || '';
      const files = await File.find(
        (Object.assign({}, 
          search.trim() !== '' 
            ? { name: new RegExp(search, 'i') }
            : {}  
        )
      ));

      this.ok(res, files)

      
    } catch (error) {
      this.failed(res, error)
    }
  }

  uploadFile = async (req: any, res: Response) => {
    try {
      return this.ok(res, { 
        msg: 'image uploaded',
        fileInfo: req.file,
        path: `/uploads/${req.file.filename}`
      });
      
    } catch (error) {
      this.failed(res, error)
    }
  }

  deleteFile = async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      const file = await File.deleteOne({ _id: id });

      // fs.unlink()

      this.ok(res, file)
      
    } catch (error) {
      
    }
  }

}

export default FileController;