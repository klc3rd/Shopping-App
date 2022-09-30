import { useRef, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import AccountContainer from "./container";
import Input from "../form/input";
import validator from "validator";

const ChangePassword: React.FC = () => {
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmRef = useRef<HTMLInputElement | null>(null);

  const [message, setMessage] = useState<string | null>(null);
  const [errorState, setErrorState] = useState<boolean>(false);

  const query = gql`
    mutation ($password: String!) {
      userUpdatePassword(password: $password)
    }
  `;

  const [updatePassword] = useMutation(query);

  const changePasswordHandler = () => {
    const newPassword = passwordRef.current!.value;
    const confirmPassword = passwordConfirmRef.current!.value;

    if (!validator.isLength(newPassword, { min: 8 })) {
      setMessage("Password must be at least 8 characters");
      setErrorState(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Password and password confirmation must match");
      setErrorState(true);
      return;
    }

    updatePassword({ variables: { password: newPassword } });
    setMessage("Password has been updated");
  };

  const clearErrors = () => {
    setErrorState(false);
    setMessage(null);
  };

  return (
    <AccountContainer>
      <div>
        <div>
          Change Password
          {message && (
            <span className={`account-message ${errorState && `error`}`}>
              {message}
            </span>
          )}
        </div>
        <form onSubmit={(e) => e.preventDefault()} onChange={clearErrors}>
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
