import multer from "multer";
import { Storage } from "@google-cloud/storage";

export default function findBoardBucket() {
  //   try {
  const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    credentials: {
      client_email: process.env.CLIENT_EMAIL,
      private_key: process.env.PRIVATE_KEY,
    },
  });

  const bucket = storage.bucket(process.env.BOARD_BUCKET_NAME!);
  return bucket;
  //   } catch (error) {
  //     return error;
  //   }
}
