import { PutObjectCommand } from '@aws-sdk/client-s3';
import { ObjectId } from 'mongodb';

interface S3Params {
  params: PutObjectCommand;
  id: string;
}

/**
 * Returns the parameters to upload an image to S3
 */
export const s3Params = (base64: string): S3Params => {
  const base64Data = Buffer.from(
    base64.replace(/^data:image\/\w+;base64,/, ''),
    'base64'
  );
  // Getting the file type, ie: jpeg, png or gif
  const type = base64.split(';')[0].split('/')[1];
  const id = new ObjectId();
  const params = new PutObjectCommand({
    GrantRead: 'uri=http://acs.amazonaws.com/groups/global/AllUsers', // This is necessary to make the image public
    Bucket: process.env.AWS_S3_BUCKET_NAME as string, // bucket that we made earlier
    Key: id.toString(), // Name of the image
    Body: base64Data, // Body which will contain the image in buffer format
    ContentEncoding: 'base64',
    ContentType: `image/${type}` // Necessary to define the image content-type to view the photo in the browser with the link
  });
  return {
    params,
    id: id.toString()
  };
};
