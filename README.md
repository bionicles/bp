# Bit Pharma

Bit Pharma is an international biosecurity and medical research risk management firm

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/bionicles/bp/blob/master/LICENSE)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fbionicles%2Fbp.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fbionicles%2Fbp?ref=badge_shield)

## Usage

Prod (old repo) :
<http://bitpharma.com>
<https://bitpharma.com>
<http://www.bitpharma.com>
<https://www.bitpharma.com>

Staging:
<http://gitpharma.com>
<https://gitpharma.com>
<http://www.gitpharma.com>
<https://www.gitpharma.com>

## Document, Test, Deliver

hack on Master branch for now. 

[Document in this README file. (user stories + issue then usage example)](https://github.com/bionicles/bp/edit/master/README.md)
[Write e2e tests with CodeceptJS in this file](https://github.com/bionicles/bp/blob/master/tests/e2e/welcome_test.js) (critical)
[Write unit tests with Jest in this file](https://github.com/bionicles/bp/blob/master/tests/unit.test.js) (less important)

```shell

    git clone https://github.com/bionicles/bp

    // install dependencies, lint, audit, and unit-test
    yarn prep

    // start the NextJS server
    yarn dev

    // to run a lighthouse test
    yarn lighthouse

    // open a new terminal and rerun e2e tests automatically on changes:
    yarn watch
```

## API Quickstart

Our API adheres to the [JSON-RPC 2.0 specification](https://www.jsonrpc.org/specification) 

To use it, send a POST request to the /api/rpc endpoint

Request Body Format: JSON Object
jsonrpc: "2.0",
id: a string or number (if missing, we process a notification and reply with status 204 on success)
method: a method from the list below (CAPS_LOCK_WITH_UNDERSCORES)
params: an optional object containing the list of arguments to the method

### Try the API

```js
const HOST = "http://localhost:3000" (or web domain)
const api = `${HOST}/api/rpc`

const callBitPharmaAPI = body => fetch(api, { method: 'POST', body })

const requestBody = {  
    method: "GET_METHODS",
    jsonrpc: "2.0", 
    id: 1
} 

const response = await callBitPharmaAPI(requestBody)
console.log(response.status) // 200
console.log(response.data.result) // Methods: ${METHODS_LIST}

```

### GET_METHODS

request body:
    id: String or Number (required for response)
    method: "GET_METHODS"
    params: Not used

response:
    status: 200 or 204 if id missing
    data: Object if id is provided
        id: Same as request if id is provided
        result: "Methods: ${METHODS_LIST}"

### SIGN_UP

request body:
    id: String or Number (not required)
    method: "SIGN_UP"
    params: Object required for successful signup
        phone: a phone number 

response:
    status: 200 or 204 if id missing
    data: Object if id is provided
        id: Same as request if id is provided
        result: "HELLO ${name}"

## Contribute

_For security issues or other sensitive matters, please email bion@bitpharma.com_ -- To contribute feature requests, bug reports, questions, or comments, ensure the issue is on the [issues list](https://github.com/bionicles/bp/issues) (please don't duplicate existing issues) and move it to "doing" on the [issues triage project](https://github.com/bionicles/bp/projects/1) when you work actively to solve it.

Only 1-2 issues active at once, and please [give constructive criticism](https://hbr.org/2019/03/the-feedback-fallacy)!

## Dependencies

-   [MacOS](https://www.apple.com/macos/catalina/) + [Ubuntu](https://ubuntu.com/)
-   [git](https://github.github.com/training-kit/downloads/github-git-cheat-sheet.pdf) and [hub](https://github.com/github/hub) and [GitHub](http://github.com/)
-   [GitHub Actions](https://github.com/marketplace)
-   [VS Code](https://code.visualstudio.com/download)
-   [make](https://news.ycombinator.com/item?id=21566530)
-   [nodemon](https://github.com/remy/nodemon#nodemon)
-   [npm](https://npmjs.com) and [yarn](https://yarnpkg.com/lang/en/)
-   [markdown](https://www.markdownguide.org/cheat-sheet/)
-   [CodeceptJS](https://codecept.io/)
-   [Lighthouse](https://github.com/GoogleChrome/lighthouse-ci)
-   [Jest](<>)
-   [Docker](https://docs.docker.com/develop/dev-best-practices/) and [Docker Compose](https://gist.github.com/jonlabelle/bd667a97666ecda7bbc4f1cc9446d43a)
-   [React](https://reactjs.org/docs/hooks-intro.html) + [NextJS](https://nextjs.org/docs) + [npx create-next-app](https://github.com/zeit/next.js)
-   [tailwind css](https://tailwindcss.com/) and [tufte css](https://edwardtufte.github.io/tufte-css/)
-   [Auth0](https://auth0.com/docs/)
-   [Twilio](https://www.twilio.com/docs)
-   [Stripe Connect](https://stripe.com/docs/connect)
-   [semantic-release](https://github.com/semantic-release/semantic-release#commit-message-format)

## User Stories

-   [x] To `serve customers` as a `dev` I want `user stories` because `they help me put benefits before features`

-   [ ] To `work on stuff people want` as a `dev` I want `market demand testing` because `this confirms or refutes people want the platform`

-   [x] To `understand license issues` as a `dev` I want `a license badge and license analyzer tool` because `license issues are confusing and litigous`

-   [ ] To `hack faster` as a `dev` I want `clear docs` because `if it's not documented, I don't know how to use it`

-   [x] To `quickly install what I need to contribute` as a `dev` I want `dependencies tracked` because `then I don't need to install by trial and error`

-   [ ] To `code Bit Pharma` as a `dev` I want `a simple RPC API` because `this lets me use the service programmatically`

-   [x] To `know when to update` as a `dev` I want `releases on Github` because `this lets me see and download specific versions`

-   [x] To `not use crappy websites` as a `user` I want `releases to require Lighthouse >90 on all fronts` because `I don't like to use slow, inaccessible sites`

-   [ ] To `sign up easily` as a `user` I want `passwordless login` because `I'm sick of dealing with passwords`

-   [ ] To `secure my account` as a `user` I want `multifactor auth` because `I don't want my account abused`

-   [ ] To `give private feedback` as a `user` I want `an email for Bit Pharma leadership` because `some issues are private`

-   [ ] To `give public feedback` as a `dev` I want `a link to Github Issues` because `this lets me report and track my concerns`

-   [ ] To `give feedback` as a `user` I want `an email address for Bit Pharma leadership` because `some issues are private`

-   [ ] To `find the reagents I need` as a `researcher` I want `to search inventory in my lab and nearby labs` because `it's hard to find reagents`

-   [ ] To `save my inventory` as a `researcher` I want `a keyboard form to add inventory` because `it's faster to type`

-   [ ] To `read inventory` as a `researcher` I want `to view an item's data` because `this lets me see where it is`

-   [ ] To `know what I have` as a `researcher` I want `to view an item's data` because `this lets me see where it is`

-   [ ] To `stay up to date` as a `researcher` I want `to click on and edit inventory data` because `things change`

-   [ ] To `delete inventory` as a `researcher` I want `to archive items` because `stuff goes bad or gets used up`

-   [ ] To `comply with regulations` as a `researcher` I want `an immutable audit trail of events` because `this helps me prove to others what happened`

-   [ ] To `prevent theft and terrorism` as a `biologist` I want `to be notified when stuff goes missing` because `my reagents are expensive and potentially dangerous`

-   [ ] To `get paid` as a `provider of goods and services` I want `a way to connect my inventory with stripe` because `this lets me charge money for my contributions to others`

-   [ ] To `increase revenue` as a `provider of goods and services` I want `a way to promote my inventory` because `marketing helps potential customers find my offerings`

-   [ ] To `make a list of what I need` as a `researcher` I want `to add items to a cart` because `this lets me track what I want to buy`

-   [ ] To `order what I need` as a `researcher` I want `to checkout easily` because `I need my stuff faster`

-   [ ] To `know when my things arrive` as a `researcher` I want `shipment tracking` because `this helps me plan experiments`

-   [ ] To `track stuff I like` as a `researcher` I want `a wish list` because `some things are interesting but I'm not ready to purchase them`

-   [ ] To `receive critical updates` as a `user` I want `a minimal notification system` because `this makes sure I won't miss anything`

-   [ ] To `report critical updates` as a `Stripe dev` I want `a webhook listener` because `our systems need a standard way to report to your systems`

## Contributors

-   **Bion Howard** - _Initial work_ - [bionicles](https://github.com/bionicles)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## References

[The Twelve-Factor App](https://12factor.net/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fbionicles%2Fbp.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fbionicles%2Fbp?ref=badge_large)
