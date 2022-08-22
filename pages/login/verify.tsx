import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const VerifyPage: React.FC = () => {
  const redirect = localStorage.getItem("redirect") as string;
  const router = useRouter();
  const { data: session } = useSession();

  if (!session || session!.user.verified !== true) {
    router.replace("/verify/send");
  } else {
    router.replace(redirect);
  }

  return <div className="redirect">Redirecting...</div>;
};

VerifyPage.displayName = "VerifyPage";
export default VerifyPage;
