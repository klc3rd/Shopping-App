import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import loginText from "../../../utils/text/login-text";
import Link from "next/link";
import Input from "../form/input";
import validator from "validator";
import CheckValidation from "../check-validation";

interface ILoginForm {
  forwardURL?: string;
}

const LoginForm: React.FC<ILoginForm> = (props) => {
  const forwardURL = props.forwardURL || "/";

  const router = useRouter();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // Error states
  const [emailError, setEmailError] = useState<string | null>(null);
  const [storedEmail, setStoredEmail] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState<boolean>(false);

  const loginHandler = async () => {
    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;

    if (!email || !validator.isEmail(email)) {
      setEmailError("Must enter a valid email");
      return;
    }

    if (!password) {
      setPasswordError("Password cannot be empty");
      return;
    }

    const response = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (response) {
      if (response.status !== 200) {
        setPasswordError("Incorrect username or password");
        return;
      }

      setStoredEmail(email);
      setLoggingIn(true);
    }
  };

  const clearErrors = () => {
    setEmailError(null);
    setPasswordError(null);
  };

  return (
    <div className="login">
      {!loggingIn && (
        <>
          <div className="login-container">
            <div className="login-container-heading">User Login</div>
            <div className="login-container-left">
              <form onSubmit={(e) => e.preventDefault()} onChange={clearErrors}>
                <Input inputType="text" icon="email" ref={emailRef}>
                  Email
                </Input>
                <span className="error">{emailError}</span>
                <Input inputType="password" icon="lock" ref={passwordRef}>
                  Password
                </Input>
                <span className="error">{passwordError}</span>
                <div className="auth-submit">
                  <div>
                    <Link href="/login/reset">
                      <span className="login-reset-link">Forgot password</span>
                    </Link>
                  </div>
                  <button onClick={loginHandler} className="auth-submit__btn">
                    Login
                  </button>
                </div>
              </form>
            </div>
            <div className="login-container-right">{loginText}</div>
          </div>
        </>
      )}
      {loggingIn && !!storedEmail && (
        <CheckValidation email={storedEmail} forwardURL={forwardURL} />
      )}
    </div>
  );
};

LoginForm.displayName = "LoginForm";
export default LoginForm;
