import React from "react";

import { useFetchUser } from "tools/user";
import { Layout } from "components/layout";
import { Tufte } from "components/tufte";

/**
 * @example ```jsx <ProfileCard user={user} />
 * @prop {object} user - data to be shown in the profile
 */
const ProfileCard = ({ user: { displayName, tags, abstract } }) => (
  <article>
    <h1>{displayName}</h1>
    {<p className="subtitle">{tags}</p>}
    <section>
      <h2>Abstract</h2>
      <p>{abstract}</p>
    </section>
  </article>
);

/**
 * @example ```jsx <Profile />
 */
const Profile = () => {
  const { user, loading } = useFetchUser({ required: true });

  return (
    <Layout user={user} loading={loading}>
      <Tufte />
      {loading ? <h1>Loading...</h1> : <ProfileCard user={user} />}
    </Layout>
  );
};

export default Profile;
