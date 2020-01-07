# bitpharma.com

Bitpharma.com is a robot army for medical researchers to cure diseases

## Install

### Prepare

1. git
2. make
3. docker

```
git clone https://github.com/bionicles/bp
```

## Test

```
make test
```

### Tests

1. It passes a lighthouse test > 90% score
2. It allows users to Sign In
3. It allows users to give feedback
4. It helps signed-up users connect stripe and add items
5. It matches consumers and producers with search + recommendations
6. It helps consumers purchase items

## Deployment

We deploy with AWS codepipeline in aws/pipe

## Built With

- React + npx create-react-app
- tailwind css and tufte css
- make
- aws-cdk
- AWS Neptune + gremlin
- AWS Lambda + jeremydaly/lambda-api + jquense/yup
- AWS SNS
- Auth0
- Stripe Connect

## Contributing

Pull requests and issues are welcome.

For security issues or support with sensitive matters, please email bion@bitpharma.com

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Contributors

- **Bion Howard** - _Initial work_ - [bionicles](https://github.com/bionicles)
- Aris Symoneidis

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
