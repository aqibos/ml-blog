# ML-Blog and ML-Blog-Api

# Repositories
Relevant projects are publicly available in Github:

* **ml-blog**: https://github.com/ashah023/ml-blog.git
* **ml-blog-api**: https://github.com/ashah023/ml-blog-api.git

# Live Demo

Demo applications are hosted on Heroku.

* [Live Production Frontend](https://ml-blog.herokuapp.com/)
* [Live Production Backend](https://ml-blog-api.herokuapp.com/)
* [Live Development Frontend](https://ml-blog-dev.herokuapp.com/)
* [Live Development Backend](https://ml-blog-api-dev.herokuapp.com/)

## Local Installation (_ml-blog_)

_Please note: **Node.js** and **npm** are required to run this project. **The ml-blog-api project requires certain enviroment variables to set, therefore the local ml-blog project has been configured to run against the development API. This can be changed in the `app/js/api/api.js` file (line 12).**._

1. Download the project, either via the [browser](https://github.com/ashah023/ml-blog) or using the command line, using `git clone https://github.com/ashah023/ml-blog.git`.
2. Install dependencies using `npm install` in the directory the project was downloaded in.
3. Run `npm start`.
4. Navigate to `http://localhost:5000/#!/`.

## Local Installation (_ml-blog-api_)

_Please note: **Node.js** and **npm** are required to run this project._

**This project requires certain environment variables to be set, prior to running (e.g., database credentials, pusher app keys, etc.). Please request access from the developer of this application at `ashah023@fiu.edu`. Thank you.**



1. Download the project, either via the [browser](https://github.com/ashah023/ml-blog-api) or using using the comamnd line, using `git clone https://github.com/ashah023/ml-blog-api.git`.
2. Install dependencies using `npm install` in the directory the project was downloaded in.
3. Run `npm start`.
4. The server is now is running at `http://localhost:1338`.

## Development Installation (_ml-blog_)
1. Follow steps 1 and 2 for Local Installation (_ml-blog_)
2. Run `gulp watch`.

## Development Installation (_ml-blog-api_)
1. Follow steps 1 and 2 for Local Installation (_ml-blog-api_)
2. Run `npm run dev`.
3. The server is now is running at `http://localhost:1338`.

## Architecture Overview

The application was built from scratch using a three-tier architecture:
1. Presentation Layer
2. Logic Layer
3. Data Layer

### Presentation Layer

The presentation layer is single-page application built using a standard MVC design pattern with **[MithrilJS](https://mithril.js.org/)**. MithrilJS allows for vanilla javascript syntax and supports a wide variety of browsers. Mithril also allows for re-usable components, similar to other frameworks.

All styling is done using **Sass** that is pre-processed into CSS. The [Tachyons](http://tachyons.io/) framework in conjuction with Sass inheritance was used to style the application. Tachyons simply provides shortcuts for common CSS styling. For example instead of writing `border: 1px solid black;`, you can simply write `.ba;`, which stands for "border all". Also, instead of polluting the HTML with all of the styling, the Tachyon shortcuts are simply extended in the relevant stylesheet. The styling is also ready for mobile devices.

Live data loading is avaiable via [Pusher](https://pusher.com/). If an person is viewing a blog and a new comment is made, the comment will automatically be displayed.

#### Code

The presentation layer code is contained in the [ml-blog](https://github.com/ashah023/ml-blog) project. It is written using ES2016 syntax and is transpiled using babel. **[Gulp](http://gulpjs.com/)** is used to automate the build process and provide live reloading during development.

#### File Structure

The entry point of the presentation layer is the `/index.html` file, which includes the bundled javascript. The heart of the application is located in `app/` folder. This directory is further divided into four self-explainable directories.

The `js/` directory contains all of the core logic:
* `js/*.js` - Contains all of the files relating to a matching route. Routing is defined in `js/index.js`.
* `js/api` - The API is wrapped in factory called `makeApi.js`. The API is then injected in `api.js`. This allows for swappable API objects and even a mock API for testing. Furthermore, the current implementation of the API is written with built-in `fetch`, but if this is to be changed, the new implementation can be created and injected easily. The API is then injected into the all of the components.
* `js/components` - Contains all reusable components
* `js/util` - Contains all utility files

### Logic Layer

The logic layer is also written in a Node.js enviroment, specifically with **[Koa.js](http://koajs.com/#)**. Koa was developed by the creators of Express.js. Applications written with Koa can use the newer `async/await` syntax as opposed to traditional callbacks. Koa also uses extensive middleware (e.g., user authentication) for each request allowing for less code duplication. The application is a written using a dependency injection container, called **[awilix](https://github.com/jeffijoe/awilix)**. All dependencies are resolved, loaded, and injected in `src/lib/configureContainer.js` file. The application uses this container, as observed in `src/lib/createServer.js` file. Again, using dependency injections allows for easily swappable container, which allows for more robust testing.

The database is a Postgres relational database. All queries/schemas are written using a SQL/Schema builder, by the name of [Knex.JS](http://knexjs.org/). Knex.js allows SQL language-independent queries and schemas to be written in javascript. Knex.js supports Postgres, MSSQL, MySQL, MariaDB, SQLite3, and Oracle, so switching database should be easier.

The logic layer is further abstracted into 3 layers:
* **API Layer** - The API endpoints are created and exposed in this layer. The API layer parses the requests and communicates with the service layer to send back a response.
* **Service Layer** - All of the business logic is contained in this layer (e.g., trigger a new comment via pusher, ownership authentication, parameter validations, etc). The service layer communicates with the repository layer to perform CRUD operations as needed.
* **Repository Layer** - This layer provides a thin wrapper around the database (kind of like a psuedo ORM), so that all queries are performed in this layer. **C**reate, **R**ead, **U**pdate, **D**elete operations against the database are created and exposed in this layer.

#### Code

The logic layer code is contained in the [ml-blog-api](https://github.com/ashah023/ml-blog-api) project. It is written using ES2016 syntax and is transpiled using babel.

#### File Structure

The entry point of the presentation layer is the `/src/bin/server.js` file, creates and runs the server. The heart of the application is located in `src/` folder. This directory is further divided into four self-explainable directories.

The `src/` directory contains all of the core logic:
* `src/bin` - Contains the startup files.
* `src/api` - Contains all API factories.
* `src/services` - Contains all service factories
* `src/vendors` - Contains all factories for third party services (e.g., Pusher)
* `src/lib` - Contains all necessary configuration files.
* `src/middleware` - Contains all middleware to be used.
* `src/utilities` - Contains all utility files

## Enhancements

With more time, I would have liked to do the following:

* Implement tests on both the presentation layer with PhantomJS and backend layer with MochaJS and ChaiJS.
* Add rich text support
* Add image support
* Add notifications (via email) for new comments
* Add a newsletter subscription
* Adding administrative roles