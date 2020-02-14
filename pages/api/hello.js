/**
 * @path {ANY} /hello
 * @example
 * ```js
 * const { status, body } = await fetch(`${url}/api/hello`)
 * console.log(status, body) => 200, "Hello World!"
 * ```
 * @response {string} body - "Hello World!"
 * @code {200} - success
 * @arg {object} req - request object not needed
 * @arg {object} res - response object not needed
 */
export default (req, res) => res.status(200).send("Hello World!");
