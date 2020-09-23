import React, { useState } from "react";
import useInput from "../../Hooks/useInput";
import AuthPresenter from "./AuthPresenter";
import { useMutation } from "react-apollo-hooks";
import { CREATE_ACCOUNT, LOG_IN } from "./AuthQueries";
import { toast } from "react-toastify";

export default () => {
  const [action, setAction] = useState("logIn");
  const nickname = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");
  const [requestSecret] = useMutation(LOG_IN, {
    // update : mutation이 발생할 때 실행하는 함수! //
    update: (_, { data }) => {
      const { requestSecret } = data;

      if (!requestSecret) {
        toast.error("You don't have an account. You should create account.");
        setTimeout(() => setAction("signUp"), 3000);
      }
    },
    variables: { email: email.value },
  });

  const [createAccount] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      nickname: nickname.value,
      firstName: firstName.value,
      lastName: lastName.value,
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (action === "logIn") {
      if (email.value !== "") {
        requestSecret();
      } else {
        toast.error("Email is required");
      }
    } else if (action === "signUp") {
      if (
        email.value !== "" &&
        nickname.value !== "" &&
        firstName !== "" &&
        lastName !== ""
      ) {
        createAccount();
      } else {
        toast.error("All field are required");
      }
    }
  };

  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      nickname={nickname}
      firstName={firstName}
      lastName={lastName}
      email={email}
      onSubmit={onSubmit}
    />
  );
};
