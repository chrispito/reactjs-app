# React JS App

This project contains a React / Redux single page application.

## Building and running the app

	cbuild
	crun
	npm install (in the container)
	npm start (in the container)

Then you can open up your favorite browser and visit [http://localhost:9002/](http://localhost:9002/).

**Please note:** By default `npm start` will run the app in development mode. If you want to start it in production mode, you have to type

	NODE_ENV=production npm start

## Updating packages

First remove npm-shrinkwrap.json. Install all versions you want. Then run:

	npm shrinkwrap

This will create a new npm-shrinkwrap.json and will keep all versions consistent on all machines.

## Testing

	npm test (in the container)

This command will run all tests and show the results on the console.

	npm run test:watch (in the container)

This command will run all tests and show the results in the console - additionally it checks for sources to change and immediately runs tests again if necessary.

## Deployment

When you commit and push any changes, this project is automatically build by jenkins and copied to [http://test.pressrelations.de/apps/nrx](http://test.pressrelations.de/apps/nrx).

## Cool Stuff

### React Router

https://github.com/reactjs/react-router-tutorial
https://github.com/reactjs/react-router/tree/latest/docs

### Authentication

https://github.com/reactjs/react-router/tree/master/examples/auth-flow

https://github.com/joshgeller/react-redux-jwt-auth-example
https://github.com/mjrussell/redux-auth-wrapper

### Async

http://stackoverflow.com/questions/38247992/how-do-i-load-inital-set-of-data-with-ajax-call-in-react-redux

### Redux

http://stackoverflow.com/questions/34570758/why-do-we-need-middleware-for-async-flow-in-redux
http://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout/35415559#35415559

### Testing

https://facebook.github.io/react/docs/test-utils.html
https://github.com/mochajs/mocha/wiki
http://www.wsbrunson.com/react/redux/test/2016/05/08/testing-redux-containers.html
https://medium.com/javascript-inside/testing-in-react-getting-off-the-ground-5f569f3088a#.159kb1sn5

### Immutable

https://www.sitepoint.com/how-to-build-a-todo-app-using-react-redux-and-immutable-js/
https://www.toptal.com/react/react-redux-and-immutablejs
http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html

### React / Redux / Immutable Basics

http://academy.plot.ly/#react

### SASS

http://hugogiraudel.com/2015/06/18/styling-react-components-in-sass/
http://sass-guidelin.es/#architecture
