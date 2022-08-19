import { useRouter } from "next/router";

const VerifyUser = () => {
  const router = useRouter();
  const { code } = router.query;

  return <div>{code}</div>;
};

export default VerifyUser;
