/**
 * @path {ANY} /hello
 * @example
 * ```js
 * const { status, body } = await fetch(`${url}/api/hello`)
 * console.log(status, body) => 200, "Hello World!"
 * ```
 * @response {string} body - "Hello World!"
 * @code {200} - success
 */
export default (_, res) => res.status(200).send("Hello World!");
