import multer from "multer";
import nextConnect from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/upload/temporary");
  },
  filename: (req, file, cb) => {
    let email = req.body.email;
    console.log(email);
    const newFileName = email + "_" + Date.now() + "_" + file.originalname;
    cb(null, newFileName);
  },
});

const uploadImage = multer({ storage: storage });

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

app.post(
  uploadImage.array("file", 5),
  async (req: any, res: NextApiResponse) => {
    const urlArr: { [k: number]: string } = {};
    for (var i = 0; i < req.files.length; i++) {
      urlArr[i] = `/upload/temporary/${req.files[i].filename}`;
    }
    res.json(urlArr);
  }
);

export default app;

export const config = {
  api: {
    bodyParser: false,
  },
};
