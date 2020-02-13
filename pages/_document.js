// ./pages/_document.js
import Document, { Head, Main, NextScript } from "next/document";

/**
 * @name Document
 * @link https://nextjs.org/docs/advanced-features/custom-document
 */
export default class MyDocument extends Document {
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
