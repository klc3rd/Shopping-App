import { useState, useRef } from "react";
import Input from "../form/input";
import validator from "validator";
import { useRouter } from "next/router";

interface IChangePassword {
  code: string;
}

const ChangePassword: React.FC<IChangePassword> = (props) => {
  const { code } = props;

  const router = useRouter();

  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);
  const [passwordChanged, setPasswordChanged] = useState<boolean>(false);

  const changePasswordHandler = async () => {
    const password = passwordRef.current!.value;
    const confirmPassword = confirmPasswordRef.current!.value;

    if (!validator.isLength(password, { min: 8 })) {
      setPasswordError("Password must be at least 8 characters");
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Password confirmation does not match");
    }

    const response = await fetch("/api/reset/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        password,
      }),
    });

    const data = await response.json();
    if (response.status !== 200) {
      setConfirmPasswordError(data.message);
      return;
    }

    setPasswordChanged(true);
    setTimeout(() => {
      router.replace("/login");
    }, 2000);
  };

  const clearErrors = () => {
    setPasswordError(null);
    setConfirmPasswordError(null);
  };

  return (
    <div className="password-change">
      <div className="password-change-container">
        {!passwordChanged && (
          <>
            <span className="password-change-heading">Change Password</span>
            <form onSubmit={(e) => e.preventDefault()} onChange={clearErrors}>
              <Input ref={passwordRef} icon="lock" inputType="password">
                New Password
              </Input>
              {passwordError && <span className="error">{passwordError}</span>}
              <Input ref={confirmPasswordRef} icon="lock" inputType="password">
                Confirm Password
              </Input>
              {confirmPasswordError && (
                <>
                  <span className="error">{confirmPasswordError}</span>
                  <p />
                </>
              )}
              <button
                className="auth-submit__btn"
                onClick={changePasswordHandler}
              >
                Change Password
              </button>
            </form>
          </>
        )}
        {passwordChanged && (
          <>
            <div>Password changed. Redirecting to login page.</div>
          </>
        )}
      </div>
    </div>
  );
};

ChangePassword.displayName = "ChangePassword";
export default ChangePassword;
