import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../db/prisma";
import mailer from "../../../utils/mailer";

import { v4 as uuid } from "uuid";

const ResetPassword = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const email = req.body.email;
      const resetVal = uuid();

      if (!email) {
        throw new Error("Must specify an email");
      }

      // update resetVal with new UUID
      await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          resetVal,
        },
      });

      mailer(email, resetVal, true);

      res.status(200).json({ message: "Reset email sent" });
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ message: err.message });
      }
    }
  }
};

export default ResetPassword;
