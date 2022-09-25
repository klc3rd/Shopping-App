import { useRef, useState, useEffect, useContext } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import Input from "../form/input";

import { HomeContext } from "../home/provider";

const AccountPage: React.FC = (props) => {
  const HomeCtx = useContext(HomeContext);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  const [message, setMessage] = useState<string | null>(null);
  const [errorState, setErrorState] = useState<boolean>(false);

  const [name, setName] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const getUser = gql`
    query {
      user {
        name
        username
        email
      }
    }
  `;

  const updateNameQuery = gql`
    mutation ($name: String!) {
      userUpdateName(name: $name)
    }
  `;
  const updateUsernameQuery = gql`
    mutation ($username: String!) {
      userUpdateUsername(username: $username)
    }
  `;
  const updateEmailQuery = gql`
    mutation ($email: String!) {
      userUpdateEmail(email: $email)
    }
  `;

  const { data, refetch } = useQuery(getUser);
  const [updateName] = useMutation(updateNameQuery);
  const [updateUsername, { data: updateUsernameData }] =
    useMutation(updateUsernameQuery);
  const [updateEmail, { data: updateEmailData }] =
    useMutation(updateEmailQuery);

  useEffect(() => {
    if (data?.user) {
      setName(data.user.name);
      setUsername(data.user.username);
      setEmail(data.user.email);
    }
  }, [data, setName, setUsername, setEmail]);

  const updateHandler = async () => {
    const newName = nameRef.current!.value;
    const newUsername = usernameRef.current!.value;
    const newEmail = emailRef.current!.value;

    if (newName) {
      await updateName({ variables: { name: newName } });
    }

    /*
     * TODO: Add update logic here
     */

    nameRef.current!.value = "";
    usernameRef.current!.value = "";
    emailRef.current!.value = "";

    refetch();

    HomeCtx.updateCartState!((val) => val + 1);
    if (!errorState) {
      setMessage("User updated");
    }
  };

  return (
    <div className="account-container">
      <span>Edit Account</span>
      <span className={`account-message ${errorState && `error`}`}>
        {message}
      </span>
      <div className="account-edit">
        <div className="account-heading">Name</div>
        <div>
          {name && (
            <Input ref={nameRef} icon="user">
              {name}
            </Input>
          )}
        </div>
        <div className="account-heading">Username</div>
        <div>
          {username && (
            <Input ref={usernameRef} icon="user">
              {username}
            </Input>
          )}
        </div>
        <div className="account-heading">Email</div>
        <div>
          {email && (
            <Input ref={emailRef} icon="email">
              {email}
            </Input>
          )}
        </div>
      </div>
      <div className="account-bottom">
        <button onClick={updateHandler} className="auth-submit__btn">
          Update User
        </button>
      </div>
    </div>
  );
};

AccountPage.displayName = "AccountPage";
export default AccountPage;
