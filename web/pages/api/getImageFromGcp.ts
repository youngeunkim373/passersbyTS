import type { NextApiRequest, NextApiResponse } from "next";
// import nextConnect from "next-connect";
import findBoardBucket from "./utils/findBoardBucket";

// export default async function getImageFromGcp() {
//   const bucket = findBoardBucket();

//   const app = nextConnect({
//     onError(error, req: NextApiRequest, res: NextApiResponse) {
//       res
//         .status(501)
//         .json({ error: `Sorry something Happened! ${error.message}` });
//     },
//     onNoMatch(req, res) {
//       res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
//     },
//   });

//   app.get(async (req: any, res: NextApiResponse) => {
//     const [files] = await bucket.getFiles();
//     console.log([files]);

//     //   res.status(200).send([files]);
//     //   console.log(
//     //     `${newFileName} with contents ${req.file.originalname} uploaded.`
//     //   );
//   });
// }

export default async function getImageFromGcp(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.query.method;

  switch (method) {
    case "GET":
    case "get":
      try {
        const bucket = findBoardBucket();
        const [files] = await bucket.getFiles();

        res.status(200).json([files]);
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error while fetching image" });
      }
      break;
    default:
      res.status(500).json({ error: "Please check the method again!" });
      break;
  }
}
