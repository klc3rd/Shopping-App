import { useEffect } from "react";
import { useRouter } from "next/router";

interface ICheckValidation {
  forwardURL?: string;
  email: string;
}

const CheckValidation: React.FC<ICheckValidation> = (props) => {
  const { email } = props;
  const forwardURL = props.forwardURL || "/";
  const router = useRouter();

  useEffect(() => {
    const checkVerificationStatus = async () => {
      const response = await fetch(`/api/verify/check/${email}`);
      const data = await response.json();

      if (data.verified === true) {
        router.replace(forwardURL);
      } else {
        router.replace(`/verify/send/${email}`);
      }
    };

    checkVerificationStatus();
  }, [email, forwardURL, router]);

  return <div className="redirect">Redirecting...</div>;
};

export default CheckValidation;
