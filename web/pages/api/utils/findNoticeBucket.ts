import { Storage } from "@google-cloud/storage";

export default function findNoticeBucket() {
  const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    credentials: {
      client_email: process.env.CLIENT_EMAIL,
      private_key: process.env.PRIVATE_KEY,
    },
  });

  const bucket = storage.bucket(process.env.NOTICE_BUCKET_NAME!);
  return bucket;
}
