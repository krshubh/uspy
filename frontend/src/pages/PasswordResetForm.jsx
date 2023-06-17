import React, { useState } from "react";
import { callAPI } from "../callApi";
import { RESET_PASSWORD } from "../constants";

const PasswordResetForm = () => {
  const [email, setEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    callAPI({
      url: RESET_PASSWORD,
      access_token: this.props.authTokens.access,
      method: "POST",
    })
      .then((res) => res.json())
      .then(
        (json) => {
          console.log("json", json);
        },
        (error) => {
          console.log("error", error.message);
        }
      );
  };

  return (
    <div>
      {resetSent ? (
        <p>
          An email with password reset instructions has been sent to your email
          address.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Reset Password</button>
        </form>
      )}
    </div>
  );
};

export default PasswordResetForm;
