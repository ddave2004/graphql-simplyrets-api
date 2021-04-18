Please read the PLEASE_READ_FIRST.md first.

NodeJs project which implements a GraphQL endpoint to retrieve a list of properties for sale in a city. It uses simplyRETS api. 

## Prerequisites

1. The `/graphql` endpoint is protected by Bearer HTTP Authentication. This Authentication token is configured as environment variables `GRAPHQL_USER` and  `GRAPHQL_PASSWORD` , To configure these create an .env file in the root of the project and add following entries.


```
GRAPHQL_USER=<<user>>
GRAPHQL_PASSWORD=<<password>>

```

2. SimplyRETS api uses HTTP Authentication, credentials are also fetch from environment variable, which can also be configured in .env file as above as `SIMPLYRETS_USER` and `SIMPLYRETS_PASSWORD` password. 

SimplyRETS default/demo id and password are `simplyrets/simplyrets`
```
SIMPLYRETS_USER=<<simplyrets user>
SIMPLYRETS_PASSWORD=<<simplyrets password>

```