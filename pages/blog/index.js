import Link from "next/link";

/**
 * @name Blog Page
 */
export default () => {
  return (
    <>
      <div>Welcome to the Bit Pharma Blog!</div>
      <ul>
        <li>
          <Link href="/blog/database">
            <a>Why did Bit Pharma choose PostgreSQL?</a>
          </Link>
        </li>
      </ul>
    </>
  );
};
