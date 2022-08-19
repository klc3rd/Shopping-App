import { useRouter } from "next/router";
import TransitionContainer from "../../components/page/transition";
import Countdown from "react-countdown";

const SendVerification = () => {
  const router = useRouter();

  // Resends verification then refreshes the page and counter
  // in case the user needs another verification email
  const resendHandler = () => {
    console.log("Test");
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
