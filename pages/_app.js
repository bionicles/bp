import React from "react";
import App from "next/app";
import "../css/index.css";

/**
 * @name App
 * @link https://nextjs.org/docs/advanced-features/custom-app
 */
class MyApp extends App {
  /** Make the app */
  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default MyApp;
