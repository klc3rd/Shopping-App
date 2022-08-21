import { useRef, useState } from "react";
import loginText from "../../../utils/text/login-text";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Input from "../form/input";
import validator from "validator";

const LoginForm: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // Error states
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

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
      }

      // TOOD: Finish login process, check for validation
    }
  };

  const clearErrors = () => {
    setEmailError(null);
    setPasswordError(null);
  };

  return (
    <div className="login">
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
                <Link href="/password-reset">
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
    </div>
  );
};

LoginForm.displayName = "LoginForm";
export default LoginForm;
