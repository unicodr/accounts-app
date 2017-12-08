Manage accounts
===============

Getting started
--------------
A demo application to manage accounts.
The application is built using NodeJS, Typescript and Express and consists of a backend API to create, read, update and delete accounts. 
deployed in the cloud using Heroku. 

The UI is simple, no CSS or styling, it lists all the accounts in the database and let you create, edit and delete.

This web application is deployed with [Heroku](https://www.heroku.com/) and is configured to be automatically built and deployed on changes to the master branch. 
Feel free to checkout the [live demo](http://accounts-application.herokuapp.com/). 


Running it locally
--------------
Checkout the code, which is built using npm 5.5.1 and node 8.9.1. 

The application is setup to use [Firebase DB](https://firebase.google.com/) and needs to be configured in .env by adding relevant keys for FIREBASE_*. . 

Start application locally on port 3000:
```
npm install
npm start
```
Enjoy!

Production readiness
-------------
There is still improvements to be made to make this application production ready. 

#### Linting
Adding linting would greatly improve code quality by avoiding easy mistakes and ensuring consistency. 

#### Testing & CI

I'd started of by adding tests to this application, because I think it is key for any production application. I did feel that already spending a lot of time learning NodeJS / TypeScript and the whole ecosystem was enough for the sake of completing the application itself. But as a follow up I'd spend more time investigating testing strategies: what framework & assertion library to use, how to set up test data and where and when to run tests. 

#### Capacity & reliability planning
If this application where to be used by real users, then capacity planning and scaling the application infrastructure accordingly to the needs would have to be done. This also means taking failover and redundancy into account, and adding a load-balancer to route incoming traffic across multiple hosts.  Database backups and failover strategy would be key to address, not to loose valuable data. 

#### Security
Both authentication and authorization to restrict who can read and write account data. But also, I would add checks for known vulnerabilities of the application and its dependencies into the build pipeline by using some available tooling (for example [Node Security Platform](https://nodesecurity.io/]). 

#### Improve error handling and logging
I'd add proper error handling to improve user experience and feedback, and also better logging to the application, storing of logs and tooling ([ELK stack](https://www.elastic.co/webinars/introduction-elk-stack) for example) to be able to analyze and manage logs. 

#### Monitoring and alerting
I'd add and forward relevant metrics for the application to be able to monitor and alert on unexpected behaviours. Example of useful monitoring would be:
Host monitoring metrics: used disk, CPU, memory and number of processes running etc.
Application performance: number of requests, response times, uptime,  database connections, exceptions thrown, etc.
Network monitoring: host availability, packet loss, DNS failures etc.
