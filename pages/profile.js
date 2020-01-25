import React from "react";

// This import is only needed when checking authentication status directly from getInitialProps
// import auth0 from '../lib/auth0'
import { useFetchUser } from "user";
import Layout from "components";

const ProfileCard = ({ user: { picture, nickname, name } }) => {
  return (
    <>
      <h1>Profile</h1>

      <div>
        <h3>Profile (server rendered)</h3>
        <img src={picture} alt="user picture" />
        <p>nickname: {nickname}</p>
        <p>name: {name}</p>
      </div>
    </>
  );
};

function Profile() {
  const { user, loading } = useFetchUser({ required: true });

  return (
    <Layout user={user} loading={loading}>
      {loading ? <>Loading...</> : <ProfileCard user={user} />}
    </Layout>
  );
}

export default Profile;
