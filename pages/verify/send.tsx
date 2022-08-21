import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TransitionContainer from "../../components/page/transition";
import Countdown from "react-countdown";

const SendVerification = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const emailStorage = localStorage.getItem("email");
    setEmail(emailStorage);
  }, []);

  // Resends verification then refreshes the page and counter
  // in case the user needs another verification email
  const resendHandler = async () => {
    await fetch("/api/verify/resend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    router.reload();
  };

  return (
    <TransitionContainer>
      <div className="sendVerification">
        A verification email has been sent to your email.
        <div className="sendVerification-container">
          <Countdown
            date={Date.now() + 60000}
            intervalDelay={0}
            precision={1}
            renderer={({ seconds }) => {
              if (seconds === 0) {
                return (
                  <button
                    onClick={resendHandler}
                    className="sendVerification-btn"
                  >
                    Send another verification
                  </button>
                );
              } else {
                return <div>{seconds}</div>;
              }
            }}
          />
        </div>
      </div>
    </TransitionContainer>
  );
};

SendVerification.displayName = "SendVerification";
export default SendVerification;
