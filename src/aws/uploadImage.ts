import { s3Params } from './s3Params';
import { s3Client } from './s3Client';

/**
 * Uploads an image to S3
 */
export const uploadImage = async (image: string): Promise<string> => {
  const { params, id } = s3Params(image);
  try {
    await s3Client.send(params);
    return process.env.AWS_S3_BUCKET_URL + '/' + id;
  } catch (error) {
    throw new Error("Couldn't upload image to S3 " + error);
  }
};
