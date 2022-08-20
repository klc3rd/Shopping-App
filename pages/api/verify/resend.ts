import { NextApiResponse, NextApiRequest } from "next";
import { v4 as uuid } from "uuid";
import { PrismaClient } from "@prisma/client";
import mailer from "../../../utils/mailer";

const ResendVerification = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "POST") {
    const prisma = new PrismaClient();

    const email = req.body.email;
    const newVerificationCode = uuid();

    if (email == "") {
      throw new Error("Must specify a valid email");
    }

    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        verifyVal: newVerificationCode,
      },
    });

    mailer(email, newVerificationCode);

    res.status(200).json({ message: "Verification code resent" });

    try {
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ message: err.message });
      }
    }
  }
};

export default ResendVerification;
