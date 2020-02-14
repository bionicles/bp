# Bit Pharma

Bit Pharma is an international biosecurity and medical research risk management firm

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/bionicles/bp/blob/master/LICENSE)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fbionicles%2Fbp.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fbionicles%2Fbp?ref=badge_shield)

## Example Usage

Prod (old repo):
http://bitpharma.com
https://bitpharma.com
http://www.bitpharma.com
https://www.bitpharma.com

Dev:
http://gitpharma.com
https://gitpharma.com
http://www.gitpharma.com
https://www.gitpharma.com

```js
const url = https://www.gitpharma.com/api;
```

### Say Hello

```js
const { status, body } = await fetch(`${url}/hello`);
console.log(status, body); // => 200, "Hello World!"
```

### Sign Up and Verify your Email

```js
const signUpResponse = await fetch(`${url}/users`, {
  method: "POST",
  body: {
    displayName: "Bender", // <--- displayName is public
    email: "bender@planetexpress.com", // <--- email is private
    password: "good news everyone"
  }
});
// signUpResponse.status === 200;

// get the code from bender@planetexpess.com inbox
const verifyResponse = await fetch(`${url}/users/verify`, {
  method: "POST",
  body: { code: 123456 }
});
// verifyResponse.status === 200;
```

### Log In

```js
const loginResponse = await fetch(`${url}/api/login`, {
  method: "POST",
  body: { password: "good news everyone" }
});
// loginResponse.status === 200;
```

### Read / Retrieve User

```js
// if not signed in as bender
const readResponse = await fetch(`${url}/api/users/bender`);
// readResponse.body === { displayName: "bender" };
// readResponse.status === 200;

// if signed in as bender, more details available:
const readResponse = await fetch(`${url}/api/users/bender`);
// readResponse.body === { displayName: "bender", email: "bender@planetexpress.com", teamIds: [...] };
// readResponse.status === 200;
```

### Change Password

```js
const changeResponse = await fetch(`${url}/api/users/bender/password`, {
  method: "POST",
  body: { password: "good news everyone", newPassword: "remember me" }
});
// changeResponse.status === 200;
```

### Forgot Password

```js
const forgotResponse = await fetch(`${url}/api/users/bender/forgot`, {
  method: "POST"
});
// forgotResponse.status === 200;

// get the code from bender@planetexpess.com inbox
const resetResponse = await fetch(`${url}/api/users/bender/reset`, {
  method: "POST",
  body: { code: 123456 }
});
// resetResponse.status === 200;
```

### Delete Account

```js
// if signed in as bender
const deleteResponse = await fetch(`${url}/api/users/bender`, {
  method: "DELETE"
});
// resetResponse.status === 200;
```

## Contribute: Document, Test, Deliver

