import { NextApiResponse, NextApiRequest } from "next";
import { validatePasswordResetValue } from "../../../db/users";
import { PrismaClient } from "@prisma/client";
import ChangePassword from "../../../components/page/login/change-password";

interface IResetPasswordPage {
  valid: boolean;
  code: string;
}

const ResetPasswordPage: React.FC<IResetPasswordPage> = (props) => {
  const { valid, code } = props;

  return (
    <div>
      {!valid && (
        <div className="reset-invalid">
          This link is either invalid or expired.
        </div>
      )}
      {valid && <ChangePassword code={code} />}
    </div>
  );
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
      code,
    },
  };
}

ResetPasswordPage.displayName = "ResetPasswordPage";
export default ResetPasswordPage;
