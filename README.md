# robototes-website-api

[![Build Status](https://semaphoreci.com/api/v1/robototes/robototes-website-api/branches/master/shields_badge.svg)](https://semaphoreci.com/robototes/robototes-website-api)
[![David](https://img.shields.io/david/robototes/robototes-website-api.svg)](https://david-dm.org/robototes/robototes-website-api#info=dependencies)
[![Codecov branch](https://img.shields.io/codecov/c/github/robototes/robototes-website-api/master.svg)](https://codecov.io/gh/robototes/robototes-website-api/branches/master)
[![codebeat badge](https://codebeat.co/badges/0b776429-8e30-44de-8eb8-53c530bf7b7b)](https://codebeat.co/projects/github-com-robototes-robototes-website-api-master)
[![Greenkeeper badge](https://img.shields.io/badge/greenkeeper-enabled-brightgreen.svg)](https://greenkeeper.io/)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![GO ROBOTOTES!](https://img.shields.io/badge/GO-ROBOTOTES!-brightred.svg)](https://www.robototes.com)

### About

This repository is a Docker microservice that exposes endpoints to manipulate data that will be processed by other
microservices, including [robototes-website-web](https://github.com/robototes/robototes-website-web) and
[robototes-website-team](https://github.com/robototes/robototes-website-team). Currently, our only endpoint is
a [The Blue Alliance](#tba) webhook.

For common documentation regarding the requirements, upkeep, and testing of our microservices, please see our
[global documentation](https://github.com/robototes/robototes-website/blob/master/DOCS.md). Sections
regarding microservice-specific configuration, features, and differences in commands can be found below.

### <a id="configuration">Configuring the server</a>

The following environment variables can be set, the server will not start without the ones marked *required*:

* `IP` (*required, default `0.0.0.0`*) The IP to run the server on
* `PORT` (*required, default `3000`*) The port to listen for requests on
* `DOMAIN` (*required*) The second-level domain that the server resides on
* `DEBUG` (*optional*) see [Debug mode](#debugmode)
* `TBA_SECRET_KEY` (*required*) The secret key used to verify the source and integrity of payloads from The Blue Alliance
* `DATABASE_HOST` (*required*) The IP address that the MongoDB server is listening on
* `DATABASE_PORT` (*required*) The port that the MongoDB server is listening on

### <a id="debugmode">Debug mode</a>

Debug mode does not change the behavior of any endpoints, but the [debug](https://www.npmjs.com/package/debug) module is still in
use. The recommended debug filter for this project is `robototes-website-api:*,http`.

### <a id="tba">The Blue Alliance</a>

[The Blue Alliance](https://www.thebluealliance.com/) is a service provided free of charge to FRC
teams for scouting, watching, and reliving the FIRST Robotics Competition. One such feature in
particular that we use is a subscription to webhooks that provide us with realtime event updates.
We use these webhooks to build a customized feed for our users with all events regarding our team.

### Maintainers

[@dannytech](https://github.com/dannytech) and
[@TAKBS2412](https://github.com/TAKBS2412)

### Contributing/Vulnerability disclosure

See our common [CONTRIBUTING.md](https://github.com/robototes/robototes-website/blob/master/CONTRIBUTING.md)

### License

Copyright &copy; 2017 Sammamish Robotics <robototes2412@gmail.com>, All rights reserved.

Any copying and/or distributing and/or use in commercial or non-commercial environments
via any medium of this project without the express permission of Robotics Leadership is strictly prohibited.
