import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import multer from "multer";
import findNoticeBucket from "../utils/findNoticeBucket";

const uploadImage = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // No larger than 5mb, change as you need
  },
});

const bucket = findNoticeBucket();

const app = nextConnect({
  onError(error, req: NextApiRequest, res: NextApiResponse) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

app.post(uploadImage.single("file"), async (req: any, res: NextApiResponse) => {
  try {
    if (req.file) {
      const email = req.body.email;
      const newFileName =
        email +
        "_" +
        Date.now() +
        "_" +
        encodeURIComponent(req.file.originalname);

      const blob = bucket.file(newFileName);
      const blobStream = blob.createWriteStream();

      blobStream.on("finish", () => {
        res.status(200).send(newFileName);
        console.log("Success");
      });
      blobStream.end(req.file.buffer);
    } else throw "error with img";
  } catch (error) {
    res.status(500).send(error);
  }
});

export default app;

export const config = {
  api: {
    bodyParser: false,
  },
};
