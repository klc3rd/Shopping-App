import { NextApiResponse, NextApiRequest } from "next";
import { validatePasswordResetValue } from "../../../db/users";
import { PrismaClient } from "@prisma/client";

interface IResetPasswordPage {
  valid: boolean;
}

const ResetPasswordPage: React.FC<IResetPasswordPage> = (props) => {
  const { valid } = props;

  return <div></div>;
};

export async function getServerSideProps(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
  const code = req.query.code as string;

  const result = await validatePasswordResetValue(code, { prisma });

  return {
    props: {
      valid: result,
    },
  };
}

ResetPasswordPage.displayName = "ResetPasswordPage";
export default ResetPasswordPage;
