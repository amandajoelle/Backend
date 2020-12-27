# CIRS-APP Backend

The Backend application for the Critical Incident Reporting System App (Proof of Concept).

## Requirements

-  Install Node.js on your computer (use LTS Version): https://nodejs.org/en/
    -  if you're using a Linux System: https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions
-  Install git on your system.

## Setup

1.  Clone the git repository: `git clone https://github.com/amandajoelle/Backend.git`
2.  Install all dependencies via npm
    -   Run `npm install` in project root
3.  Create an `.env` file in the root folder of the project
    -   Initialise environment variables
    -   More details under "Environment variables"
4.  Build the database
    -   Run `npm run database` in project root
    -   It will create a `cirs.db` database under `database/`
5.  Run the project in dev mode
    -   Run `npm run dev` in project root

## Environment variables

It's necessary to create an environment file to run the application properly.\
Example `.env` file:
```yaml
TOKEN_SECRET=YourTokenSecret
SQL_DIALECT=sqlite
STORAGE=database/cirs.db
```
