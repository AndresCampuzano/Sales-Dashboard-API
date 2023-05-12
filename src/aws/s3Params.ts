import { PutObjectCommand } from '@aws-sdk/client-s3';
import { ObjectId } from 'mongodb';

interface S3Params {
  params: PutObjectCommand;
  id: string;
}

/**
 * Returns the parameters to upload an image to S3
 */
export const s3Params = (req: Express.Multer.File): S3Params => {
  const id = new ObjectId();
  const params = new PutObjectCommand({
    GrantRead: 'uri=http://acs.amazonaws.com/groups/global/AllUsers', // This is necessary to make the image public
    Bucket: process.env.AWS_S3_BUCKET_NAME as string, // bucket that we made earlier
    Key: id.toString(), // Name of the image
    Body: req?.buffer, // Body which will contain the image in buffer format
    ContentType: req?.mimetype // Necessary to define the image content-type to view the photo in the browser with the link
  });
  return {
    params,
    id: id.toString()
  };
};
