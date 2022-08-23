import { NextApiResponse, NextApiRequest } from "next";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const ChangePassword = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const prisma = new PrismaClient();

      const code = req.body.code;
      const password = req.body.password;

      if (!code || !password) {
        throw new Error("New password and reset code must be provided");
      }

      const newPasswordHash = await bcrypt.hash(password, 10);

      await prisma.user.update({
        where: {
          resetVal: code,
        },
        data: {
          password: newPasswordHash,
          resetVal: "",
        },
      });

      res.status(200).json({ message: "Password updated successfully" });
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ message: err.message });
      }
    }
  }
};

export default ChangePassword;
