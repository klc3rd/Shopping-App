import { unstable_getServerSession } from "next-auth/next";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

const getServerSideProps = async (context: {
  req: NextApiRequest;
  res: NextApiResponse;
}) => {
  return {
    props: {
      session: await unstable_getServerSession(
        context.req,
        context.res,
        authOptions
      ),
    },
  };
};

export default getServerSideProps;
