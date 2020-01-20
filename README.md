# Bit Pharma

Bit Pharma is an international biosecurity and medical research risk management firm

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/bionicles/bp/blob/master/LICENSE) 

## Usage

View the master branch :
[http://bitpharma.com](http://bitpharma.com)
[https://bitpharma.com](https://bitpharma.com)
[http://www.bitpharma.com](http://www.bitpharma.com)
[https://www.bitpharma.com](https://www.bitpharma.com)

View the dev branch:
[http://gitpharma.com](http://gitpharma.com)
[https://gitpharma.com](https://gitpharma.com)
[http://www.gitpharma.com](http://www.gitpharma.com)
[https://www.gitpharma.com](https://www.gitpharma.com)

## Document, Test, Deliver

just hacking on Master branch for now

```
git clone https://github.com/bionicles/bp

// in a terminal, run docker-compose and tail logs:
make up

// in another terminal, auto-restart 'make test':
make demon

// to stop and restart the app (in Terminal 1)
ctrl-c
make reset

// to stop the app
make down
```

## Contribute

_For security issues or other sensitive matters, please email bion@bitpharma.com_

To contribute a feature request, docs question, bug report or comment, ensure it is in the issues list (please don't duplicate existing issues) and move it to "doing" on the issues triage project when you work actively to solve it. 

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
- [Jest]()
- [Docker](https://docs.docker.com/develop/dev-best-practices/) and [Docker Compose](https://gist.github.com/jonlabelle/bd667a97666ecda7bbc4f1cc9446d43a)
- [React](https://reactjs.org/docs/hooks-intro.html) + [NextJS](https://nextjs.org/docs) + [npx create-next-app](https://github.com/zeit/next.js)
- [tailwind css](https://tailwindcss.com/) and [tufte css](https://edwardtufte.github.io/tufte-css/)
- [Auth0](https://auth0.com/docs/)
- [Stripe Connect](https://stripe.com/docs/connect)


## User Stories

To `serve customers` as a `dev` I want `user stories` because `they help me put benefits before features`
- [ ] documented
- [ ] tested 
- [ ] delivered

To `save time` as a `user` I want `a site which passes Lighthouse` because `I don't like to use slow, inaccessible sites`
- [ ] documented
- [ ] tested
- [ ] delivered

To `hack faster` as a `dev` I want `clear docs` because `if it's not documented, I don't know how to use it`
- [ ] documented
- [ ] tested
- [ ] delivered

To `quickly install what I need to contribute` as a `dev` I want `dependencies tracked` because `then I don't need to install by trial and error`
- [ ] documented
- [ ] tested
- [ ] delivered

To `quickly test + deliver improvements` as a `dev` I want `a local setup with docker-compose` because `this works on all machines without a long deployment process`
- [ ] documented
- [ ] tested
- [ ] delivered

To `have 1 coherent interface` as a `dev` I want `commands managed in a Makefile` because `it simplifies my workflow`
- [ ] documented
- [ ] tested
- [ ] delivered

To `code Bit Pharma` as a `dev` I want `a simple API` because `this lets me use the service programmatically`
- [ ] documented
- [ ] tested
- [ ] delivered

To `sign up easily` as a `user` I want `passwordless login` because `I'm sick of dealing with passwords`
- [ ] documented
- [ ] tested
- [ ] delivered

To `secure my account` as a `user` I want `multifactor auth` because `I don't want my account abused`
- [ ] documented
- [ ] tested
- [ ] delivered

To `give private feedback` as a `user` I want `an email for Bit Pharma leadership` because `some issues are private`
- [ ] documented
- [ ] tested
- [ ] delivered

To `give public feedback` as a `dev` I want `a link to Github Issues` because `this lets me report and track my concerns`
- [ ] documented
- [ ] tested
- [ ] delivered

To `give feedback` as a `user` I want `an email address for Bit Pharma leadership` because `some issues are private`
- [ ] documented
- [ ] tested
- [ ] delivered

To `find the reagents I need` as a `researcher` I want `to search inventory in my lab and nearby labs` because `it's hard to find reagents`
- [ ] documented
- [ ] tested
- [ ] delivered

To `save my inventory` as a `researcher` I want `a keyboard form to add inventory` because `it's faster to type`
- [ ] documented
- [ ] tested
- [ ] delivered

To `read inventory` as a `researcher` I want `to view an item's data` because `this lets me see where it is`
- [ ] documented
- [ ] tested
- [ ] delivered

To `know what I have` as a `researcher` I want `to view an item's data` because `this lets me see where it is`
- [ ] documented
- [ ] tested
- [ ] delivered

To `stay up to date` as a `researcher` I want `to click on and edit inventory data` because `things change`
- [ ] documented
- [ ] tested
- [ ] delivered

To `delete inventory` as a `researcher` I want `to archive items` because `stuff goes bad or gets used up`
- [ ] documented
- [ ] tested
- [ ] delivered

To `comply with regulations` as a `researcher` I want `an immutable audit trail of events` because `this helps me prove to others what happened`
- [ ] documented
- [ ] tested
- [ ] delivered

To `prevent theft and terrorism` as a `biologist` I want `to be notified when stuff goes missing` because `my reagents are expensive and potentially dangerous`
- [ ] documented
- [ ] tested
- [ ] delivered

To `get paid` as a `provider of goods and services` I want `a way to connect my inventory with stripe` because `this lets me charge money for my contributions to others`
- [ ] documented
- [ ] tested
- [ ] delivered

To `make a list of what I need` as a `researcher` I want `to add items to a cart` because `this lets me track what I want to buy`
- [ ] documented
- [ ] tested
- [ ] delivered

To `order what I need` as a `researcher` I want `to checkout easily` because `I need my stuff faster`
- [ ] documented
- [ ] tested
- [ ] delivered

To `know when my things arrive` as a `researcher` I want `shipment tracking` because `this helps me plan experiments`
- [ ] documented
- [ ] tested
- [ ] delivered

To `track stuff I like` as a `researcher` I want `a button to add something to a wish list` because `some things are interesting but I'm not ready to purchase them`
- [ ] documented
- [ ] tested
- [ ] delivered

## Contributors

- **Bion Howard** - _Initial work_ - [bionicles](https://github.com/bionicles)
- Aris Symoneidis

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
