# This project is a <mark  style="background-color: #FFFF00">Vanilla Node.js REST API</mark> without Frameworks

---

## :eyes: Overview

The server is a REST API that uses the JSONPlaceholder API as a data source. The JSONPlaceholder API has several endpoints for performing CRUD operations on resources such as posts, comments, and users.

This a REST API project with TypeScript, PM2, Docker, Winston, Prisma, and PostgreSQL to study and stay up-to-date with Node.js and JavaScript. Overall, this project can be helpful for me and you to deepen our understanding of Node.js and JavaScript, as well as various technologies commonly used in building scalable and efficient web servers.

This project was created utilizing such technologies:

- :white_check_mark: [Node.js](https://nodejs.org/docs/latest-v19.x/api/) [^1]
- :white_check_mark: [TypeScript](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html)
- :white_check_mark: [PM2](https://pm2.keymetrics.io/docs/usage/quick-start/)
- :white_check_mark: [Winston](https://www.npmjs.com/package/winston) [^2]
- :white_check_mark: [PostgreSQL](https://www.postgresql.org/docs/current/tutorial-start.html)
- :white_check_mark: [Prisma](https://www.prisma.io/docs)
- :white_check_mark: [JWT](https://www.npmjs.com/package/jsonwebtoken) [^3]
- :white_check_mark: [Got](https://www.npmjs.com/package/got)
- :white_check_mark: [JSONPlaceholder](https://jsonplaceholder.typicode.com)
- :white_check_mark: [Postman](https://google.com "Do it!")
- :white_check_mark: [Docker](https://docs.docker.com) [^4]
- ~~OpenApi | Swagger~~
- ~~Unit Test~~
- ~~End-to-End Test~~
- **...**

---

## :clipboard: Table of Contents

- [:eyes: Overview](#eyes-overview)
- [:floppy_disk: Quick Start](#floppy_disk-quick-start)
- [:art: Screenshots](#art-screenshots)
- [:warning: Let's talk](#warning-lets-talk)
  - [Why is vanilla Node.js?](#why-use-vanilla-nodejs)
  - [Rest Api](#rest-api)
  - [Typescript](#typescript)
  - [Middleware](#middleware)
  - [Logging. Winston](#logging-winston)
  - [PostgreSQL & Prisma](#postgresql--prisma)
  - [PM2 & Docker](#pm2-and-docker)
  - [Auth & JWT](#auth--jwt)
  - [Deploy](#deploy)
- [:rocket: Features](#rocket-features)
- [:card_file_box: Last 5 Update](#card_file_box-last-5-update)
- [:link: Footnotes](#link-footnotes)

---

## :floppy_disk: Quick Start

1. Take the project from the Github repository and install the dependencies:

```npm
npm i
```

2. For development, run this command:

```npm
npm run dev
```

3. For production, run this command:

```npm
npm i
npm run start
```

or build and run docker container:

```docker
docker build -t <image-name> .
docker run -dp 3000:3000 <image-name>
```

4. Open `http://localhost:3000` in your browser

5. Endpoints: nodejs-for-fun.onrender.com/swagger

---

## :art: Screenshots

1. Main page without authorization:
![FirstScreen](https://user-images.githubusercontent.com/61117394/229933186-569414ff-c298-4861-951d-292d3cc6f5b0.png)

2. Token has been expired:
![TokenExpired](https://user-images.githubusercontent.com/61117394/229934656-d58766ce-fecd-409e-98d1-942f92e456e4.png)

3. Sign up:
![Sign up](https://user-images.githubusercontent.com/61117394/229932958-2ca71e2a-cf98-4b12-9512-b8917b631fbb.png)

4. Main page with authorization:
![SecondScreen](https://user-images.githubusercontent.com/61117394/229933590-3bf9928e-9191-4891-99a1-3aafeb30ffeb.png)

5. Post request to create a user:
![CreateUserInputs](https://user-images.githubusercontent.com/61117394/229933779-0c2f8611-982e-4b3e-aa18-4b42fcd013ba.png)

6. Response from the server:
![ResponseWithNewuser](https://user-images.githubusercontent.com/61117394/229935490-eb7c4d0b-ed6c-4b4f-a729-69ba8cace95b.png)

7. Postman:
![Postman](https://user-images.githubusercontent.com/61117394/229940076-2493a1f3-ec04-40ba-a7a3-8fc8c18c5d28.png)

8. Open Api Requests:  
[Not implemented]

9. Open Api Request:  
[Not implemented]

10. Open Api schemas:  
[Not implemented]

---

## :warning: Let's talk

### Why use vanilla Node.js?

Cos.

### Rest Api

REST API is a good choice for web server for several reasons:

- Simplicity: RESTful architecture is based on simple HTTP methods and resource URIs, making it easy to understand and implement.

- Scalability: RESTful APIs are stateless, which means that they can handle a large number of requests simultaneously, making them highly scalable.

- Flexibility: RESTful APIs are platform-agnostic, which means that they can be accessed from any device or programming language that supports HTTP.

- Maintainability: RESTful APIs are self-documenting, which means that developers can easily understand how to use them and make changes as needed.

- Standardization: RESTful APIs follow a standardized set of principles, making them easy to integrate with other systems and applications.

Overall, RESTful APIs are a good choice for web servers because they provide a simple, scalable, and flexible way to communicate with other systems and applications.

### Typescript

Do I need to describe it?

1. Type Safety: TypeScript provides static type checking, which helps catch errors at compile time rather than runtime. This can be particularly useful when working with large codebases or when collaborating with other developers.

2. Improved Code Quality: By using TypeScript, you can take advantage of features like classes, interfaces, and modules, which can help you write cleaner, more organized code.

3. Better IDE Support: Many modern code editors like VS Code have excellent TypeScript support, including autocomplete and error highlighting. This can help you write code more quickly and with fewer mistakes.

4. Easier Refactoring: Because TypeScript provides type information, refactoring code can be much easier than in plain JavaScript. You can use tools like automatic renaming and find all references to quickly make changes throughout your codebase.

Overall, while TypeScript is not strictly necessary for building a Vanilla Node.js web server, it can be a helpful tool for improving the quality, maintainability, and robustness of your code.

### Middleware

Middleware is a piece of software that sits between two or more systems or applications to help them communicate with each other. In the context of web development, middleware is a software layer that sits between the web server and the application, and intercepts and processes incoming HTTP requests before they are passed to the application.

Connect is a middleware framework for Node.js that allows developers to easily create and use middleware functions in their applications. It provides a set of built-in middleware functions that can be used to handle common tasks such as parsing incoming requests, serving static files, and handling errors.

In my project, I have implemented my own middleware based on an array of middlewares that I bind through the reduceRight method. This approach allows me to easily combine multiple middleware functions into a single middleware function that can be used in my application. By using the reduceRight method, I can ensure that the middleware functions are executed in the correct order, with the last middleware function being executed first.

When using this approach, I can define each middleware function as a separate module, making it easier to manage and reuse code. I can also pass additional parameters to each middleware function as needed, allowing me to customize the behavior of my middleware based on the specific requirements of my application.

Overall, this approach can be a powerful tool for building complex middleware pipelines in my Vanilla Node.js API. However, it's important to ensure that my middleware functions are designed to work together seamlessly and efficiently to avoid performance issues or unexpected behavior in my application.

### Logging. Winston

Winston was used for logging and to keep track of any errors or issues that might occur.

Logging is an important aspect of any web application, as it helps developers debug issues and understand how the application is performing. Winston provides a flexible and extensible logging framework for Node.js, with support for various logging transports such as console, file, and third-party services like Papertrail, Loggly, and more.

By using Winston, you can easily configure and manage your logging across your application. You can log errors, warnings, and other important events in your application, and even add custom metadata to your logs to help you diagnose issues. Winston also allows you to log to multiple transports simultaneously, which can be useful for maintaining a centralized log store or for debugging issues across different environments.

In summary, using a logging library like Winston in Vanilla Node.js web servers can provide better visibility into the health and performance of your application, making it easier to diagnose and fix issues as they arise.

### PostgreSQL & Prisma

There are several cases where using PostgreSQL and Prisma in Vanilla Node.js web servers can be beneficial:

1. Data persistence: PostgreSQL is a powerful relational database that can help you store and manage your data effectively. Prisma is an ORM that makes it easy to work with PostgreSQL and allows you to define your data models in code.

2. Scalability: PostgreSQL is a scalable database that can handle large amounts of data and concurrent connections. Prisma makes it easy to write efficient database queries that can help you scale your application.

3. Security: PostgreSQL provides advanced security features such as row-level security, encryption, and authentication mechanisms. Prisma can help you write secure database queries and protect your data from unauthorized access.

4. Performance: PostgreSQL is known for its high performance and can handle complex queries and large datasets. Prisma generates optimized SQL queries that can improve your application's performance.

Overall, using PostgreSQL and Prisma in Vanilla Node.js web servers can provide you with a robust and scalable database solution that can help you build high-performance and secure web applications.

### PM2 and Docker

Pm2 is a process manager that can be used to keep your Node.js application running in the background, monitor its performance, and automatically restart the application if it crashes. This can help ensure that your application is always available and can handle high traffic loads. Pm2 can also be used to manage multiple instances of your application, making it easier to scale up or down as needed.

Docker is a containerization platform that allows you to package your application and all its dependencies into a single container, making it easier to deploy and run your application on different environments. Docker can also help you ensure that your application runs consistently across different environments, reducing the risk of compatibility issues. Using Docker also makes it easier to scale your application horizontally by adding more containers, allowing you to handle more traffic.

Overall, using Pm2 and Docker can help you improve the reliability, scalability, and portability of your Vanilla Node.js web server.

### Auth & JWT

Classical/simple auth can be useful when you have a small application that requires basic authentication without the need for more complex security features. It can also be useful in cases where you need to authenticate a user before giving them access to certain resources or data.

JWT (JSON Web Tokens) can be useful when you need to securely transmit information between the client and the server without the need for session management. JWTs can be used to authenticate users and protect sensitive data by encrypting it in a token. They can also be used to improve performance by reducing the number of requests to the server for authentication.

However, it's important to keep in mind that both classical/simple auth and JWT have their limitations and may not be appropriate for all use cases. It's important to carefully consider the security requirements of your application before choosing an authentication method.

### Deploy

Deploying the application was an important step towards making it available to users. One option for hosting the Docker container was render.com, a cloud platform that offered a simple and flexible way to deploy and manage applications. With Render, the containerized application could be deployed easily with just a few clicks, and they offered a range of features such as automatic SSL certificates, load balancing, and automatic scaling.

In addition to hosting the application, the database also needed to be deployed. neon.tech was the platform that was chosen to offer a PostgreSQL database as a service. Deploying the PostgreSQL database on neon.tech was straightforward and could be done with just a few clicks. With neon.tech, the database could be easily managed, scaled up or down as needed, and ensured the reliability and availability of data.

Overall, the deployment of the application and database was done easily with the help of cloud platforms like render.com and neon.tech, allowing to focus on building the application and serving users.

---

## :rocket: Features

1. *Swagger*
1. *Tests*
1. *Make not a disgraceful client 8D*
1. *~~Client for Mobile~~ **Nope**!*

## :card_file_box: Last 5 Update

1. *Init Project*
1. *Docker*
1. *Deploy*
1. *Delete Project*

## :link: Footnotes

[^1]: [*Node.js roadmap*](https://roadmap.sh/nodejs)

[^2]: [*Node.js Logging with Winston*](https://reflectoring.io/node-logging-winston/)

[^3]: [*What Is JWT?*](https://www.akana.com/blog/what-is-jwt)

[^4]: [Docker Integration with PM2](https://pm2.keymetrics.io/docs/usage/docker-pm2-nodejs/)
