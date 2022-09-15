import { unstable_getServerSession } from "next-auth/next";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { getCartItems } from "../cart";
import prisma from "../prisma";

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

  // Get cart items
  const cart = await getCartItems(parseInt(session.user.id), { prisma });

  return {
    props: {
      url,
      user: session.user,
      cart,
    },
  };
};

export default getServerSideProps;
