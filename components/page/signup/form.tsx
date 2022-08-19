import { useState, useRef, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import Input from "../form/input";
import Tos from "../form/tos";
import validator from "validator";

const SignupForm: React.FC = () => {
  let userCreateQuery = gql`
    mutation (
      $name: String!
      $username: String!
      $email: String!
      $password: String!
    ) {
      userCreate(
        name: $name
        username: $username
        email: $email
        password: $password
      ) {
        user {
          email
        }
      }
    }
  `;

  const [addUser, { data }] = useMutation(userCreateQuery);

  // form refs
  const nameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const [tosAcceptState, setTosAcceptState] = useState<boolean>(false);

  // error states
  const [standardError, setStandardError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);
  const [acceptError, setAcceptError] = useState<string | null>(null);

  const regsisterSubmitHandler = async () => {
    const name = nameRef.current?.value;
    const username = usernameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    if (!name) {
      setNameError("Name cannot be blank");
      clearPassword();
      return;
    }

    if (!username) {
      setUsernameError("Username cannot be blank");
      clearPassword();
      return;
    }

    if (!email || !validator.isEmail(email)) {
      setEmailError("Must be a valid email");
      clearPassword();
      return;
    }

    if (!password || !validator.isLength(password, { min: 8 })) {
      setPasswordError("Password  must be at least 8 characters");
      clearPassword();
      return;
    }

    if (!confirmPassword || confirmPassword !== password) {
      setConfirmPasswordError(
        "Password and password confirmation must be the same"
      );
      clearPassword();
      return;
    }

    if (!tosAcceptState) {
      setAcceptError("You must accept the terms of service");
      clearPassword();
      return;
    }

    try {
      await addUser({ variables: { name, email, username, password } });
    } catch (err: any) {
      if (
        err.message.includes(
          "Unique constraint failed on the fields: (`username`)"
        )
      ) {
        setUsernameError("Username in use");
      } else if (
        err.message.includes(
          "Unique constraint failed on the fields: (`email`)"
        )
      ) {
        setEmailError("Email in use");
      } else {
        setStandardError(err.message);
      }
      return;
    }
  };

  // Runs code after userCreation graphql is ran and a
  // response is received, data will only be defined
  // after the user is created
  useEffect(() => {
    if (data) {
      // Insert page forwarding here
      const email = data.userCreate.user.email;
      console.log(email);
    }
  }, [data]);

  const resetErrorStatuses = () => {
    setStandardError(null);
    setNameError(null);
    setUsernameError(null);
    setEmailError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);
    setAcceptError(null);
  };

  const clearPassword = () => {
    passwordRef.current!.value = "";
    confirmPasswordRef.current!.value = "";
  };

  return (
    <div className="signup-container">
      <form onSubmit={(e) => e.preventDefault()} onChange={resetErrorStatuses}>
        <span className="signup-container-heading">User Registration</span>
        <Input ref={nameRef} icon="name">
          Name
        </Input>
        <span className="error">{nameError}</span>
        <Input ref={usernameRef} icon="user">
          Username
        </Input>
        <span className="error">{usernameError}</span>
        <Input ref={emailRef} icon="email">
          Email
        </Input>
        <span className="error">{emailError}</span>
        <Input ref={passwordRef} icon="lock" inputType="password">
          Password
        </Input>
        <span className="error">{passwordError}</span>
        <Input ref={confirmPasswordRef} icon="lock" inputType="password">
          Confirm Password
        </Input>
        <span className="error">{confirmPasswordError}</span>
        <Tos />
        <div className="auth-submit">
          <div className="auth-tos-accept">
            <input
              className="auth-tos-accept__checkbox"
              type="checkbox"
              value="accept"
              onChange={() => {
                setTosAcceptState((currentState) => !currentState);
              }}
            />
            <span className="auth-tos-accept__text">
              Accept terms of service
            </span>
            <br />
            <span className="error">{acceptError}</span>
          </div>
          <button onClick={regsisterSubmitHandler} className="auth-submit__btn">
            Register
          </button>
        </div>
        <span className="error">{standardError}</span>
      </form>
    </div>
  );
};

SignupForm.displayName = "SignupForm";

export default SignupForm;
