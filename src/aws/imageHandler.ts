import { s3Params } from './s3Params';
import { s3Client } from './s3Client';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';

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

/**
 * Deletes an image from S3
 */
export const deleteImage = async (id: string) => {
  try {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME as string,
        Key: id
      })
    );
  } catch (error) {
    throw new Error("Couldn't delete image from S3 " + error);
  }
};
