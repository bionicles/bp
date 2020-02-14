import { Header } from "./header";
import Head from "next/head";

/**
 * @example ```jsx
 * const props = {user, loading, children};
 * return (
 *  <Layout {...props}>
 *    <Child1 />
 *    <Child2 />
 *  </Layout>
 * )
 * ```
 * @prop {object} user - data for logged in user
 * @prop {boolean} loading - if the user is loading
 * @prop {*} children - react components for the body of the page
 */
const Layout = ({ user, loading = false, children }) => {
  return (
    <>
      <Head>
        <title>Bit Pharma</title>
      </Head>

      <Header user={user} loading={loading} />

      <main>
        <div className="container">{children}</div>
      </main>

      <style jsx>{`
        .container {
          max-width: 42rem;
          margin: 1.5rem auto;
        }
      `}</style>
      <style jsx global>{`
        body {
          margin: 0;
          color: #333;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        }
      `}</style>
    </>
  );
};

export default Layout;
