import { NextApiResponse, NextApiRequest } from "next";
import prisma from "../../../db/prisma";

const VerifyCode = async (req: NextApiRequest, res: NextApiResponse) => {
  const code = req.query.code as string;

  try {
    if (!code) {
      throw new Error("Must specify code");
    }

    await prisma.user.update({
      where: {
        verifyVal: code,
      },
      data: {
        verified: true,
      },
    });

    res.status(200).json({ message: "Account verified." });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    }
  }
};

export default VerifyCode;
