import React from "react";
import App from "next/app";
import "../css/index.css";

/**
 * Custom App class to enable custom css.
 *
 * @example
 * ```jsx
 * <CustomApp />
 * ```
 * @see {@link https://nextjs.org/docs/advanced-features/custom-app}
 */
class CustomApp extends App {
  /** Render the custom app
   * @example ```jsx <CustomApp />```
   */
  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default CustomApp;
