# gulp react template - webpack

### What?
A starter project for *React.js* that uses *webpack* for building the code. It includes a basic page with a router and an example of a home and 404 route. In addition, for the backend it also includes an *express* and *socket.io* implementation, since I've found that I use this combination quite frequently.

### Why?
I wanted a clean *webpack* boilerplate, to contrast it with the [*gulp* package I already wrote](https://github.com/suldashi/react-template).

### How?
Clone the repository and run `npm install` to install the dependencies. After, run `npm run dev` to build the sample code, which will be deposited into `public/js.ui.js`. To see how it looks, run the built in server using the command `npm start`. Your server should be launched, and you can then access it on `localhost:8080`.

### What tasks are supported?

The following tasks are implemented:
* `npm run dev` - the main and default task that takes the *react.js* code and outputs a non-minifed JavaScript bundle file.
* `npm run prod` - when you are ready to deploy, this runs the same code as `npm run dev`, only it minifies it at the end and applies the `production` environment.
* `npm run watch` - watches for changes in the jsx and js files and triggers compilation when a change is detected. The compilation is dev mode.

License: MIT