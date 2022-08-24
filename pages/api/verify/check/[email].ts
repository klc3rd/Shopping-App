import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../db/prisma";

const CheckVerificationStatus = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "GET") {
    try {
      const email = req.query.email as string;
      const user = await prisma.user.findUnique({ where: { email: email } });

      if (user) {
        if (user.verified === true) {
          res.status(200).json({ verified: true });
        } else {
          res.status(200).json({ verified: false });
        }
      } else {
        throw new Error("User not found");
      }
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ message: err.message });
      }
    }
  }
};

export default CheckVerificationStatus;
