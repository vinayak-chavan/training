import { createHash } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import multer from 'multer';
import AWS from 'aws-sdk';
import path from 'path';
import Jimp from 'jimp';

export const successResponse = (req, res, data, code = 200) => res.send({
  code,
  data,
  success: true,
});

export const errorResponse = (
  req,
  res,
  data,
  code = 500,
) => res.status(code).json({
  code,
  data,
  success: false,
});

export const encryptPassword = (password) => {
  const encryptedPassword = createHash('md5').update(password).digest('hex');
  return encryptedPassword;
};

const dest = path.join(__dirname, '..', '..', 'public', 'storage');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const id = uuidv4();
    const uniqueSuffix = `${id}`;
    cb(null, uniqueSuffix);
  },
});
export const upload = multer({ storage });

const storageUpdate = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${req.params.categoryId}`;
    cb(null, uniqueSuffix);
  },
});
export const uploadUpdateImage = multer({ storage: storageUpdate });

const storageUpdateProduct = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${req.params.productId}`;
    cb(null, uniqueSuffix);
  },
});
export const uploadUpdateImagePro = multer({ storage: storageUpdateProduct });

// eslint-disable-next-line no-shadow
export const deleteFile = async (path) => {
  try {
    await fs.promises.unlink(path);
    return 'file not deleted';
  } catch (error) {
    return 'file deleted successfully';
  }
};

// compress file with Jimp and upload to s3
const compress = async (filePath) => {
  try {
    // console.log(filePath);
    const image = await Jimp.read(filePath);
    image.resize(400, Jimp.AUTO);
    image.quality(60);
    await image.writeAsync(`${filePath}.jpg`);
    return image;
  } catch (error) {
    return error;
  }
};

export const cloudUpload = async (file) => {
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS,
  });
  const { filename, path: filePath } = file;
  try {
    await compress(filePath);
  } catch (error) {
    throw new Error('File compression Error! \n', error);
  }
  // read compressed file from storage.
  let image;
  try {
    image = await fs.promises.readFile(`${filePath}.jpg`);
  } catch (error) {
    throw new Error('File read Error! \n', error);
  }

  s3.upload(
    {
      Bucket: process.env.AWS_S3_BUCKET,
      ACL: 'public-read',
      Key: `${filename}.${file.mimetype.split('/')[1]}`,
      Body: image,
    },
    (err, data) => {
      if (err) {
        // console.log(err);
        deleteFile(`${filePath}.jpg`);
        return err;
      }
      // console.log(data);
      deleteFile(file.path);
      deleteFile(`${filePath}.jpg`);
      return data;
    },
  );
};
