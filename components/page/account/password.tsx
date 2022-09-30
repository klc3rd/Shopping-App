import { useRef, useState } from "react";
import AccountContainer from "./container";
import Input from "../form/input";
import validator from "validator";

const ChangePassword: React.FC = () => {
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmRef = useRef<HTMLInputElement | null>(null);

  const [error, setError] = useState<string | null>(null);

  const changePasswordHandler = () => {
    const newPassword = passwordRef.current!.value;
    const confirmPassword = passwordConfirmRef.current!.value;

    if (!validator.isLength(newPassword, { min: 8 })) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Password and password confirmation must match");
      return;
    }

    /*
     * TODO: Add password change functionality
     */
  };

  return (
    <AccountContainer>
      <div>
        <div>
          Change Password
          {error && <span className="account-message error">{error}</span>}
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          onChange={() => {
            setError(null);
          }}
        >
          <Input inputType="password" icon="lock" ref={passwordRef}>
            New Password
          </Input>
          <Input inputType="password" icon="lock" ref={passwordConfirmRef}>
            Confirm Password
          </Input>
        </form>
      </div>
      <div className="account-bottom">
        <button onClick={changePasswordHandler} className="auth-submit__btn">
          Update User
        </button>
      </div>
    </AccountContainer>
  );
};

ChangePassword.displayName = "ChangePassword";
export default ChangePassword;
