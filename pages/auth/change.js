import React, { useState } from "react";
import { useApi } from "~/tools";

/**
 * @example ```jsx <Change />
 * @returns Change - change password form react component
 */
const Change = () => {
  const {
    data: { displayName },
    error
  } = useApi("/auth/me");
  const { newPassword, setNewPassword } = useState("");

  /**
   * @example ```jsx <form onSubmit={submitChange} />
   * @returns {object} res - /users/{displayName}/password route response
   */
  const submitChange = async () =>
    await fetch(`/users/${displayName}/password`, {
      method: "POST",
      body: { newPassword }
    });
  if (error) return <div>You must sign in to change your password.</div>;
  if (!displayName) return <div>Loading...</div>;
  return (
    <form onSubmit={submitChange}>
      <label htmlFor="newPassword">New Password:</label>
      <input
        type="password"
        key="newPassword"
        name="newPassword"
        value={newPassword}
        onChange={setNewPassword}
      />
    </form>
  );
};

export default Change;
