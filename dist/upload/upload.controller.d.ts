import { Response } from 'express';
export declare class UploadController {
    uploadFile(file: Express.Multer.File): {
        url: string;
    };
    downloadFile(filename: string, res: Response): Promise<void>;
}
