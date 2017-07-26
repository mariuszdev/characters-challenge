Global requirements
---

- `Node v8.2.1`

- `Mongodb v3.4.6`

- `yarn`

Installation
---

In main directory type:

`yarn`

This will install all required libraries.

Running
---

1. Compile:
`yarn run compile-front-prod`

1. Create mongodb database:
`mkdir mongodb`

1. Run mongod:
`mongod --dbpath ./mongodb`

1. Load initial data:
`yarn run load-initial-data`

1. Run:
`yarn run server`

Development
---

Run:
`yarn run dev-server`

Development mode supports hot reloading so there is no manual reloading needed.

Testing
---

`yarn run test`
