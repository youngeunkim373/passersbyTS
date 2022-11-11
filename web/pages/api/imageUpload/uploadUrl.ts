import { Storage } from "@google-cloud/storage";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bucketName = req.query.bucket;

  const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    credentials: {
      client_email: process.env.CLIENT_EMAIL,
      private_key: process.env.PRIVATE_KEY,
    },
  });

  let bucket;
  if (bucketName === "profileImage") {
    bucket = storage.bucket(process.env.PROFILE_BUCKET_NAME!);
  } else if (bucketName === "board") {
    bucket = storage.bucket(process.env.BOARD_BUCKET_NAME!);
  } else {
    throw new Error("Can't find bucket!");
  }

  const file = bucket.file(req.query.file as string);
  const options = {
    expires: Date.now() + 1 * 60 * 1000, //  1 minute,
    fields: { "x-goog-meta-test": "data" },
  };

  const [response] = await file.generateSignedPostPolicyV4(options);
  res.status(200).json(response);
}
