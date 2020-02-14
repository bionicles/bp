import Document, { Head, Main, NextScript } from "next/document";

/**
 * Define custom HTML document (useful for SEO)
 *
 * @example ```jsx <CustomDocument />```
 * @see {@link https://nextjs.org/docs/advanced-features/custom-document|Next.js Docs}
 */
export default class CustomDocument extends Document {
  /**
   * @example ```jsx <CustomDocument />```
   * @returns {*} CustomDocument component
   */
  render() {
    return (
      <html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
