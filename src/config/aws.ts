import AWS from "aws-sdk";
import { develop } from "./key";

export const s3 = new AWS.S3({
  credentials: {
    accessKeyId: develop.AWS_ACCESS_ID ?? "",
    secretAccessKey: develop.AWS_SECRET_KEY ?? "",
  },
  region: "ap-south-1",
});
