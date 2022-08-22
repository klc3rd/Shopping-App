import { useRef, useState } from "react";
import Input from "../form/input";

const ResetForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState<boolean>(false);

  const emailRef = useRef<HTMLInputElement>(null);

  const resetHandler = async () => {
    const email = emailRef.current!.value;

    if (!email) {
      setError("Must specify a valid email");
    }

    emailRef.current!.value = "";

    fetch("/api/reset/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    setResetSent(true);
  };

  const clearErrors = () => {
    setError(null);
    setResetSent(false);
  };

  return (
    <div className="reset-container">
      <span className="reset-heading">Reset Password</span>
      <form onSubmit={(e) => e.preventDefault()} onChange={clearErrors}>
        <Input ref={emailRef} icon="email">
          Email
        </Input>
        {error && (
          <>
            <span className="error">{error}</span>
            <p />
          </>
        )}
        <div className="reset-btn-container">
          <button className="auth-submit__btn" onClick={resetHandler}>
            Reset
          </button>
        </div>
        {resetSent && (
          <span className="reset-notification">
            If a valid email is found, a password reset has been sent.
          </span>
        )}
      </form>
    </div>
  );
};

ResetForm.displayName = "ResetForm";
export default ResetForm;
