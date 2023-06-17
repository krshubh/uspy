import React, { useState } from "react";
import {
  CALL_LOG_CHILD_API,
  CONFIRM_RESET_PASSWORD,
  RESET_PASSWORD,
} from "../constants";
import { callAPI } from "../callApi";

const PasswordResetConfirmForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetComplete, setResetComplete] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    callAPI({
      url: CONFIRM_RESET_PASSWORD,
      access_token: this.props.authTokens.access,
      method: "POST",
    })
      .then((res) => res.json())
      .then(
        (json) => {
          console.log("json", json);
        },
        (error) => {
          console.error(error);
        }
      );
  };

  return (
    <div>
      {resetComplete ? (
        <p>Your password has been successfully reset.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit">Reset Password</button>
        </form>
      )}
    </div>
  );
};

export default PasswordResetConfirmForm;
