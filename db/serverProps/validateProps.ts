/**
 * This is the getServerSideProps function that ensures a user is
 * signed in and verified
 */
import { unstable_getServerSession } from "next-auth/next";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

const getServerSideProps = async (context: {
  req: NextApiRequest;
  res: NextApiResponse;
}) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  const url = context.req.url;

  if (!session || (session && session.user.verified === false)) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }

  return {
    props: {
      url,
      session: session,
    },
  };
};

export default getServerSideProps;
