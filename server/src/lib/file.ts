import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

export const imageFileFilter = (_req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};

export const editFileName = (req, file, callback) => {
    const fileExtName = extname(file.originalname);
    const timeStamp = Date.now();
    const newId = uuidv4();
    callback(null, `${timeStamp}-${newId}${fileExtName}`);
};
