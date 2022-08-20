import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const VerifyUser = () => {
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    if (!code) {
      return;
    }

    fetch(`/api/verify/${code}`);

    setTimeout(() => {
      router.replace("/login");
    }, 5000);
  }, [code]);

  return (
    <div className="verification">
      <div>Account verified. Redirecting to login page.</div>
      <div>
        <Link href="/login">
          <span className="verification-link">Click here</span>
        </Link>{" "}
        if the page does not redirect.
      </div>
    </div>
  );
};

export default VerifyUser;
