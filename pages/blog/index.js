import Link from "next/link";

import Layout from "components/layout";
import Tufte from "components/tufte";

/**
 * @example ```jsx <Blog />
 */
const Blog = () => (
  <Layout>
    <Tufte />
    <h1>Welcome to the Bit Pharma Blog!</h1>
    <ul>
      <li>
        <Link href="/blog/database">
          <a>Why did Bit Pharma choose PostgreSQL?</a>
        </Link>
      </li>
    </ul>
  </Layout>
);

export default Blog;
