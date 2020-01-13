FROM circleci/python:latest-node-browsers

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

RUN pip install --user --no-cache-dir --upgrade awscli && \
    aws configure set preview.cloudfront true && \
    aws configure set preview.create-invalidation true && \
    yarn global add yalc && echo $PATH

ENTRYPOINT ["/bin/bash", "-c"]