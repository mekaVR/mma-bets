import { diskStorage } from 'multer';
import { extname } from 'path';

export const storage = {
  storage: diskStorage({
    destination: 'src/uploads',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      callback(
        null,
        file.fieldname + '-' + uniqueSuffix + extname(file.originalname),
      );
    },
  }),
};
