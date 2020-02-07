import { useApi } from "~/tools";

const Change = () => {
  const { data, error } = useApi("/auth/me");
  const { state, update } = useState({ newPassword: "" });

  if (error) return <div>You must sign in to change your password.</div>;
  if (!data) return <div>Loading...</div>;
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="newPassword">New Password:</label>
      <input
        type="password"
        key="newPassword"
        name="newPassword"
        onChange={handleChange}
      />
    </form>
  );
};

export default Change;
