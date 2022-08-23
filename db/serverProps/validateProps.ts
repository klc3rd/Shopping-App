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

  if (session) {
    if (session.user.verified !== true) {
      return {
        redirect: {
          destination: "/verify/send",
        },
      };
    }
  } else {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }

  console.log(url);

  return {
    props: {
      url,
      session: session,
    },
  };
};

export default getServerSideProps;
