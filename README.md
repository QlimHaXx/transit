> 11107741 Christian Jimenez <br> 11610894 Laetitia Bourdon

# A Vue.js and Vuetify project

[Lien sur Surge](https://transit-madness.surge.sh/#/)

## Installation

### Install NodeJS (npm)
[NodeJS](https://nodejs.org/en/)

### Install VueJS
```npm install -g vue-cli```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Description
This application is used to have mobilities advice. For a better experience, we strongly recommend to use this app on Google Chrome.

### Features
**Management of addresses:**
* Add (name, address)
* Delete
* Display addresses' number

**Management of journeys:**
* Save in the store
* Display

**Management of lines:**
* Save in the store
* Display

**Management of stops:**
* Save in the localStorage
* Display

**Find a route from a city to another:**
* The auto complete function helps you find a city
* The website shows the start time, the end time, and the duration, as well as each step of every route returned by Navitia.
* Using current location as departure or arrival. (the website needs authorization to accessing location)

**Get information from TCL lines:**
* The website displays each TCL lines using pagination
* It fetches and saves the details of a TCL route when the user click on the download icon

**Augmented reality**
* Displaying video stream from the camera on the webpage (the website needs authorization to accessing camera)
* Displaying arrow which turns with accelerometer (an accelerometer on device is needed)

**App shell**
* Showing loader instead of white page when website is loading content.
* Showing navbar without icons to avoid using dependencies.

**Offline page**
* The website shows another page if the Internet is not available :
* Caching T1 route, timetable, as well as the page itself.

### Considered features
* Improve the map (/aroundme) to display where we are.
