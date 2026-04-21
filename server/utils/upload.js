import {GridFsStorage} from 'multer-gridfs-storage';
import dotenv from 'dotenv';
import multer from 'multer';
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

dotenv.config();

const storage = new GridFsStorage({

     url :  `mongodb+srv://${username}:${password}@blog-app.v0gtbds.mongodb.net/?appName=blog-app`,
     options: {useNewUrlParser:true},
     file: (request, file) => {
        const match = ["image/png", "image/jpg"];

        if(match.indexOf(file.mimetype) === -1){
            return `${Date.now()}-blog-${file.originalname}`;
        }
        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
     }
})

export default multer({storage});