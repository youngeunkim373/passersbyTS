import { Storage } from "@google-cloud/storage";

export default function findProfileBucket() {
  const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    credentials: {
      client_email: process.env.CLIENT_EMAIL,
      private_key: process.env.PRIVATE_KEY,
    },
  });

  const bucket = storage.bucket(process.env.PROFILE_BUCKET_NAME!);
  return bucket;
}
