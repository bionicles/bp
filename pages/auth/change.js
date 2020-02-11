import React, { useState } from "react";
import { useApi } from "~/tools";

const Change = () => {
  const { data, error } = useApi("/auth/me");
  const { newPassword, setNewPassword } = useState("");

  const handleSubmit = useMemo(
    () =>
      fetch(`/users/${data.displayName}/password`, {
        method: "POST",
        body: { newPassword }
      }),
    [newPassword]
  );
  if (error) return <div>You must sign in to change your password.</div>;
  if (!data) return <div>Loading...</div>;
  return (
    <form onSubmit={handleSubmit}>
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
