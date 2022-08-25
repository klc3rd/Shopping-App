import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuid } from "uuid";
import nextConnect from "next-connect";
import multer from "multer";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../db/prisma";

let date = new Date();
let dateString =
  date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
let returnFilename: string;

const upload = multer({
  storage: multer.diskStorage({
    destination: `./public/uploads/${dateString}`,
    filename: (req, file, cb) => {
      returnFilename = Date.now() + "-" + uuid() + "-" + file.originalname;
      cb(null, returnFilename);
    },
  }),
});

const imageUpload = nextConnect({
  onError: (error, req, res: NextApiResponse) => {
    res.status(501).json({ error: error.message });
  },
  onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
    res.status(400).json({ error: "Upload not allowed" });
  },
});

const secureMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    res.status(400).json({ error: "You must be signed in" });
    return;
  }
  next();
};

imageUpload.use(secureMiddleware);
imageUpload.use(upload.single("image"));

imageUpload.post(async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ folder: dateString, filename: returnFilename });
});

export default imageUpload;

export const config = {
  api: {
    bodyParser: false,
  },
};
