import AWS from "aws-sdk";
import axios from "axios";

export interface SignS3 {
  filename: string;
  filetype: string;
}

const signS3Upload = async ({ filename, filetype }: SignS3) => {
  try {
    const s3 = new AWS.S3({
      signatureVersion: "v4",
      region: "us-east-2",
      accessKeyId: process.env.APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.APP_AWS_SECRET_ACCESS_KEY,
    });

    const s3Parms = {
      Bucket: process.env.APP_S3_BUCKET,
      Key: filename,
      Expires: 60,
      ContentType: filetype,
      ACL: "public-read",
    };

    const signedRequest = await s3.getSignedUrl("putObject", s3Parms);
    const url = `https://${process.env.APP_S3_BUCKET}.s3.amazonaws.com/${filename}`;

    return {
      signedRequest,
      url,
    };
  } catch (error: unknown) {
    console.error("AWS ERR: ", error);
    return null;
  }
};
export default signS3Upload;

export const uploadToS3 = async (file: File, signedRequest: string) => {
  var options = {
    headers: {
      "Content-Type": file.type,
    },
  };
  return await axios.put(signedRequest, file, options);
};
