# planetscale-in-deno PoC

## Todos

- Deploy on deno deploy
  - find / write adapter for doppler usage from within deno!

## Base Data

Database Region: AWS eu-cenral-1 (Frankfurt)
Name: jbscratch_planetscale-in-deno
URL: https://app.planetscale.com/bjesuiter/jbscratch_planetscale-in-deno

Login Credentials: [See doppler account (private)](https://dashboard.doppler.com/workplace/f867183ebfa5d4d1e007/projects/planetscale-in-deno)

Planetscale Schema: https://app.planetscale.com/bjesuiter/jbscratch_planetscale-in-deno/main/schema

## Tech

- @planetscale/database - HTTP API for Planetscale
- kysely - SQL Query Builder
- [kysely-planetscale](https://github.com/depot/kysely-planetscale) => Database Adapter via Planetscale HTTP Entrypoint
- [pscale-cli](https://planetscale.com/docs/tutorials/connect-any-application)  
  `brew install planetscale/tap/pscale`

## Going Further

- [kysely-codegen](https://github.com/RobinBlomberg/kysely-codegen) => generate TS Types from Database Schema
  (only for experimenting, may be not advisable in Prod)

## Repo Log

### 2022-09-18 Create first Table

Create Table Example: https://www.w3schools.com/sql/sql_create_table.asp

```
deno task db-shell
CREATE TABLE `pets` (id int, name varchar(200));
```
