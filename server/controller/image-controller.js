import mongoose from 'mongoose';
import { Readable } from 'stream';

const url = 'http://localhost:8000/api';
let gridfsBucket;

mongoose.connection.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: 'photos'
    });
});

// ✅ Upload Image Controller
export const uploadImage = (request, response) => {
    if (!request.file) {
        return response.status(404).json({ msg: "File not found" });
    }

    const filename = `${Date.now()}-blog-${request.file.originalname}`;

    // Convert buffer to readable stream
    const readableStream = new Readable();
    readableStream.push(request.file.buffer);
    readableStream.push(null);

    const uploadStream = gridfsBucket.openUploadStream(filename, {
        contentType: request.file.mimetype
    });

    readableStream.pipe(uploadStream);

    uploadStream.on('finish', () => {
        const imageUrl = `${url}/file/${filename}`;
        return response.status(200).json(imageUrl);
    });

    uploadStream.on('error', (error) => {
        console.error('Upload error:', error);
        return response.status(500).json({ msg: "Upload failed" });
    });
};

// ✅ Get Image Controller
export const getImage = async (request, response) => {
    try {
        const files = await gridfsBucket
            .find({ filename: request.params.filename })
            .toArray();

        if (!files || files.length === 0) {
            return response.status(404).json({ msg: "File not found" });
        }

        const readStream = gridfsBucket.openDownloadStream(files[0]._id);
        readStream.pipe(response);

    } catch (error) {
        console.error('getImage error:', error);
        return response.status(500).json({ msg: "Error retrieving image" });
    }
};