[Document in this README file](https://github.com/bionicles/bp/edit/master/README.md)
[Document the API with JSDoc](https://jsdoc.app/tags-type.html)
[E2e test with CodeceptJS](https://github.com/bionicles/bp/blob/master/tests/e2e/e2e_test.js)
[Unit test with Jest](https://github.com/bionicles/bp/blob/master/tests/unit.test.js)

### Develop Locally

```shell
git clone https://github.com/bionicles/bp

# run the database
yarn run-db

# install dependencies, lint, audit, and unit-test
yarn prep

# start the NextJS server
yarn dev

# to run a lighthouse test
yarn lighthouse

# open a new terminal and rerun e2e tests automatically on changes:
yarn watch
```

_For security issues or sensitive matters, please email bion@bitpharma.com_ -- To contribute feature requests, bug reports, questions, or comments, ensure the issue is on the [issues list](https://github.com/bionicles/bp/issues) (please do not duplicate existing issues) and move it to "doing" on the [issues triage project](https://github.com/bionicles/bp/projects/1) when you work actively to solve it.

Only 1-2 issues active at once, and please [give constructive criticism](https://hbr.org/2019/03/the-feedback-fallacy)!

## Dependencies

- [MacOS](https://www.apple.com/macos/catalina/) + [Ubuntu](https://ubuntu.com/)
- [git](https://github.github.com/training-kit/downloads/github-git-cheat-sheet.pdf) and [hub](https://github.com/github/hub) and [GitHub](http://github.com/)
- [GitHub Actions](https://github.com/marketplace)
- [VS Code](https://code.visualstudio.com/download)
- [make](https://news.ycombinator.com/item?id=21566530)
- [nodemon](https://github.com/remy/nodemon#nodemon)
- [npm](https://npmjs.com) and [yarn](https://yarnpkg.com/lang/en/)
- [markdown](https://www.markdownguide.org/cheat-sheet/)
- [CodeceptJS](https://codecept.io/)
- [Lighthouse](https://github.com/GoogleChrome/lighthouse-ci)
- [Jest](https://jestjs.io/docs/en/getting-started)
- [Docker](https://docs.docker.com/develop/dev-best-practices/) and [Docker Compose](https://gist.github.com/jonlabelle/bd667a97666ecda7bbc4f1cc9446d43a)
- [React](https://reactjs.org/docs/hooks-intro.html) + [NextJS](https://nextjs.org/docs) + [npx create-next-app](https://github.com/zeit/next.js)
- [tailwind css](https://tailwindcss.com/) and [tufte css](https://edwardtufte.github.io/tufte-css/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/ddl-rowsecurity.html)
- [node-postgres](https://node-postgres.com/)
- [Twilio](https://www.twilio.com/docs)
- [Stripe Connect](https://stripe.com/docs/connect)
- [semantic-release](https://github.com/semantic-release/semantic-release#commit-message-format)

## User Stories

- [ ] To `sign up easily` as a `user` I want `only one email/password login option` because `I often forget which of N auth providers I used... I cannot forget which option I chose`

- [ ] To `give private feedback` as a `user` I want `an email for Bit Pharma leadership` because `some issues are private`

- [ ] To `give public feedback` as a `user` I want `a link to Github Issues` because `this lets me report and track my concerns`

- [ ] To `find the reagents I need` as a `researcher` I want `to search inventory in my lab and nearby labs` because `it is hard to find reagents`

- [ ] To `save my inventory` as a `researcher` I want `a keyboard form to add inventory` because `it is faster to type`

- [ ] To `read inventory` as a `researcher` I want `to view item data` because `this lets me see where it is`

- [ ] To `know what I have` as a `researcher` I want `to view an item data` because `this lets me see where it is`

- [ ] To `stay up to date` as a `researcher` I want `to click on and edit inventory data` because `things change`

- [ ] To `delete inventory` as a `researcher` I want `to archive items` because `stuff goes bad or gets used up`

- [ ] To `comply with regulations` as a `researcher` I want `an immutable audit trail of events` because `this helps me prove to others what happened`

- [ ] To `prevent theft and terrorism` as a `biologist` I want `to be notified when stuff goes missing` because `my reagents are expensive and potentially dangerous`

- [ ] To `get paid` as a `provider of goods and services` I want `a way to connect my inventory with stripe` because `this lets me charge money for my contributions to others`

- [ ] To `increase revenue` as a `provider of goods and services` I want `a way to promote my inventory` because `marketing helps potential customers find my offerings`

- [ ] To `make a list of what I need` as a `researcher` I want `to add items to a cart` because `this lets me track what I want to buy`

- [ ] To `order what I need` as a `researcher` I want `to checkout easily` because `I need my stuff faster`

- [ ] To `know when my things arrive` as a `researcher` I want `shipment tracking` because `this helps me plan experiments`

- [ ] To `track stuff I like` as a `researcher` I want `a wish list` because `some things are interesting but I am not ready to purchase them`

- [ ] To `receive critical updates` as a `user` I want `a minimal notification system` because `this makes sure I will not miss anything`

- [x] To `not use crappy websites` as a `user` I want `releases to require Lighthouse >90 on all fronts` because `I don't like to use slow, inaccessible sites`

## Contributors

[contributors tracked here](https://github.com/bionicles/bp/contributors)

## References

[The Twelve-Factor App](https://12factor.net/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fbionicles%2Fbp.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fbionicles%2Fbp?ref=badge_large)

## API
## Modules

<dl>
<dt><a href="#module_/users/">/users/</a> : <code>displayName</code></dt>
<dd><p>/users/</p>
</dd>
<dt><a href="#module_/users">/users</a></dt>
<dd></dd>
</dl>

## Members

<dl>
<dt><a href="#Migrate">Migrate</a></dt>
<dd></dd>
<dt><a href="#Verify Email">Verify Email</a> ⇒</dt>
<dd></dd>
</dl>

<a name="module_/users/"></a>

## /users/ : <code>displayName</code>
/users/

**Example**  
```js const user = await fetch(`/users/${displayName}`);```
<a name="module_/users"></a>

## /users

| Param | Type | Description |
| --- | --- | --- |
| req | <code>object</code> | the request from the user |
| res | <code>object</code> | a response object |

**Example**  
```jsx const users = fetch("/users");```
<a name="Migrate"></a>

## Migrate
**Kind**: global variable  
**Path**: <code>POST</code> /api/admin/migrate  
**Body**: <code>string</code> req.body.password - db admin password  
**Code**: <code>400</code> Wrong Password  
**Code**: <code>200</code> Success  
**Code**: <code>500</code> Failure  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>object</code> | request |
| res | <code>object</code> | response |

**Example**  
```js
const migrationResponse = await fetch(
`${url}/api/admin/migrate/`, {
method: 'POST',
body: { adminPassword: process.env.ADMIN_PASSWORD }
});
console.log(migrationResponse.status) => 200
```
<a name="Verify Email"></a>

## Verify Email ⇒
**Kind**: global variable  
**Returns**: Secure HTTP-Only JWT Session Cookie  
**Path**: <code>POST</code> /users/verify
```js
const verifyResponse = await fetch(`${url}/users/verify`, {
  method: "POST",
  body: { email: "bender@planetexpress.com", code: 123456 }
});
verifyResponse.status === 200;
```  
**Body**: <code>string</code> email  
**Body**: <code>string</code> code  
**Code**: <code>400</code> Invalid request  
**Code**: <code>500</code> Server error  
**Code**: <code>200</code> Success  
