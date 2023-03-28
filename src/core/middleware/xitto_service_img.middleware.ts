import { diskStorage } from 'multer';
import { extname } from 'path';

export const xittoServiceImageMiddleware = {
    storage: diskStorage({
        destination: './uploads/xittoo-services',
        filename(req, file, callback) {
            const randomName = Array(32).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
            callback(null, `${randomName}${extname(file.originalname)}`);
        },
    })
}