# Bit Pharma

Bit Pharma is an international biosecurity and medical research risk management firm

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/bionicles/bp/blob/master/LICENSE) [![codecov](https://codecov.io/gh/bionicles/bp/branch/master/graph/badge.svg)](https://codecov.io/gh/bionicles/bp)

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

## Quick Start

```
git clone https://github.com/bionicles/bp

// run the app
make dev

// watch the code and re-test automatically
```

### Tests

1. The site renders when you visit
1. It passes a lighthouse test > 90% score
1. It allows users to Sign In
1. It allows users to give feedback
1. It helps signed-up users connect stripe and add items
1. It matches consumers and producers with search + recommendations
1. It helps consumers purchase items

## Deployment

We deploy with Github Actions and AWS ECS

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
- [AWS](https://docs.aws.amazon.com/) and [AWS CDK](https://github.com/aws/aws-cdk)
- [React](https://reactjs.org/docs/hooks-intro.html) + [NextJS](https://nextjs.org/docs) + [npx create-next-app](https://github.com/zeit/next.js)
- [tailwind css](https://tailwindcss.com/) and [tufte css](https://edwardtufte.github.io/tufte-css/)
- [Hasura](hasura.io) + [PostgreSQL](http://postgresql.org)
- [Auth0](https://auth0.com/docs/)
- [Stripe Connect](https://stripe.com/docs/connect)

## Contribute

Ensure there is an issue for your feature in the issues list and move it to the "doing" list on the issues triage project

Make a feature branch:

```
git checkout -b FEATURE_NAME dev

# document the feature in README.md
make test
# develop the feature inside the subdirectories like api, www

git add .
git commit -m "feat(FEATURE_NAME): do something"
git push --set-upstream origin FEATURE_NAME
# make sure your git command can make pull requests .bash_profile or .bashrc has: eval "$(hub alias -s)"
git pull-request -m "feat(FEATURE_NAME): do thing1; do thing2"
```

_For security issues or support with sensitive matters, please email bion@bitpharma.com_

We welcome pull requests and issues, but please [give constructive criticism](https://hbr.org/2019/03/the-feedback-fallacy)!

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Contributors

- **Bion Howard** - _Initial work_ - [bionicles](https://github.com/bionicles)
- Aris Symoneidis

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
